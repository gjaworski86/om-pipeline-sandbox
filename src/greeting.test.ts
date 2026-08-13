import { expect, test } from "vitest";
import { clickCount, greeting, HEADLINE } from "./greeting";

test("greeting embeds the headline", () => {
  expect(greeting("world")).toBe(`${HEADLINE} — hello, world`);
});

test("clickCount labels zero clicks", () => {
  expect(clickCount(0)).toBe("0 kliknięć");
});

test("clickCount labels one click", () => {
  expect(clickCount(1)).toBe("1 kliknięć");
});

test("clickCount labels five clicks", () => {
  expect(clickCount(5)).toBe("5 kliknięć");
});
