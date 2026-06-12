import { describe, expect, it } from 'vitest';
import { maskSensitiveText } from './safepaste';

describe('maskSensitiveText', () => {
  it('masks common sensitive-looking text in mixed Japanese and English', () => {
    const input =
      '連絡先は tanaka+support@example.co.jp、TEL 03-1234-5678、URL https://example.com/private?ref=1、IP 192.168.0.10、カード 4111 1111 1111 1111、キー pk_test_abcdefghijklmnopqrstuvwxyz123456。';
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

  it('numbers each unique sensitive value once and reuses the same placeholder for repeats', () => {
    const result = maskSensitiveText(
      'a@example.com and b@example.com. Visit https://example.com/a and https://example.com/b. Call +1 415 555 0199 twice: +1 415 555 0199.',
    );

    expect(result.output).toContain('[EMAIL_1]');
    expect(result.output).toContain('[EMAIL_2]');
    expect(result.output).toContain('[URL_1]');
    expect(result.output).toContain('[URL_2]');
    expect(result.output).toContain('[PHONE_1] twice: [PHONE_1]');
    expect(result.summary.EMAIL).toBe(2);
    expect(result.summary.URL).toBe(2);
    expect(result.summary.PHONE).toBe(1);
  });

  it('masks custom phrases, trims them, and ignores very short words', () => {
    const result = maskSensitiveText('Project Sakura is public. ID is ok. C++ is also public.', {
      emails: false,
      phones: false,
      urls: false,
      ips: false,
      longNumbers: false,
      secrets: false,
      customPhrases: ['  Sakura  ', 'ID', 'C++'],
    });

    expect(result.output).toBe('Project [CUSTOM_1] is public. ID is ok. [CUSTOM_2] is also public.');
    expect(result.summary.CUSTOM).toBe(2);
  });

  it('masks www links, long number sequences, and secret-like tokens together', () => {
    const result = maskSensitiveText(
      'Open www.example.com/path?q=1, keep 1234 5678 9012 3456 private, and hide api_key=abc123def456ghi789jkl012.',
    );

    expect(result.output).toContain('[URL_1]');
    expect(result.output).toContain('[NUMBER_1]');
    expect(result.output).toContain('[SECRET_1]');
    expect(result.summary.URL).toBe(1);
    expect(result.summary.NUMBER).toBe(1);
    expect(result.summary.SECRET).toBe(1);
  });
});
