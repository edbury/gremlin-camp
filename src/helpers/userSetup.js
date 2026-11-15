// Gremlin Camp owns its styling. The template links its own stylesheets and
// writes a few inline styles into every page; the transform below removes
// them from the built HTML so only Gremlin Camp's stylesheet reaches visitors.
// It also drops template scripts a page doesn't use, tags each page with the
// color scheme for its directory, names the sidebar sections, disables links
// to unpublished notes, lets the keyboard reach header tags, and marks up
// tables and image-only paragraphs in notes for the stylesheet.
//
// Everything Gremlin Camp adds to the build lives in this file. Template
// updates replace .eleventy.js wholesale, and this file is left alone.
//
// The transforms match the template's markup exactly, and a template update
// can change that markup. A pattern that stops matching does nothing and
// reports nothing, so every built page is also checked for what the
// transforms exist to remove (CHECKS, below). If any page fails, the build
// fails and names the check and the pages. Netlify and Vercel keep the last
// good deploy live when a build fails.

const { parse } = require("node-html-parser");

const OWN_STYLESHEET = "/styles/user/gremlin-camp.css";

// Stylesheet links that survive. Anything else is a template default.
// Add a pattern here when you add a stylesheet of your own (a web font,
// a plugin you wrote).
const KEEP_STYLESHEETS = [
  /^\/styles\/user\/[^?#]+\.css(?:[?#]|$)/,
  /^\/plugins\/(?!dg-)[^/]+\//,
];

// First URL segment -> scheme name, set as <html data-scheme="...">.
// Schemes are defined in styles/user/abstracts/_tokens.scss.
const SCHEMES = {
  mosh: "mosh",
  mothership: "mosh",
  moonrise: "moonrise",
  stonetop: "stonetop",
};

// Template styles outside <head>. Matched by their exact shape so note
// content (which may carry its own <style> or inline styles) is never touched.
const TEMPLATE_BODY_STYLES = [
  /<style>\s*\.excalidraw-svg[\s\S]*?<\/style>/, // excalidrawScript.njk
];
const HTML_COLOR_SCHEME = /\sstyle="color-scheme:\s*only\s+\w+;?"/;
const NAVBAR_INLINE_STYLES = [
  /\sstyle="text-decoration:\s*none;?"/, // home link
  /\sstyle="margin:\s*15px\s*!important;?"/, // site name
];

const STYLESHEET_LINK = /<link\b[^>]*\brel=["']?stylesheet["']?[^>]*>/gi;
const STYLE_BLOCK = /<style\b([^>]*)>[\s\S]*?<\/style>/gi;

function hrefOf(tag) {
  const match = tag.match(/\bhref=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  return match ? match[1] || match[2] || match[3] : "";
}

function stripHead(head) {
  return (
    head
      .replace(STYLESHEET_LINK, (tag) =>
        KEEP_STYLESHEETS.some((keep) => keep.test(hrefOf(tag))) ? tag : ""
      )
      // <style data-keep> opts a block of your own out of removal.
      .replace(STYLE_BLOCK, (block, attrs) => (/\bdata-keep\b/.test(attrs) ? block : ""))
  );
}

function stripTemplateStyles(html) {
  html = html
    .replace(/<head\b[\s\S]*?<\/head>/i, stripHead)
    .replace(/<html\b[^>]*>/i, (tag) => tag.replace(HTML_COLOR_SCHEME, ""))
    .replace(/<nav class="navbar"[\s\S]*?<\/nav>/i, (nav) =>
      NAVBAR_INLINE_STYLES.reduce((out, inline) => out.replace(inline, ""), nav)
    );
  for (const block of TEMPLATE_BODY_STYLES) {
    html = html.replace(block, "");
  }

  // Pages with their own <head> (the 404 page) never link the stylesheet.
  if (!html.includes(OWN_STYLESHEET)) {
    html = html.replace(/<\/head>/i, `<link href="${OWN_STYLESHEET}" rel="stylesheet"></head>`);
  }
  return html;
}

// Scripts the template loads on every page, each kept only on pages that use
// it. `uses` tests the page's HTML. `left` finds the script in any form, so
// the build checks can tell when `tags` no longer match it.
const OPTIONAL_SCRIPTS = [
  {
    // Local graph (dgShowLocalGraph). pixi.js loads before the page renders.
    tags: [/<script type="importmap">[\s\S]*?<\/script>/, /<script\b[^>]*pixi\.js[^>]*><\/script>/],
    left: /<script\b[^>]*(?:type="importmap"|pixi\.js)/,
    uses: (html) => html.includes('id="graph-component"'),
  },
  {
    tags: [/<script\b[^>]*type="module"[^>]*>[^<]*mermaid[\s\S]*?<\/script>/],
    left: /mermaid\.esm\b/,
    uses: (html) => /class="mermaid\b/.test(html),
  },
  {
    // Code highlighting
    tags: [/<script\b[^>]*\/prism\.min\.js[^>]*><\/script>/, /<script\b[^>]*prism-autoloader[^>]*><\/script>/],
    left: /<script\b[^>]*\bprism\b/,
    uses: (html) => /class="(?:[^"]*\s)?language-/.test(html),
  },
  {
    // Alpine drives the file tree and the graph controls.
    tags: [/<script\b[^>]*@alpinejs\/persist[^>]*><\/script>/, /<script\b[^>]*\/alpinejs@[^>]*><\/script>/],
    left: /<script\b[^>]*alpinejs/,
    uses: (html) => /\sx-data\b/.test(html),
  },
  {
    // fetch() polyfill; every current browser has fetch.
    tags: [/<script\b[^>]*whatwg-fetch[^>]*><\/script>/],
    left: /<script\b[^>]*whatwg-fetch/,
    uses: () => false,
  },
  {
    // Lucide icons. The frame uses none; callouts and the graph still do.
    // The callout script calls lucide.createIcons() on every page, so a
    // no-op stands in for the library where it is dropped.
    tags: [
      /<script\b[^>]*unpkg\.com\/lucide@[^>]*><\/script>/,
      /<script\b[^>]*>(?:(?!<\/script>)[\s\S]){0,120}?lucide\.createIcons(?:(?!<\/script>)[\s\S])*<\/script>/,
    ],
    standIn: "<script>window.lucide={createIcons:function(){}}</script>",
    left: /<script\b[^>]*\/lucide@/,
    uses: (html) => /class="callout\b/.test(html) || html.includes('id="graph-component"'),
  },
];

function stripUnusedScripts(html) {
  for (const script of OPTIONAL_SCRIPTS) {
    if (script.uses(html)) continue;
    script.tags.forEach((tag, i) => {
      html = html.replace(tag, i === 0 && script.standIn ? script.standIn : "");
    });
  }
  return html;
}

// Sidebar headings. The template titles the table of contents with the
// note's title, which repeats the first entry below it.
function setSidebarTitles(html) {
  return html
    .replace(/(<div class="toc-title">)[\s\S]*?(<\/div>)/, "$1contents$2")
    .replace(/(<div class="backlink-title">)[\s\S]*?(<\/div>)/, "$1backlinks$2");
}

// Links to unpublished notes point at /404. Keep them as links but disable
// them: no href, so nothing leads to a dead end, and aria-disabled so screen
// readers announce a link that isn't available yet.
function disableUnresolved(html) {
  return html.replace(
    /<a class="internal-link is-unresolved"[^>]*>/g,
    '<a class="internal-link is-unresolved" role="link" aria-disabled="true" title="Not published yet">'
  );
}

// The template's tags, in the header and in note text, have no href, so the
// keyboard skips them. dg-search opens a tag search for a.tag with this href.
function focusableTags(html) {
  return html.replace(/<a class="tag"(?![^>]*\shref=)/g, '<a class="tag" href="javascript:void(0);"');
}

function setScheme(html, url) {
  const segment = (url || "").split("/")[1];
  const scheme = SCHEMES[segment];
  if (!scheme) return html;
  return html.replace(/<html\b/i, `<html data-scheme="${scheme}"`);
}

// Note markup the stylesheet can't work out on its own. Runs after the
// template's "obsidian-html" transform, which wraps each top-level table in
// div.table-wrapper, so these attributes land on the <table> itself.

// Body cells that hold a number: digits with separators, an optional sign
// or currency, and an optional short unit, "+" or range ("1kcr", "4-6",
// "1+").
const NUMBER_CELL = /^[-−+]?[$€£¥]?\d[\d,]*(\.\d+)?(\+|\s?[a-z%]{1,4}|\s?[-–]\s?\d[\d,]*(\.\d+)?)?$/i;
// Empty, or a dash standing in for empty.
const EMPTY_CELL = /^[-–—]?$/;

function cellsOf(tr) {
  return tr.childNodes.filter(
    (node) => node.nodeType === 1 && /^t[dh]$/i.test(node.rawTagName)
  );
}

// Table structure (base/_base.scss, "Tables are drawn the way psql prints
// them"):
//   - roles on every part, so the cells stay a table to screen readers
//     when the narrow layout makes them blocks
//   - .gc-num on a column whose filled body cells are at least
//     three-quarters numbers, header included; the odd word in it ("free"
//     in a cost column) aligns with the numbers
//   - data-label on each body cell, its column's header
//   - --gc-label, the longest header in characters
//   - .gc-fit-N, the note width in characters (a step of 8) below which
//     the table prints as records instead of columns
// Centered cells from ":---:" also lose their centering.
const TEXT_COLUMN_CAP = 20; // characters a text column may wrap down to
const GUTTERS = 5; // characters between the note's edges and a wide table

function markTable(table) {
  const head = table.querySelectorAll("thead > tr").map(cellsOf);
  const body = table.querySelectorAll("tbody > tr").map(cellsOf);
  const rows = [...head, ...body];

  table.setAttribute("role", "table");
  for (const group of table.querySelectorAll("thead, tbody")) {
    group.setAttribute("role", "rowgroup");
  }
  for (const tr of table.querySelectorAll("tr")) {
    tr.setAttribute("role", "row");
  }
  for (const cell of head.flat()) {
    cell.setAttribute("role", "columnheader");
  }
  for (const cell of body.flat()) {
    cell.setAttribute("role", /^th$/i.test(cell.rawTagName) ? "rowheader" : "cell");
  }

  for (const cell of rows.flat()) {
    if (/text-align:\s*center/.test(cell.getAttribute("style") || "")) {
      cell.removeAttribute("style");
    }
  }

  if (rows.flat().some((cell) => cell.getAttribute("colspan"))) {
    return;
  }

  const labels = (head[head.length - 1] || []).map((cell) => cell.text.trim());
  const columns = Math.max(labels.length, ...body.map((cells) => cells.length));
  // Padding, and "| " before each column after the first.
  let width = 2 + 3 * (columns - 1);

  for (let i = 0; i < columns; i++) {
    const texts = rows.map((cells) => (cells[i] ? cells[i].text.trim() : ""));
    const values = body
      .map((cells) => (cells[i] ? cells[i].text.trim() : ""))
      .filter((value) => !EMPTY_CELL.test(value));
    const numbers = values.filter((value) => NUMBER_CELL.test(value));
    const numeric = values.length > 0 && numbers.length >= 0.75 * values.length;

    if (numeric) {
      for (const cells of rows) {
        cells[i]?.classList.add("gc-num");
      }
    }

    const longest = Math.max(0, ...texts.map((text) => text.length));
    const longestWord = Math.max(
      0,
      ...texts.flatMap((text) => text.split(/\s+/).map((word) => word.length))
    );
    width += numeric ? longest : Math.min(longest, Math.max(longestWord, TEXT_COLUMN_CAP));

    if (labels[i]) {
      for (const cells of body) {
        cells[i]?.setAttribute("data-label", labels[i]);
      }
    }
  }

  const fit = Math.min(160, Math.max(24, Math.ceil((width + GUTTERS) / 8) * 8));
  table.classList.add(`gc-fit-${fit}`);
  table.setAttribute(
    "style",
    `--gc-label: ${Math.max(1, ...labels.map((label) => label.length))}ch`
  );
}

// A paragraph holding only images (an embed on its own line) is marked so
// the stylesheet can let it grow past the text's measure.
function markNotes(html) {
  if (!html.includes("cm-s-obsidian")) return html;
  const parsed = parse(html);
  for (const table of parsed.querySelectorAll(".cm-s-obsidian table")) {
    markTable(table);
  }
  for (const p of parsed.querySelectorAll(".cm-s-obsidian > p")) {
    if (p.querySelector("img") && p.text.trim() === "") {
      p.classList.add("gc-image");
    }
  }
  return parsed.toString();
}

// Build checks, run on each page's finished HTML. Each one looks for what a
// transform removes in any form the template might write it, rather than the
// exact form the transform matches.
const headOf = (html) => (html.match(/<head\b[\s\S]*?<\/head>/i) || [""])[0];
const textOf = (html, className) => {
  const match = html.match(new RegExp(`class="${className}"[^>]*>([\\s\\S]*?)<`));
  return match && match[1].trim();
};

const CHECKS = [
  {
    name: "a template stylesheet is still linked",
    fails: (html) =>
      (headOf(html).match(/<link\b[^>]*>/gi) || []).some(
        (tag) =>
          /stylesheet|\.css\b/i.test(tag) &&
          !/rel=["']?(?:icon|apple-touch-icon|manifest)/i.test(tag) &&
          !KEEP_STYLESHEETS.some((keep) => keep.test(hrefOf(tag)))
      ),
  },
  {
    name: "a template <style> block is still in <head>",
    fails: (html) => /<style\b(?![^>]*\bdata-keep\b)/i.test(headOf(html)),
  },
  {
    name: "<html> still carries an inline style",
    fails: (html) => /<html\b[^>]*\sstyle=/i.test(html),
  },
  {
    name: "a script the page doesn't use is still loaded",
    fails: (html) =>
      OPTIONAL_SCRIPTS.some((script) => !script.uses(html) && script.left.test(html)),
  },
  {
    name: "the contents title isn't \"contents\"",
    fails: (html) => ![null, "contents"].includes(textOf(html, "toc-title")),
  },
  {
    name: "the backlinks title isn't \"backlinks\"",
    fails: (html) => ![null, "backlinks"].includes(textOf(html, "backlink-title")),
  },
  {
    name: "a table in a note has no roles",
    fails: (html) =>
      /<table\b(?![^>]*\brole=)/i.test(((html.split(/<main\b/i)[1] || "").split(/<\/main>/i)[0])),
  },
  {
    name: "a link to an unpublished note still has an href",
    fails: (html) => /<a\b(?=[^>]*\bis-unresolved\b)[^>]*\shref=/i.test(html),
  },
  {
    name: "a tag has no href",
    fails: (html) => /<a\b(?=[^>]*\sclass="(?:[^"]*\s)?tag(?:\s[^"]*)?")(?![^>]*\shref=)[^>]*>/i.test(html),
  },
];

// Check name -> URLs of the pages that fail it, for the current build.
const failures = new Map();

function check(html, url) {
  for (const { name, fails } of CHECKS) {
    if (!fails(html)) continue;
    if (!failures.has(name)) failures.set(name, []);
    failures.get(name).push(url);
  }
}

function report() {
  if (!failures.size) return;
  const lines = [...failures].map(([name, urls]) => {
    const shown = urls.slice(0, 5).join(", ");
    const more = urls.length > 5 ? ` and ${urls.length - 5} more` : "";
    return `  ${name}: ${shown}${more}`;
  });
  throw new Error(
    "gremlin-camp: the template's markup no longer matches userSetup.js.\n" + lines.join("\n")
  );
}

function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
function userEleventySetup(eleventyConfig) {
  eleventyConfig.on("eleventy.before", () => failures.clear());
  eleventyConfig.on("eleventy.after", report);

  eleventyConfig.addTransform("gremlin-camp", function (content) {
    const outputPath = (this.page && this.page.outputPath) || "";
    if (!outputPath.endsWith(".html")) return content;
    let html = stripTemplateStyles(content);
    html = stripUnusedScripts(html);
    html = setSidebarTitles(html);
    html = disableUnresolved(html);
    html = focusableTags(html);
    html = setScheme(html, this.page.url);
    html = markNotes(html);
    check(html, this.page.url);
    return html;
  });
}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
