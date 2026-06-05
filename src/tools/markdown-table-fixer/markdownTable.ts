export type TableInputType = 'auto' | 'markdown' | 'csv' | 'tsv';
export type TableAlignment = 'default' | 'left' | 'center' | 'right';

export type MarkdownTableOptions = {
  inputType: TableInputType;
  alignment: TableAlignment;
  trimCells: boolean;
  normalizeEmptyCells: boolean;
};

export type TableWarning = {
  rowNumber: number;
  message: string;
};

export type MarkdownTableResult = {
  markdown: string;
  rows: string[][];
  warnings: TableWarning[];
};

export const defaultMarkdownTableOptions: MarkdownTableOptions = {
  inputType: 'auto',
  alignment: 'default',
  trimCells: true,
  normalizeEmptyCells: true,
};

function splitCsvLine(line: string, delimiter: ',' | '\t'): string[] {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      cells.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  cells.push(current);
  return cells;
}

function parseMarkdownLine(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|');
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function detectInputType(input: string): Exclude<TableInputType, 'auto'> {
  const firstUsefulLine = input
    .split(/\r\n|\r|\n/)
    .map((line) => line.trim())
    .find(Boolean);

  if (!firstUsefulLine) {
    return 'markdown';
  }
  if (firstUsefulLine.includes('|')) {
    return 'markdown';
  }
  if (firstUsefulLine.includes('\t')) {
    return 'tsv';
  }
  return 'csv';
}

function normalizeRows(rows: string[][], options: MarkdownTableOptions): { rows: string[][]; warnings: TableWarning[] } {
  const warnings: TableWarning[] = [];
  const width = Math.max(0, ...rows.map((row) => row.length));

  const normalizedRows = rows.map((row, index) => {
    if (row.length !== width) {
      warnings.push({
        rowNumber: index + 1,
        message: `Row ${index + 1} has ${row.length} cells; expected ${width}.`,
      });
    }

    const nextRow = [...row];
    while (nextRow.length < width) {
      nextRow.push('');
    }

    return nextRow.slice(0, width).map((cell) => {
      const nextCell = options.trimCells ? cell.trim() : cell;
      return options.normalizeEmptyCells && nextCell.length === 0 ? '' : nextCell;
    });
  });

  return { rows: normalizedRows, warnings };
}

function escapeMarkdownCell(cell: string): string {
  return cell.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function alignmentMarker(alignment: TableAlignment, width: number): string {
  if (alignment === 'left') return `:${'-'.repeat(Math.max(3, width - 1))}`;
  if (alignment === 'center') return `:${'-'.repeat(Math.max(3, width - 2))}:`;
  if (alignment === 'right') return `${'-'.repeat(Math.max(3, width - 1))}:`;
  return '-'.repeat(Math.max(3, width));
}

export function formatMarkdownTable(
  input: string,
  options: MarkdownTableOptions = defaultMarkdownTableOptions,
): MarkdownTableResult {
  const cleanInput = input.replace(/\r\n?/g, '\n').trim();
  if (!cleanInput) {
    return { markdown: '', rows: [], warnings: [] };
  }

  const inputType = options.inputType === 'auto' ? detectInputType(cleanInput) : options.inputType;
  const rawLines = cleanInput.split('\n').filter((line) => line.trim().length > 0);
  const parsedRows = rawLines
    .map((line) => {
      if (inputType === 'markdown') {
        return parseMarkdownLine(line);
      }
      return splitCsvLine(line, inputType === 'tsv' ? '\t' : ',');
    })
    .filter((row) => !isSeparatorRow(row));

  const { rows, warnings } = normalizeRows(parsedRows, options);
  if (rows.length === 0) {
    return { markdown: '', rows: [], warnings };
  }

  const columnCount = rows[0]?.length ?? 0;
  const widths = Array.from({ length: columnCount }, (_, columnIndex) =>
    Math.max(3, ...rows.map((row) => escapeMarkdownCell(row[columnIndex] ?? '').length)),
  );

  const formatRow = (row: string[]) =>
    `| ${row
      .map((cell, columnIndex) => escapeMarkdownCell(cell).padEnd(widths[columnIndex] ?? 3, ' '))
      .join(' | ')} |`;

  const separator = `| ${widths.map((width) => alignmentMarker(options.alignment, width)).join(' | ')} |`;
  const [header, ...body] = rows;
  const markdown = [formatRow(header ?? []), separator, ...body.map(formatRow)].join('\n');

  return { markdown, rows, warnings };
}
