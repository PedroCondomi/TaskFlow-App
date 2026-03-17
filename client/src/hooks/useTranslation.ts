import { useLanguageStore } from "../store/languageStore";
import { translations } from "../i18n/translations";

export function useTranslation() {
  const language = useLanguageStore(s => s.language);

  const t = (path: string) => {
    const keys = path.split(".");
    let value: any = translations[language];

    for (const key of keys) {
      value = value?.[key];
    }

    return value || path;
  };

  return { t, language };
}
