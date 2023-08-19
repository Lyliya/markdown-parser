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

let entry = fs.readFileSync("./m.md", "utf-8");

const parse = (markdown) => {
  markdown = markdown.trim();
  if (markdown.at(-1) !== "\n") markdown += "\n";

  // Replace ** ** with bold
  markdown = markdown.replace(/\*{2}(.+)\*{2}/g, `<strong>$1</strong>`);
  // Replace __ __ with bold
  markdown = markdown.replace(/_{2}(.+)_{2}/g, `<strong>$1</strong>`);

  // Replace * * with italic
  markdown = markdown.replace(/\*{1}(.+)\*{1}/g, `<em>$1</em>`);
  // Replace _ _ with italic
  markdown = markdown.replace(/_{1}(.+)_/g, `<em>$1</em>`);

  // HR
  markdown = markdown.replace(/((-|_|\*){3}(-|_|\*)*)\n/g, `<hr />\n`);

  // Replace Header
  markdown = markdown.replace(/(?:^|\n)(#{0,6}) (.*)/g, (_, group1, group2) => {
    return `<h${group1.length}>${group2}</h${group1.length}>\n\n`;
  });

  // Replace Images
  markdown = markdown.replace(
    /!\[(.+)\]\((.+)\)/g,
    `<img src="$2" alt="$1"></img>`
  );

  // Replace Link
  markdown = markdown.replace(/\[(.+)\]\((.+)\)/g, `<a href="$2">$1</a>`);

  // Replace BR
  markdown = markdown.replace(/(  \n)/g, "<br>");

  const lines = markdown
    .trim()
    .split("\n\n")
    .filter((e) => e);

  const handleParagraph = (line) => {
    return `<p>${line.replace("  \n", "<br>").replace("\n", " ").trim()}</p>\n`;
  };

  let output = "";

  for (let line of lines) {
    const htmlMatch = line.match(/<(.*)>(.*)<\/(.*)>(|\n)/g);

    if (line === "<hr />" || line === "<hr />\n") {
      output += `${line}${line.at(-1) === "\n" ? "" : "\n"}`;
    } else if (htmlMatch && htmlMatch[0].length === line.length) {
      if (line.includes("<strong>") || line.includes("<em>")) {
        output += handleParagraph(line);
      } else {
        output += `${line}${line.at(-1) === "\n" ? "" : "\n"}`;
      }
    }
    // else if (line[0] === "#") {
    //   output += handleHeader(line);
    // }
    else {
      output += handleParagraph(line);
    }
  }
  return output.trim();
};

console.log(parse(entry));

export default parse;
