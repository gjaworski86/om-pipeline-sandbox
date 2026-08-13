import { expect, test } from "vitest";
import { clickCount, greeting, HEADLINE } from "./greeting";

test("greeting embeds the headline", () => {
  expect(greeting("world")).toBe(`${HEADLINE} — hello, world`);
});

test("clickCount uses the genitive plural for zero", () => {
  expect(clickCount(0)).toBe("0 kliknięć");
});

test("clickCount uses the singular for one", () => {
  expect(clickCount(1)).toBe("1 kliknięcie");
});

test("clickCount uses the nominative plural for two", () => {
  expect(clickCount(2)).toBe("2 kliknięcia");
});

test("clickCount uses the genitive plural for five", () => {
  expect(clickCount(5)).toBe("5 kliknięć");
});

test("clickCount uses the genitive plural for the teens", () => {
  expect(clickCount(12)).toBe("12 kliknięć");
  expect(clickCount(13)).toBe("13 kliknięć");
  expect(clickCount(14)).toBe("14 kliknięć");
});

test("clickCount returns to the nominative plural past the teens", () => {
  expect(clickCount(22)).toBe("22 kliknięcia");
});

test("clickCount keeps the singular for one alone, not for numbers ending in one", () => {
  expect(clickCount(101)).toBe("101 kliknięć");
});

test("clickCount applies the ending rule above one hundred", () => {
  expect(clickCount(102)).toBe("102 kliknięcia");
});
