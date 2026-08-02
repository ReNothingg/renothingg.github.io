# Design QA — client cases alignment

- Source visual truth: `C:/Users/pasha/AppData/Local/Temp/codex-clipboard-5575b98b-2c54-4357-bc6d-2c3ddda8a075.png` (reported 1920 px desktop failure), with the two additional user screenshots as responsive/zoom evidence.
- Implementation screenshots: `C:/Site/renothingg.github.io/client-cases-fixed-desktop.png`, `C:/Site/renothingg.github.io/client-cases-fixed-mobile.png`.
- Viewports: desktop 1920 × 1080 CSS px at density 1; mobile 390 × 844 CSS px at density 1.
- State: `/?cases`, initial horizontal-scroll position.

## Full-view comparison evidence

The source shows the case rows detached from the shared page container and extending toward/off the right viewport edge. In the revised desktop render, the title, large-card scroller, divider, heading, and small-card grid share the same 1200 px content width (left 352.5 px, right 1552.5 px). The document has no horizontal overflow beyond the browser scrollbar. At 390 px, every section wrapper remains within the 345 px inner content width; only the intentionally scrollable large-card row is wider internally.

## Focused region comparison evidence

Focused checks covered the large-card scroller and small-task grid because those were the reported failure surfaces. Typography, colors, borders, radii, imagery, and copy were intentionally unchanged. The large cards retain horizontal scrolling and scroll snapping; the small cards remain a wrapping grid.

## Findings and comparison history

- P1 fixed: viewport-width positioning (`100vw`, `left: 50%`, negative viewport margin/translation) detached both rows from `.container`.
- Fix: both rows now use `width: 100%` and `min-width: 0`; viewport offsets and transforms were removed; horizontal scrolling remains scoped to `.order-cards`.
- Post-fix evidence: desktop and mobile bounding-box checks show matching container edges and no page-level horizontal overflow. Browser console: no warnings or errors.

Required fidelity surfaces: fonts/typography unchanged; spacing/layout corrected; colors/tokens unchanged; image assets unaffected; copy/content unchanged.

Primary interaction tested: responsive horizontal case scroller remains available. No focused asset comparison was needed because the affected section contains no changed imagery.

final result: passed
