import { describe, expect, it } from 'vitest';
import { formatMarkdownTable } from './markdownTable';

describe('formatMarkdownTable', () => {
  it('formats Markdown input', () => {
    const result = formatMarkdownTable('| Name | Role |\n| --- | --- |\n| Mina | Maintainer |', {
      inputType: 'markdown',
      alignment: 'default',
      trimCells: true,
      normalizeEmptyCells: true,
    });

    expect(result.markdown).toBe('| Name | Role       |\n| ---- | ---------- |\n| Mina | Maintainer |');
  });

  it('formats CSV input', () => {
    const result = formatMarkdownTable('Name,Role\nMina,Maintainer', {
      inputType: 'csv',
      alignment: 'left',
      trimCells: true,
      normalizeEmptyCells: true,
    });

    expect(result.markdown).toBe('| Name | Role       |\n| :--- | :--------- |\n| Mina | Maintainer |');
  });

  it('formats TSV input', () => {
    const result = formatMarkdownTable('Name\tRole\nMina\tMaintainer', {
      inputType: 'tsv',
      alignment: 'center',
      trimCells: true,
      normalizeEmptyCells: true,
    });

    expect(result.markdown).toBe('| Name | Role       |\n| :---: | :--------: |\n| Mina | Maintainer |');
  });

  it('warns about inconsistent rows and pads missing cells', () => {
    const result = formatMarkdownTable('Name,Role,City\nMina,Maintainer', {
      inputType: 'csv',
      alignment: 'default',
      trimCells: true,
      normalizeEmptyCells: true,
    });

    expect(result.warnings).toEqual([{ rowNumber: 2, message: 'Row 2 has 2 cells; expected 3.' }]);
    expect(result.markdown).toContain('| Mina | Maintainer |      |');
  });

  it('handles empty input gracefully', () => {
    const result = formatMarkdownTable('');

    expect(result.markdown).toBe('');
    expect(result.rows).toEqual([]);
    expect(result.warnings).toEqual([]);
  });
});
