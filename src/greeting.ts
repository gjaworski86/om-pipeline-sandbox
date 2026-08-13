/** The one visible string in the app — the thing a pipeline run changes. */
export const HEADLINE = "Sandbox is running";

export function greeting(name: string): string {
  return `${HEADLINE} — hello, ${name}`;
}
