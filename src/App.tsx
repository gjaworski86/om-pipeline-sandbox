import { useState } from "react";
import { CLICK_BUTTON_LABEL, clickCount, HEADLINE } from "./greeting";

export function App() {
  const [clicks, setClicks] = useState(0);

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
      <button
        data-testid="click-button"
        onClick={() => setClicks((previous) => previous + 1)}
      >
        {CLICK_BUTTON_LABEL}
      </button>
      <p data-testid="click-count">{clickCount(clicks)}</p>
    </main>
  );
}
