export type SafePasteOptions = {
  emails: boolean;
  phones: boolean;
  urls: boolean;
  ips: boolean;
  longNumbers: boolean;
  secrets: boolean;
  customPhrases: string[];
};

export type MaskCategory = 'EMAIL' | 'PHONE' | 'URL' | 'IP' | 'NUMBER' | 'SECRET' | 'CUSTOM';

export type SafePasteResult = {
  output: string;
  summary: Record<MaskCategory, number>;
};

type Detector = {
  category: MaskCategory;
  enabled: boolean;
  pattern: RegExp;
};

export const defaultSafePasteOptions: SafePasteOptions = {
  emails: true,
  phones: true,
  urls: true,
  ips: true,
  longNumbers: true,
  secrets: true,
  customPhrases: [],
};

const initialSummary: Record<MaskCategory, number> = {
  EMAIL: 0,
  PHONE: 0,
  URL: 0,
  IP: 0,
  NUMBER: 0,
  SECRET: 0,
  CUSTOM: 0,
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function maskByPattern(input: string, pattern: RegExp, category: MaskCategory, summary: Record<MaskCategory, number>) {
  const seen = new Map<string, string>();

  return input.replace(pattern, (match: string) => {
    if (!seen.has(match)) {
      summary[category] += 1;
      seen.set(match, `[${category}_${summary[category]}]`);
    }
    return seen.get(match) ?? match;
  });
}

function customPattern(phrases: string[]): RegExp | null {
  const safePhrases = phrases.map((phrase) => phrase.trim()).filter((phrase) => phrase.length >= 3);
  if (safePhrases.length === 0) {
    return null;
  }
  return new RegExp(safePhrases.map(escapeRegExp).join('|'), 'giu');
}

export function maskSensitiveText(input: string, options: SafePasteOptions = defaultSafePasteOptions): SafePasteResult {
  let output = input;
  const summary = { ...initialSummary };

  const detectors: Detector[] = [
    {
      category: 'EMAIL',
      enabled: options.emails,
      pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu,
    },
    {
      category: 'URL',
      enabled: options.urls,
      pattern: /\bhttps?:\/\/[^\s<>"')]+|\bwww\.[^\s<>"')]+/giu,
    },
    {
      category: 'IP',
      enabled: options.ips,
      pattern: /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/gu,
    },
    {
      category: 'SECRET',
      enabled: options.secrets,
      pattern:
        /\b(?:sk-[A-Za-z0-9_-]{16,}|pk_[A-Za-z0-9_-]{16,}|[A-Za-z0-9_-]*api[_-]?key[A-Za-z0-9_-]*[=:]\s*[A-Za-z0-9_-]{12,}|[A-Za-z0-9_-]{24,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,})\b/giu,
    },
    {
      category: 'NUMBER',
      enabled: options.longNumbers,
      pattern: /(?<![+\w])\d(?:[\d -]*\d){11,}\b/gu,
    },
    {
      category: 'PHONE',
      enabled: options.phones,
      pattern: /(?<!\w)(?:\+\d[\d(). -]{7,}\d|\d[\d(). -]*[(). -][\d(). -]{6,}\d)(?!\w)/gu,
    },
  ];

  for (const detector of detectors) {
    if (detector.enabled) {
      output = maskByPattern(output, detector.pattern, detector.category, summary);
    }
  }

  const custom = customPattern(options.customPhrases);
  if (custom) {
    output = maskByPattern(output, custom, 'CUSTOM', summary);
  }

  return { output, summary };
}
