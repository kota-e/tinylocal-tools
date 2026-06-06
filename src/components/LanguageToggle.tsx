import type { Language } from '../i18n/strings';

type LanguageToggleProps = {
  language: Language;
  onChange: (language: Language) => void;
};

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="language-toggle" aria-label="Language">
      <button
        type="button"
        className={language === 'en' ? 'active' : ''}
        aria-pressed={language === 'en'}
        onClick={() => onChange('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={language === 'ja' ? 'active' : ''}
        aria-pressed={language === 'ja'}
        onClick={() => onChange('ja')}
      >
        JA
      </button>
    </div>
  );
}
