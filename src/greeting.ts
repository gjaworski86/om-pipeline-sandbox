/** The one visible string in the app — the thing a pipeline run changes. */
export const HEADLINE = "Sandbox is running";

/** The label on the click counter's button — on-screen text lives in this module. */
export const CLICK_BUTTON_LABEL = "Kliknij mnie";

export function greeting(name: string): string {
  return `${HEADLINE} — hello, ${name}`;
}

/**
 * The click counter label. Always the genitive plural for now — the Polish
 * inflection rule arrives in a follow-up ticket.
 */
export function clickCount(count: number): string {
  return `${count} kliknięcia`;
}
