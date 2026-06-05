export const MAX_INPUT_LENGTH = 100_000;

export function countLines(value: string): number {
  if (value.length === 0) {
    return 0;
  }
  return value.split(/\r\n|\r|\n/).length;
}

export function normalizeNewlines(value: string): string {
  return value.replace(/\r\n?/g, '\n');
}
