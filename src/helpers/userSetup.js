// Gremlin Camp owns its styling. The template links its own stylesheets and
// writes a few inline styles into every page; the transform below removes
// them from the built HTML so only Gremlin Camp's stylesheet reaches visitors.
// It also tags each page with the color scheme for its directory and
// restores the "On this page" heading on the table of contents.

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

// The template titles the table of contents with the note's title, which
// repeats the first entry below it.
function setTocTitle(html) {
  return html.replace(/(<div class="toc-title">)[\s\S]*?(<\/div>)/, "$1On this page$2");
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
    return setScheme(setTocTitle(stripTemplateStyles(content)), this.page.url);
  });
}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
