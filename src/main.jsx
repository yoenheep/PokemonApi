import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </LanguageProvider>
);
