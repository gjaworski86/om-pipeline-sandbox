import { expect, test } from "vitest";
import { greeting, HEADLINE } from "./greeting";

test("greeting embeds the headline", () => {
  expect(greeting("world")).toBe("deliberately wrong");
});
