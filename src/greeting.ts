/** The one visible string in the app — the thing a pipeline run changes. */
export const HEADLINE = "Sandbox is running";

/** The label on the click counter's button — on-screen text lives in this module. */
export const CLICK_BUTTON_LABEL = "Kliknij mnie";

export function greeting(name: string): string {
  return `${HEADLINE} — hello, ${name}`;
}

/**
 * The click counter label, with the Polish inflection of "kliknięcie" spelled
 * out as three explicit cases, in this order:
 *
 * 1. exactly `1` → singular `kliknięcie`;
 * 2. last digit `2..4` and the number not in the `12..14` teens → nominative
 *    plural `kliknięcia`;
 * 3. everything else, zero included → genitive plural `kliknięć`.
 *
 * Defined for non-negative integers only.
 */
export function clickCount(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (count === 1) {
    return `${count} kliknięcie`;
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return `${count} kliknięcia`;
  }

  return `${count} kliknięć`;
}
