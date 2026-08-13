import { HEADLINE } from "./greeting";

export function App() {
  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
      }}
    >
      <h1 data-testid="headline">{HEADLINE}</h1>
    </main>
  );
}
