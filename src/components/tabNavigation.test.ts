import { describe, expect, it } from 'vitest';
import { getTabTargetIndex } from './tabNavigation';

describe('getTabTargetIndex', () => {
  it('moves right and wraps from the last tab to the first', () => {
    expect(getTabTargetIndex('ArrowRight', 0, 3)).toBe(1);
    expect(getTabTargetIndex('ArrowRight', 2, 3)).toBe(0);
  });

  it('moves left and wraps from the first tab to the last', () => {
    expect(getTabTargetIndex('ArrowLeft', 2, 3)).toBe(1);
    expect(getTabTargetIndex('ArrowLeft', 0, 3)).toBe(2);
  });

  it('moves to the first or last tab with Home and End', () => {
    expect(getTabTargetIndex('Home', 1, 3)).toBe(0);
    expect(getTabTargetIndex('End', 1, 3)).toBe(2);
  });

  it('ignores unrelated keys and invalid tab positions', () => {
    expect(getTabTargetIndex('Enter', 1, 3)).toBeNull();
    expect(getTabTargetIndex('ArrowRight', -1, 3)).toBeNull();
    expect(getTabTargetIndex('ArrowRight', 0, 0)).toBeNull();
  });
});
