import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material";
import { store } from "./store";
import App from "@/app";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from '@/serviceWorker'
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/movies-app">
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
