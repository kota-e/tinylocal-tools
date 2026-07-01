import { useEffect, useMemo, useState } from 'react';
import { Language, strings } from './strings';

function detectLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return 'en';
  }
  return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

function getDocumentElement() {
  return typeof document === 'undefined' ? undefined : document.documentElement;
}

export function syncDocumentLanguage(language: Language, documentElement: Pick<HTMLElement, 'lang'> | undefined = getDocumentElement()) {
  if (!documentElement) {
    return;
  }

  documentElement.lang = language;
}

export function useI18n() {
  const [language, setLanguage] = useState<Language>(detectLanguage);
  const t = useMemo(() => strings[language], [language]);

  useEffect(() => {
    syncDocumentLanguage(language);
  }, [language]);

  return { language, setLanguage, t };
}
