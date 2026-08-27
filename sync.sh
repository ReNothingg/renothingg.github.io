set -euo pipefail

readonly REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly PORTFOLIO_JS="$REPO_DIR/portfolio.js"
readonly INDEX_HTML="$REPO_DIR/index.html"
readonly ASSET_DIR="$REPO_DIR/public/client-cases"
readonly KWORK_USER_ID="${KWORK_USER_ID:-21370180}"
readonly KWORK_USERNAME="${KWORK_USERNAME:-renothing}"

DRY_RUN=0

usage() {
  printf 'Использование: %s [--dry-run]\n' "${0##*/}"
}

case "${1:-}" in
  '') ;;
  --dry-run) DRY_RUN=1 ;;
  --help|-h) usage; exit 0 ;;
  *) usage >&2; exit 2 ;;
esac

for command in curl node; do
  command -v "$command" >/dev/null || {
    printf 'Не найдено: %s\n' "$command" >&2
    exit 1
  }
done

[[ -f "$PORTFOLIO_JS" && -f "$INDEX_HTML" ]] || {
  printf 'Запусти.\n' >&2
  exit 1
}

TEMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/kwork-portfolio.XXXXXX")"
trap 'rm -rf "$TEMP_DIR"' EXIT
readonly CACHE_BUST="$(date +%s)-$RANDOM"
readonly LIST_JSON="$TEMP_DIR/list.json"
readonly NEW_PROJECTS_JSON="$TEMP_DIR/new-projects.json"

fetch() {
  curl --fail --silent --show-error --location --compressed --retry 3 \
    -H 'Cache-Control: no-cache' \
    -H 'Pragma: no-cache' \
    -H "Referer: https://kwork.ru/user/$KWORK_USERNAME" \
    "$@"
}

printf 'Проверяю публичное портфолио Kwork…\n'
fetch -X POST \
  "https://kwork.ru/portfolio/get_more/by_user?cache_bust=$CACHE_BUST" \
  --data "userId=$KWORK_USER_ID&category=0&limit=100&isWebpAccepted=1" \
  -o "$LIST_JSON"

node - "$PORTFOLIO_JS" "$LIST_JSON" "$NEW_PROJECTS_JSON" <<'NODE'
const fs = require('fs');
const [portfolioPath, listPath, outputPath] = process.argv.slice(2);
const source = fs.readFileSync(portfolioPath, 'utf8');
const payload = JSON.parse(fs.readFileSync(listPath, 'utf8'));
const portfolios = payload?.data?.portfolios;

if (!Array.isArray(portfolios)) {
  throw new Error('Кворк ниче не вернул');
}

const existingIds = new Set(
  [...source.matchAll(/public\/client-cases\/(\d+)-\d+\.[a-z0-9]+/gi)].map((match) => Number(match[1]))
);
const seen = new Set();
const projects = portfolios
  .filter((item) => Number.isInteger(Number(item.id)))
  .filter((item) => !existingIds.has(Number(item.id)))
  .filter((item) => !seen.has(Number(item.id)) && seen.add(Number(item.id)))
  .map((item) => ({
    id: Number(item.id),
    title: String(item.title || `Работа №${item.id}`).trim(),
    category: String(item.category_name || item.category || 'Проект').trim(),
    media: [],
  }));

fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
console.log(`На Kwork: ${portfolios.length}; новых для сайта: ${projects.length}.`);
if (payload?.data?.haveNext) {
  console.warn('кворк вернул не весь список');
}
NODE

NEW_COUNT="$(node -e "console.log(require(process.argv[1]).length)" "$NEW_PROJECTS_JSON")"
if [[ "$NEW_COUNT" == '0' ]]; then
  printf 'Новых публичных работ нет — сайт уже синхронизирован.\n'
  exit 0
fi

printf 'Новые работы:\n'
node - "$NEW_PROJECTS_JSON" <<'NODE'
for (const item of JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'))) {
  console.log(`  #${item.id} — ${item.title}`);
}
NODE

if (( DRY_RUN )); then
  printf 'Режим проверки: файлы не изменены.\n'
  exit 0
fi

mkdir -p "$ASSET_DIR"

for project_id in $(node - "$NEW_PROJECTS_JSON" <<'NODE'
for (const item of JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'))) console.log(item.id);
NODE
); do
  modal_html="$TEMP_DIR/$project_id.html"
  media_list="$TEMP_DIR/$project_id-media.txt"

  printf 'Забираю изображения работы #%s…\n' "$project_id"
  fetch -X POST \
    "https://kwork.ru/portfolio_large/$project_id?cache_bust=$CACHE_BUST" \
    --data 'isWebpAccepted=1' \
    -o "$modal_html"

  node - "$modal_html" "$media_list" <<'NODE'
const fs = require('fs');
const [htmlPath, outputPath] = process.argv.slice(2);
const html = fs.readFileSync(htmlPath, 'utf8');
const matches = html.match(/https:\/\/cdn-edge\.kwork\.ru\/files\/portfolio\/[^"'\\\s<>]+/g) || [];
const seen = new Set();
const urls = matches
  .map((url) => url.replace(/&amp;/g, '&'))
  .filter((url) => {
    const key = new URL(url).pathname.split('/').pop();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
if (!urls.length) throw new Error(`Нет картинок: ${htmlPath}`);
fs.writeFileSync(outputPath, `${urls.join('\n')}\n`);
NODE

  image_number=0
  while IFS= read -r image_url; do
    [[ -n "$image_url" ]] || continue
    image_number=$((image_number + 1))
    url_path="${image_url%%\?*}"
    extension="${url_path##*.}"
    case "$extension" in
      webp|jpg|jpeg|png|gif|mp4|webm) ;;
      *) extension='webp' ;;
    esac
    filename="$(printf '%s-%02d.%s' "$project_id" "$image_number" "$extension")"
    fetch "$image_url" -o "$ASSET_DIR/$filename"
    node - "$NEW_PROJECTS_JSON" "$project_id" "public/client-cases/$filename" <<'NODE'
const fs = require('fs');
const [path, id, mediaPath] = process.argv.slice(2);
const projects = JSON.parse(fs.readFileSync(path, 'utf8'));
const project = projects.find((item) => String(item.id) === id);
if (!project) throw new Error(`Не найдена работа #${id}`);
project.media.push(mediaPath);
fs.writeFileSync(path, JSON.stringify(projects, null, 2));
NODE
  done < "$media_list"
done

node - "$PORTFOLIO_JS" "$INDEX_HTML" "$NEW_PROJECTS_JSON" <<'NODE'
const fs = require('fs');
const [portfolioPath, indexPath, projectsPath] = process.argv.slice(2);
let portfolio = fs.readFileSync(portfolioPath, 'utf8');
let index = fs.readFileSync(indexPath, 'utf8');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
const existingIds = new Set([...portfolio.matchAll(/public\/client-cases\/(\d+)-\d+\.[a-z0-9]+/gi)].map((match) => Number(match[1])));
const additions = projects.filter((project) => !existingIds.has(project.id));

if (!additions.length) throw new Error('Нечего добавлять: карточки уже есть в portfolio.js.');
if (additions.some((project) => !project.media.length)) throw new Error('У одной из новых работ нет скачанных изображений.');

const cards = additions.map((project) => [
  '    {',
  `      title: ${JSON.stringify(project.title)},`,
  `      category: ${JSON.stringify(project.category)},`,
  '      media: [',
  ...project.media.map((media) => `        ${JSON.stringify(media)},`),
  '      ],',
  '    },',
].join('\n')).join('\n');

if (!/const portfolioItems = \[\n/.test(portfolio)) throw new Error('Не найдена точка вставки в portfolio.js.');
portfolio = portfolio.replace('const portfolioItems = [\n', `const portfolioItems = [\n${cards}\n`);
fs.writeFileSync(portfolioPath, portfolio);

const total = new Set([...portfolio.matchAll(/public\/client-cases\/(\d+)-\d+\.[a-z0-9]+/gi)].map((match) => Number(match[1]))).size;
const heading = /(<div class="client-portfolio-heading">[\s\S]*?<p>)\d+( проектов<\/p>)/;
if (!heading.test(index)) throw new Error('нет счетичка');
index = index.replace(heading, `$1${total}$2`);
index = index.replace(/(portfolio\.js\?v=)[^"']+/, `$1${Date.now()}`);
fs.writeFileSync(indexPath, index);
console.log(`Добавлено: ${additions.length}. Всего: ${total}.`);
NODE

printf 'Готово. Проверь изменения: git diff -- portfolio.js index.html public/client-cases\n'
