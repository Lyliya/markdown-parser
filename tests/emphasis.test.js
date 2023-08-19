import { expect, test } from "vitest";
import parse from "../parser";

test("bold with **", () => {
  const markdown = `**Hello World**`;
  const result = `<p><strong>Hello World</strong></p>`;
  expect(parse(markdown)).toBe(result);
});

test("bold with __", () => {
  const markdown = `__Hello World__`;
  const result = `<p><strong>Hello World</strong></p>`;
  expect(parse(markdown)).toBe(result);
});

test("bold in a word", () => {
  const markdown = `H**ello Worl**d`;
  const result = `<p>H<strong>ello Worl</strong>d</p>`;
  expect(parse(markdown)).toBe(result);
});

test("italic with *", () => {
  const markdown = `*Hello World*`;
  const result = `<p><em>Hello World</em></p>`;
  expect(parse(markdown)).toBe(result);
});

test("italic with _", () => {
  const markdown = `_Hello World_`;
  const result = `<p><em>Hello World</em></p>`;
  expect(parse(markdown)).toBe(result);
});

test("italic in a word", () => {
  const markdown = `H*ello Worl*d`;
  const result = `<p>H<em>ello Worl</em>d</p>`;
  expect(parse(markdown)).toBe(result);
});

test("bold and italic 1", () => {
  const markdown = `**_Hello World_**`;
  const result = `<p><strong><em>Hello World</em></strong></p>`;
  expect(parse(markdown)).toBe(result);
});

test("bold and italic 2", () => {
  const markdown = `_**Hello World**_`;
  const result = `<p><em><strong>Hello World</strong></em></p>`;
  expect(parse(markdown)).toBe(result);
});
