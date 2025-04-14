import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LogicProvider from "./store/LogicStore.jsx";

createRoot(document.getElementById("root")).render(
    <LogicProvider>
      <App />
    </LogicProvider>
);
