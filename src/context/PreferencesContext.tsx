import React from 'react';
import { Lang, Theme } from '@/types';
import i18n from '@/i18n';

interface PreferencesContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const PreferencesContext = React.createContext<PreferencesContextProps>({
  lang: 'en',
  setLang: () => {},
});

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = React.useState<Lang>(
    () => (localStorage.getItem('lang') as Lang) || 'en',
  );

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    i18n.changeLanguage(newLang);
  };

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <PreferencesContext.Provider value={{ lang, setLang }}>{children}</PreferencesContext.Provider>
  );
};
