import { expect, test } from "vitest";
import parse from "../parser";

test("h1 header", () => {
  const markdown = `# Header 1`;
  const result = `<h1>Header 1</h1>`;
  expect(parse(markdown)).toBe(result);
});

test("h2 header", () => {
  const markdown = `## Header 2`;
  const result = `<h2>Header 2</h2>`;
  expect(parse(markdown)).toBe(result);
});

test("h3 header", () => {
  const markdown = `### Header 3`;
  const result = `<h3>Header 3</h3>`;
  expect(parse(markdown)).toBe(result);
});

test("h4 header", () => {
  const markdown = `#### Header 4`;
  const result = `<h4>Header 4</h4>`;
  expect(parse(markdown)).toBe(result);
});

test("h5 header", () => {
  const markdown = `##### Header 5`;
  const result = `<h5>Header 5</h5>`;
  expect(parse(markdown)).toBe(result);
});

test("h6 header", () => {
  const markdown = `###### Header 6`;
  const result = `<h6>Header 6</h6>`;
  expect(parse(markdown)).toBe(result);
});

test("multiple header", () => {
  const markdown = `# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
`;
  const result = `<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>
<h6>Header 6</h6>`;
  expect(parse(markdown)).toBe(result);
});

test("wrong header", () => {
  const markdown = `####### Header 7`;
  const result = `<p>####### Header 7</p>`;
  expect(parse(markdown)).toBe(result);
});
