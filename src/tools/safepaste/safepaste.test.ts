import { describe, expect, it } from 'vitest';
import { maskSensitiveText } from './safepaste';

describe('maskSensitiveText', () => {
  it('masks email, phone, URL, IP, long number, and secret-like token', () => {
    const input =
      'Email jane@example.com, phone +1 415 555 0199, url https://example.com/a, ip 10.0.0.1, card 4111111111111111, key sk-abcdefghijklmnopqrstuvwxyz123456.';
    const result = maskSensitiveText(input);

    expect(result.output).toContain('[EMAIL_1]');
    expect(result.output).toContain('[PHONE_1]');
    expect(result.output).toContain('[URL_1]');
    expect(result.output).toContain('[IP_1]');
    expect(result.output).toContain('[NUMBER_1]');
    expect(result.output).toContain('[SECRET_1]');
    expect(result.summary.EMAIL).toBe(1);
    expect(result.summary.PHONE).toBe(1);
    expect(result.summary.URL).toBe(1);
    expect(result.summary.IP).toBe(1);
    expect(result.summary.NUMBER).toBe(1);
    expect(result.summary.SECRET).toBe(1);
  });

  it('reuses the same placeholder for repeated values', () => {
    const result = maskSensitiveText('a@example.com and a@example.com');

    expect(result.output).toBe('[EMAIL_1] and [EMAIL_1]');
    expect(result.summary.EMAIL).toBe(1);
  });

  it('masks custom phrases but ignores very short words', () => {
    const result = maskSensitiveText('Project Sakura is public. ID is ok.', {
      emails: false,
      phones: false,
      urls: false,
      ips: false,
      longNumbers: false,
      secrets: false,
      customPhrases: ['Sakura', 'ID'],
    });

    expect(result.output).toBe('Project [CUSTOM_1] is public. ID is ok.');
    expect(result.summary.CUSTOM).toBe(1);
  });
});
