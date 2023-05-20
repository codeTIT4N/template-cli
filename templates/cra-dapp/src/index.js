import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BlockChainContextProvider } from "./context/BlockchainContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BlockChainContextProvider>
      <App />
    </BlockChainContextProvider>
  </React.StrictMode>
);
