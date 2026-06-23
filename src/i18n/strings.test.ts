import { describe, expect, it } from 'vitest';
import { strings } from './strings';

describe('Japanese UI copy', () => {
  it('keeps the main action labels short and easy to read', () => {
    expect(strings.ja.runPastefix).toBe('整える');
    expect(strings.ja.runSafepaste).toBe('かくす');
    expect(strings.ja.runTable).toBe('表を整える');
  });

  it('keeps the best-effort warning simple', () => {
    expect(strings.ja.bestEffort).toContain('完全ではありません');
    expect(strings.ja.bestEffort).toContain('見直してください');
  });

  it('keeps the tool summaries short', () => {
    expect(strings.ja.pastefixSummary).toBe('改行や空白を整えます。');
    expect(strings.ja.safepasteSummary).toBe('メールや電話番号などをかくします。');
    expect(strings.ja.tablefixerSummary).toBe('Markdown、CSV、TSVの表を整えます。');
  });

  it('explains table row warnings in Japanese', () => {
    expect(strings.ja.tableRowCellWarning).toBe('{row}行目の列が{actual}個です。必要な列は{expected}個です。');
    expect(strings.en.tableRowCellWarning).toBe('Row {row} has {actual} cells; expected {expected}.');
  });
});
