/**
 * @file Represents the main component export, that is the landing page of the application.
 */

/* eslint-disable lodash-f/prefer-lodash-typecheck -- disabled */

import "./index.css";

import { isNullish } from "radashi";
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { QueryProvider } from "./modules/QueryProvider.tsx";

if (typeof document !== "undefined") {
    const foundRootElement = document.querySelector("#root");
    if (!isNullish(foundRootElement)) {
        createRoot(foundRootElement).render(
            <React.StrictMode>
                <QueryProvider>
                    <App />
                </QueryProvider>
            </React.StrictMode>,
        );
    }
}
