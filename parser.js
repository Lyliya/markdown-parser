import fs from "fs";

/**
 * Headings ✅
 * Paragraphs ✅
 * Line Break ✅
 * Bold ✅
 * Italic ✅
 * Blockquotes
 * List
 * Code
 * HR ✅
 * Links ✅
 * Images ✅
 */

let markdown = fs.readFileSync("./markdown.md", "utf-8");

if (markdown.at(-1) !== "\n") markdown += "\n";

// HR
markdown = markdown.replace(/((-|_|\*){3}(-|_|\*)*)\n/g, `<hr />\n`);

// Replace ** ** with bold
markdown = markdown.replace(/\*{2}(.+)\*{2}/g, `<strong>$1</strong>`);
// Replace __ __ with bold
markdown = markdown.replace(/_{2}(.+)_{2}/g, `<strong>$1</strong>`);

// Replace * * with italic
markdown = markdown.replace(/\*{1}(.+)\*{1}/g, `<em>$1</em>`);
// Replace _ _ with italic
markdown = markdown.replace(/_{1}(.+)_/g, `<em>$1</em>`);

// Replace Images
markdown = markdown.replace(
  /!\[(.+)\]\((.+)\)/g,
  `<img src="$2" alt="$1"></img>`
);

// Replace Link
markdown = markdown.replace(/\[(.+)\]\((.+)\)/g, `<a href="$2">$1</a>`);

const lines = markdown.split("\n\n").filter((e) => e);

const handleHeader = (line) => {
  let level = 1;
  while (line[level] === "#") level += 1;
  return `<h${level}>${line.slice(level, line.length).trim()}</h${level}>\n`;
};

const handleParagraph = (line) => {
  return `<p>${line.replace("  \n", "<br>").replace("\n", " ").trim()}</p>\n`;
};

let output = "";

for (let line of lines) {
  const htmlMatch = line.match(/<(.*)>(.*)<\/(.*)>/g);

  if (line === "<hr />" || line === "<hr />\n") {
    output += `${line}${line.at(-1) === "\n" ? "" : "\n"}`;
  } else if (htmlMatch && htmlMatch[0].length === line.length) {
    if (line.includes("<strong>") || line.includes("<em>")) {
      output += handleParagraph(line);
    } else {
      output += `${line}${line.at(-1) === "\n" ? "" : "\n"}`;
    }
  } else if (line[0] === "#") {
    output += handleHeader(line);
  } else {
    output += handleParagraph(line);
  }
}

fs.writeFileSync("output.html", output);
