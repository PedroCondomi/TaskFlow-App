import { create } from "zustand";

type Language = "en" | "es";

type LanguageStore = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const useLanguageStore = create<LanguageStore>(set => ({
  language: (localStorage.getItem("lang") as Language) || "en",

  setLanguage: lang => {
    localStorage.setItem("lang", lang);
    set({ language: lang });
  },
}));
