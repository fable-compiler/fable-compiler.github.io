import * as fs from "fs"
import marked from "marked"
import * as highlight from "highlight.js"

marked.setOptions({
  highlight: function (code, lang) {
    return highlight.highlightAuto(code, [lang]).value;
  }
});

var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}">${text}</a></h${level}>`;
};

export function parseMarkdownDocFile(filePath) {
    return marked(fs.readFileSync(filePath).toString(), { renderer });
}