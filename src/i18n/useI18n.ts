import { useMemo, useState } from 'react';
import { Language, strings } from './strings';

function detectLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return 'en';
  }
  return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

export function useI18n() {
  const [language, setLanguage] = useState<Language>(detectLanguage);
  const t = useMemo(() => strings[language], [language]);

  return { language, setLanguage, t };
}
