import { countLines, normalizeNewlines } from '../shared.ts';

export type PasteFixMode =
  | 'clean-copied-text'
  | 'normalize-whitespace'
  | 'join-broken-lines'
  | 'keep-paragraph-breaks';

export type PasteFixOptions = {
  mode: PasteFixMode;
  trimEdges: boolean;
  collapseBlankLines: boolean;
  replaceFullWidthSpaces: boolean;
  normalizeSmartQuotes: boolean;
};

export type PasteFixStats = {
  charactersBefore: number;
  charactersAfter: number;
  linesBefore: number;
  linesAfter: number;
};

export type PasteFixResult = {
  output: string;
  stats: PasteFixStats;
};

const smartQuoteMap: Record<string, string> = {
  '\u2018': "'",
  '\u2019': "'",
  '\u201C': '"',
  '\u201D': '"',
  '\u2013': '-',
  '\u2014': '-',
};

export const defaultPasteFixOptions: PasteFixOptions = {
  mode: 'clean-copied-text',
  trimEdges: true,
  collapseBlankLines: true,
  replaceFullWidthSpaces: true,
  normalizeSmartQuotes: false,
};

function normalizeQuotes(value: string): string {
  return value.replace(/[\u2018\u2019\u201C\u201D\u2013\u2014]/g, (match) => smartQuoteMap[match] ?? match);
}

function cleanLineSpacing(value: string): string {
  return value
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trimEnd())
    .join('\n');
}

function joinBrokenLines(value: string, keepParagraphBreaks: boolean): string {
  const paragraphs = value.split(/\n{2,}/);

  return paragraphs
    .map((paragraph) => {
      const lines = paragraph
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      return lines.reduce((joined, line, index) => {
        if (index === 0) {
          return line;
        }
        if (/[-\u2010-\u2015]$/.test(joined)) {
          return `${joined.slice(0, -1)}${line}`;
        }
        if (/[\u3002\uff01\uff1f.!?:;]$/.test(joined)) {
          return `${joined}\n${line}`;
        }
        return `${joined} ${line}`;
      }, '');
    })
    .filter((paragraph) => paragraph.length > 0)
    .join(keepParagraphBreaks ? '\n\n' : '\n');
}

export function cleanText(input: string, options: PasteFixOptions = defaultPasteFixOptions): PasteFixResult {
  const normalizedInput = normalizeNewlines(input);
  let output = normalizedInput;

  if (options.replaceFullWidthSpaces) {
    output = output.replace(/\u3000/g, ' ');
  }

  if (options.normalizeSmartQuotes) {
    output = normalizeQuotes(output);
  }

  output = cleanLineSpacing(output);

  if (options.mode === 'normalize-whitespace') {
    output = output.replace(/[ \t]+/g, ' ');
  }

  if (options.mode === 'join-broken-lines' || options.mode === 'clean-copied-text') {
    output = joinBrokenLines(output, true);
  }

  if (options.mode === 'keep-paragraph-breaks') {
    output = output
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .join('\n\n');
  }

  if (options.collapseBlankLines) {
    output = output.replace(/\n{3,}/g, '\n\n');
  }

  if (options.trimEdges) {
    output = output.trim();
  }

  return {
    output,
    stats: {
      charactersBefore: input.length,
      charactersAfter: output.length,
      linesBefore: countLines(normalizedInput),
      linesAfter: countLines(output),
    },
  };
}
