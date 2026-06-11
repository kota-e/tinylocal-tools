import { useMemo, useState } from 'react';
import { CopyButton } from '../../components/CopyButton';
import { InputLimitNotice } from '../../components/InputLimitNotice';
import { TextAreaPanel } from '../../components/TextAreaPanel';
import { ToolCard } from '../../components/ToolCard';
import type { Strings } from '../../i18n/strings';
import { isInputTooLarge } from '../shared';
import { cleanText, defaultPasteFixOptions, type PasteFixMode, type PasteFixOptions } from './pastefix';

type PasteFixProps = {
  t: Strings;
};

const sampleText = `  This is a copied
paragraph from a PDF
with broken lines.


It also has\u3000full-width spaces and repeated       spaces.  `;

export function PasteFix({ t }: PasteFixProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState<PasteFixOptions>(defaultPasteFixOptions);
  const isOverLimit = isInputTooLarge(input);
  const result = useMemo(
    () =>
      isOverLimit
        ? {
            output: '',
            stats: {
              charactersBefore: input.length,
              charactersAfter: 0,
              linesBefore: input.split(/\r\n|\r|\n/).length,
              linesAfter: 0,
            },
          }
        : cleanText(input, options),
    [input, isOverLimit, options],
  );

  function updateOption<K extends keyof PasteFixOptions>(key: K, value: PasteFixOptions[K]) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  return (
    <ToolCard title={t.pastefix} description={t.pastefixDesc} helper={t.localHelper}>
      {isOverLimit ? (
        <InputLimitNotice message={t.tooLarge} note={t.tooLargeNote} />
      ) : null}
      <div className="workspace-grid">
        <TextAreaPanel id="pastefix-input" label={t.input} value={input} onChange={setInput} placeholder={t.empty} />
        <div className="control-panel" aria-label={t.controls}>
          <label>
            <span>{t.mode}</span>
            <select value={options.mode} onChange={(event) => updateOption('mode', event.target.value as PasteFixMode)}>
              <option value="clean-copied-text">{t.cleanCopied}</option>
              <option value="normalize-whitespace">{t.normalizeWhitespace}</option>
              <option value="join-broken-lines">{t.joinBrokenLines}</option>
              <option value="keep-paragraph-breaks">{t.keepParagraphBreaks}</option>
            </select>
          </label>
          <label className="check-row">
            <input type="checkbox" checked={options.trimEdges} onChange={(event) => updateOption('trimEdges', event.target.checked)} />
            {t.trimSpaces}
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={options.collapseBlankLines}
              onChange={(event) => updateOption('collapseBlankLines', event.target.checked)}
            />
            {t.collapseBlankLines}
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={options.replaceFullWidthSpaces}
              onChange={(event) => updateOption('replaceFullWidthSpaces', event.target.checked)}
            />
            {t.replaceFullWidthSpaces}
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={options.normalizeSmartQuotes}
              onChange={(event) => updateOption('normalizeSmartQuotes', event.target.checked)}
            />
            {t.normalizeQuotes}
          </label>
          <div className="button-row">
            <button type="button" className="primary-button" disabled={isOverLimit} onClick={() => setOutput(result.output)}>
              {t.runPastefix}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setInput('');
                setOutput('');
              }}
            >
              {t.clear}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setInput(sampleText);
                setOutput('');
              }}
            >
              {t.sample}
            </button>
          </div>
          <dl className="stats-grid">
            <div>
              <dt>
                {t.chars} {t.before}
              </dt>
              <dd>{result.stats.charactersBefore}</dd>
            </div>
            <div>
              <dt>
                {t.chars} {t.after}
              </dt>
              <dd>{result.stats.charactersAfter}</dd>
            </div>
            <div>
              <dt>
                {t.lines} {t.before}
              </dt>
              <dd>{result.stats.linesBefore}</dd>
            </div>
            <div>
              <dt>
                {t.lines} {t.after}
              </dt>
              <dd>{result.stats.linesAfter}</dd>
            </div>
          </dl>
        </div>
        <div className="output-column">
          <TextAreaPanel id="pastefix-output" label={t.output} value={output} readOnly />
          <CopyButton text={output} label={t.copy} copiedLabel={t.copied} failedLabel={t.copyFailed} />
        </div>
      </div>
    </ToolCard>
  );
}
