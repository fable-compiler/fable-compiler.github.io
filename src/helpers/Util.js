/// @ts-check

import * as fs from "fs"
import marked from "marked"

export function parseMarkdownDocFile(filePath) {
    var renderer = new marked.Renderer();
    renderer.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}">${text}</a></h${level}>`;
    };
    return marked(fs.readFileSync(filePath).toString(), { renderer: renderer });
}