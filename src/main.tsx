import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";

// 检测是否在GitHub Pages环境下运行，如果是则使用HashRouter
const isGitHubPages = process.env.NODE_ENV === 'production';
const Router = isGitHubPages ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
      <Toaster />
    </Router>
  </StrictMode>
);
