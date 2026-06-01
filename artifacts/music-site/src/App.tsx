import { Router as WouterRouter, Switch, Route } from "wouter";
import Home from "@/pages/Home";

function NotFound() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "rgba(255,255,255,0.3)", fontFamily: "system-ui" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>404 — Page not found</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default App;
