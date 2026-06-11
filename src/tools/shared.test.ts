import { describe, expect, it } from 'vitest';
import { MAX_INPUT_LENGTH, isInputTooLarge } from './shared';

describe('isInputTooLarge', () => {
  it('treats input at the limit as safe', () => {
    expect(isInputTooLarge('x'.repeat(MAX_INPUT_LENGTH))).toBe(false);
  });

  it('treats input over the limit as too large', () => {
    expect(isInputTooLarge('x'.repeat(MAX_INPUT_LENGTH + 1))).toBe(true);
  });

  it('can use a custom limit', () => {
    expect(isInputTooLarge('abcd', 3)).toBe(true);
  });
});
