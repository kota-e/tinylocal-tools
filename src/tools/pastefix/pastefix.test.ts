import { describe, expect, it } from 'vitest';
import { cleanText, defaultPasteFixOptions } from './pastefix';

describe('cleanText', () => {
  it('joins common broken copied lines and collapses blank lines', () => {
    const input = '  This is a copied\nparagraph from a PDF\n\n\nNext paragraph.  ';
    const result = cleanText(input, defaultPasteFixOptions);

    expect(result.output).toBe('This is a copied paragraph from a PDF\n\nNext paragraph.');
    expect(result.stats.linesBefore).toBe(5);
    expect(result.stats.linesAfter).toBe(3);
  });

  it('replaces full-width spaces', () => {
    const result = cleanText('Hello\u3000world', defaultPasteFixOptions);

    expect(result.output).toBe('Hello world');
  });

  it('normalizes smart quotes only when enabled', () => {
    const result = cleanText('“Hello” — world', { ...defaultPasteFixOptions, normalizeSmartQuotes: true });

    expect(result.output).toBe('"Hello" - world');
  });

  it('keeps paragraph breaks when requested', () => {
    const result = cleanText(' A line \n\n Another line ', {
      ...defaultPasteFixOptions,
      mode: 'keep-paragraph-breaks',
    });

    expect(result.output).toBe('A line\n\nAnother line');
  });
});
