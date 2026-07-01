import { describe, expect, it } from 'vitest';
import { syncDocumentLanguage } from './useI18n';

describe('syncDocumentLanguage', () => {
  it('sets the html language to Japanese', () => {
    const documentElement = { lang: 'en' };

    syncDocumentLanguage('ja', documentElement);

    expect(documentElement.lang).toBe('ja');
  });

  it('sets the html language to English', () => {
    const documentElement = { lang: 'ja' };

    syncDocumentLanguage('en', documentElement);

    expect(documentElement.lang).toBe('en');
  });
});
