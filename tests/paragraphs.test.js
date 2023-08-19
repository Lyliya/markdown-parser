import { expect, test } from "vitest";
import parse from "../parser";

test("simple paragraph", () => {
  const markdown = `Hello World`;
  const result = `<p>Hello World</p>`;
  expect(parse(markdown)).toBe(result);
});

test("multiline paragraph", () => {
  const markdown = `Hello
World`;
  const result = `<p>Hello World</p>`;
  expect(parse(markdown)).toBe(result);
});

test("paragraph with <br>", () => {
  const markdown = `Hello  
World`;
  const result = `<p>Hello<br>World</p>`;
  expect(parse(markdown)).toBe(result);
});
