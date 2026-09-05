#!/usr/bin/env bash
# Синхронизирует опубликованные работы Kwork с портфолио сайта.
# Запуск: ./scripts/sync.sh [--dry-run]

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
portfolio="$root/portfolio.js"
index="$root/index.html"
assets="$root/public/client-cases"
user_id="${KWORK_USER_ID:-21370180}"
username="${KWORK_USERNAME:-renothing}"
dry_run=0

case "${1:-}" in
  '') ;;
  --dry-run) dry_run=1 ;;
  --help|-h) printf 'Использование: %s [--dry-run]\n' "${0##*/}"; exit 0 ;;
  *) printf 'Неизвестный аргумент: %s\n' "$1" >&2; exit 2 ;;
esac

for command in curl node; do
  command -v "$command" >/dev/null || { printf 'Не найдено: %s\n' "$command" >&2; exit 1; }
done
[[ -f "$portfolio" && -f "$index" ]] || { printf 'Не найдены portfolio.js или index.html.\n' >&2; exit 1; }

temp="$(mktemp -d "${TMPDIR:-/tmp}/kwork-sync.XXXXXX")"
trap 'rm -rf "$temp"' EXIT
cache_bust="$(date +%s)-$RANDOM"

fetch() {
  curl --fail --silent --show-error --location --compressed --retry 3 \
    -H 'Cache-Control: no-cache' -H 'Pragma: no-cache' \
    -H "Referer: https://kwork.ru/user/$username" "$@"
}

printf 'Проверяю Kwork…\n'
fetch -X POST "https://kwork.ru/portfolio/get_more/by_user?cache_bust=$cache_bust" \
  --data "userId=$user_id&category=0&limit=100&isWebpAccepted=1" -o "$temp/list.json"

node - "$portfolio" "$temp/list.json" "$temp/projects.json" <<'NODE'
const fs = require('fs');
const [portfolioPath, listPath, outputPath] = process.argv.slice(2);
const source = fs.readFileSync(portfolioPath, 'utf8');
const items = JSON.parse(fs.readFileSync(listPath, 'utf8'))?.data?.portfolios;
if (!Array.isArray(items)) throw new Error('Kwork вернул неожиданный ответ.');
const existing = new Set([...source.matchAll(/public\/client-cases\/(\d+)-\d+\.[a-z0-9]+/gi)].map(m => Number(m[1])));
const seen = new Set();
const projects = items.filter(item => {
  const id = Number(item.id);
  return Number.isInteger(id) && !existing.has(id) && !seen.has(id) && seen.add(id);
}).map(item => {
  const category = item.category_name || item.category;
  return {
    id: Number(item.id),
    title: String(item.title || `Работа №${item.id}`).trim(),
    category: typeof category === 'string' ? category : String(category?.name || 'Проект'),
    media: [],
  };
});
fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
console.log(`На Kwork: ${items.length}; новых для сайта: ${projects.length}.`);
NODE

new_count="$(node -e "console.log(require(process.argv[1]).length)" "$temp/projects.json")"
if [[ "$new_count" == 0 ]]; then
  printf 'Новых публичных работ нет.\n'
  exit 0
fi

node - "$temp/projects.json" <<'NODE'
for (const project of JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'))) {
  console.log(`  #${project.id} — ${project.title}`);
}
NODE

if (( dry_run )); then
  printf 'Режим проверки: файлы не изменены.\n'
  exit 0
fi

mkdir -p "$assets"
for id in $(node - "$temp/projects.json" <<'NODE'
for (const project of JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'))) console.log(project.id);
NODE
); do
  printf 'Скачиваю изображения работы #%s…\n' "$id"
  fetch -X POST "https://kwork.ru/portfolio_large/$id?cache_bust=$cache_bust" \
    --data 'isWebpAccepted=1' -o "$temp/$id.html"
  node - "$temp/$id.html" "$temp/$id.txt" <<'NODE'
const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');
const urls = [], seen = new Set();
for (const found of html.match(/https:\/\/cdn-edge\.kwork\.ru\/files\/portfolio\/[^"'\\\s<>]+/g) || []) {
  const url = found.replace(/&amp;/g, '&');
  const key = new URL(url).pathname.split('/').pop();
  if (!seen.has(key)) { seen.add(key); urls.push(url); }
}
if (!urls.length) throw new Error('Изображения работы не найдены.');
fs.writeFileSync(process.argv[3], `${urls.join('\n')}\n`);
NODE
  image=0
  while IFS= read -r url; do
    image=$((image + 1))
    extension="${url%%\?*}"; extension="${extension##*.}"
    case "$extension" in webp|jpg|jpeg|png|gif|mp4|webm) ;; *) extension=webp ;; esac
    filename="$(printf '%s-%02d.%s' "$id" "$image" "$extension")"
    fetch "$url" -o "$assets/$filename"
    node - "$temp/projects.json" "$id" "public/client-cases/$filename" <<'NODE'
const fs = require('fs');
const [path, id, media] = process.argv.slice(2);
const projects = JSON.parse(fs.readFileSync(path, 'utf8'));
const project = projects.find(item => String(item.id) === id);
if (!project) throw new Error(`Работа #${id} не найдена.`);
project.media.push(media);
fs.writeFileSync(path, JSON.stringify(projects, null, 2));
NODE
  done < "$temp/$id.txt"
done

node - "$portfolio" "$index" "$temp/projects.json" <<'NODE'
const fs = require('fs');
const [portfolioPath, indexPath, projectsPath] = process.argv.slice(2);
let portfolio = fs.readFileSync(portfolioPath, 'utf8');
let index = fs.readFileSync(indexPath, 'utf8');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
const known = new Set([...portfolio.matchAll(/public\/client-cases\/(\d+)-\d+\.[a-z0-9]+/gi)].map(m => Number(m[1])));
const additions = projects.filter(project => !known.has(project.id));
if (!additions.length || additions.some(project => !project.media.length)) throw new Error('Новые карточки не готовы для вставки.');
const cards = additions.map(project => [
  '    {', `      title: ${JSON.stringify(project.title)},`, `      category: ${JSON.stringify(project.category)},`,
  '      media: [', ...project.media.map(media => `        ${JSON.stringify(media)},`), '      ],', '    },',
].join('\n')).join('\n');
portfolio = portfolio.replace('const portfolioItems = [\n', `const portfolioItems = [\n${cards}\n`);
fs.writeFileSync(portfolioPath, portfolio);
const total = new Set([...portfolio.matchAll(/public\/client-cases\/(\d+)-\d+\.[a-z0-9]+/gi)].map(m => Number(m[1]))).size;
const word = total % 10 === 1 && total % 100 !== 11 ? 'проект' : total % 10 >= 2 && total % 10 <= 4 && (total % 100 < 10 || total % 100 >= 20) ? 'проекта' : 'проектов';
index = index.replace(/(<div class="client-portfolio-heading">[\s\S]*?<p>)\d+ проект(?:ов|а)?<\/p>/, `$1${total} ${word}</p>`);
index = index.replace(/(portfolio\.js\?v=)[^"']+/, `$1${Date.now()}`);
fs.writeFileSync(indexPath, index);
console.log(`Добавлено: ${additions.length}; всего: ${total}.`);
NODE

printf 'Готово.\n'
