import { describe, expect, it } from 'vitest';
import { strings } from '../../i18n/strings';
import { getSafePasteSummaryLabels } from './summaryLabels';

describe('getSafePasteSummaryLabels', () => {
  it('uses Japanese labels for the Japanese UI', () => {
    expect(getSafePasteSummaryLabels(strings.ja)).toEqual({
      EMAIL: 'メール',
      PHONE: '電話番号',
      URL: 'URL',
      IP: 'IPアドレス',
      NUMBER: '長い数字',
      SECRET: '秘密っぽい文字',
      CUSTOM: 'かくしたい言葉',
    });
  });

  it('uses English labels for the English UI', () => {
    expect(getSafePasteSummaryLabels(strings.en)).toEqual({
      EMAIL: 'Email addresses',
      PHONE: 'Phone numbers',
      URL: 'URLs',
      IP: 'IPv4 addresses',
      NUMBER: 'Long number sequences',
      SECRET: 'Secret-looking tokens',
      CUSTOM: 'Custom words or phrases',
    });
  });
});
