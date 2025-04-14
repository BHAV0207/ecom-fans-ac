import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LogicProvider from "./store/LogicStore.jsx";
import { CartProvider } from "./store/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <LogicProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </LogicProvider>
);
