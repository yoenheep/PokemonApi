import { useContext, useState } from "react";
import { createContext } from "react";

// 1. context 생성
export const LanguageContext = createContext();

// 2. 커스텀 훅
export const useLanguageContext = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ko");

  const changeLanguage = () => {
    setLanguage((prev) => {
      return prev === "ko" ? "en" : "ko";
    });
  };

  return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>;
}
