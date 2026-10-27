// Gremlin Camp owns its styling. The template links its own stylesheets and
// writes a few inline styles into every page; the transform below removes
// them from the built HTML so only Gremlin Camp's stylesheet reaches visitors.
// It also drops template scripts a page doesn't use, tags each page with the
// color scheme for its directory, names the sidebar sections, disables links
// to unpublished notes, and lets the keyboard reach header tags.

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
// it. `uses` tests the page's HTML.
const OPTIONAL_SCRIPTS = [
  {
    // Local graph (dgShowLocalGraph). pixi.js loads before the page renders.
    tags: [/<script type="importmap">[\s\S]*?<\/script>/, /<script\b[^>]*pixi\.js[^>]*><\/script>/],
    uses: (html) => html.includes('id="graph-component"'),
  },
  {
    tags: [/<script\b[^>]*type="module"[^>]*>[^<]*mermaid[\s\S]*?<\/script>/],
    uses: (html) => /class="mermaid\b/.test(html),
  },
  {
    // Code highlighting
    tags: [/<script\b[^>]*\/prism\.min\.js[^>]*><\/script>/, /<script\b[^>]*prism-autoloader[^>]*><\/script>/],
    uses: (html) => /class="(?:[^"]*\s)?language-/.test(html),
  },
  {
    // Alpine drives the file tree and the graph controls.
    tags: [/<script\b[^>]*@alpinejs\/persist[^>]*><\/script>/, /<script\b[^>]*\/alpinejs@[^>]*><\/script>/],
    uses: (html) => /\sx-data\b/.test(html),
  },
  {
    // fetch() polyfill; every current browser has fetch.
    tags: [/<script\b[^>]*whatwg-fetch[^>]*><\/script>/],
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

// The template's header tags have no href, so the keyboard skips them.
// dg-search opens a tag search for a.tag with this href.
function focusableTags(html) {
  return html.replace(/<a class="tag">/g, '<a class="tag" href="javascript:void(0);">');
}

function setScheme(html, url) {
  const segment = (url || "").split("/")[1];
  const scheme = SCHEMES[segment];
  if (!scheme) return html;
  return html.replace(/<html\b/i, `<html data-scheme="${scheme}"`);
}

function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
function userEleventySetup(eleventyConfig) {
  eleventyConfig.addTransform("gremlin-camp", function (content) {
    const outputPath = (this.page && this.page.outputPath) || "";
    if (!outputPath.endsWith(".html")) return content;
    let html = stripTemplateStyles(content);
    html = stripUnusedScripts(html);
    html = setSidebarTitles(html);
    html = disableUnresolved(html);
    html = focusableTags(html);
    return setScheme(html, this.page.url);
  });
}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
