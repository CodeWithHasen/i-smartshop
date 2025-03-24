import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css"
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import IshopIndex from "./ishop/IshopIndex";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <IshopIndex />
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>
);
