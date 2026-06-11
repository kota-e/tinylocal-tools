import { useMemo, useState } from 'react';
import { CopyButton } from '../../components/CopyButton';
import { TextAreaPanel } from '../../components/TextAreaPanel';
import { ToolCard } from '../../components/ToolCard';
import type { Strings } from '../../i18n/strings';
import { MAX_INPUT_LENGTH } from '../shared';
import {
  defaultMarkdownTableOptions,
  formatMarkdownTable,
  type MarkdownTableOptions,
  type TableAlignment,
  type TableInputType,
} from './markdownTable';

type MarkdownTableFixerProps = {
  t: Strings;
};

const sampleText = `Name,Role,City
Mina,Maintainer,Tokyo
Alex,Contributor,Seattle
Sam,Reviewer`;

export function MarkdownTableFixer({ t }: MarkdownTableFixerProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [options, setOptions] = useState<MarkdownTableOptions>(defaultMarkdownTableOptions);
  const isOverLimit = input.length > MAX_INPUT_LENGTH;
  const result = useMemo(
    () => (isOverLimit ? { markdown: '', rows: [], warnings: [] } : formatMarkdownTable(input, options)),
    [input, isOverLimit, options],
  );

  function updateOption<K extends keyof MarkdownTableOptions>(key: K, value: MarkdownTableOptions[K]) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  return (
    <ToolCard title={t.tablefixer} description={t.tableDesc} helper={t.localHelper}>
      {isOverLimit ? (
        <p className="warning" role="alert">
          {t.tooLarge}
        </p>
      ) : null}
      <div className="workspace-grid">
        <TextAreaPanel id="table-input" label={t.input} value={input} onChange={setInput} placeholder={t.empty} />
        <div className="control-panel" aria-label={t.controls}>
          <label>
            <span>{t.inputType}</span>
            <select value={options.inputType} onChange={(event) => updateOption('inputType', event.target.value as TableInputType)}>
              <option value="auto">{t.auto}</option>
              <option value="markdown">{t.markdown}</option>
              <option value="csv">{t.csv}</option>
              <option value="tsv">{t.tsv}</option>
            </select>
          </label>
          <label>
            <span>{t.alignment}</span>
            <select value={options.alignment} onChange={(event) => updateOption('alignment', event.target.value as TableAlignment)}>
              <option value="default">{t.defaultAlign}</option>
              <option value="left">{t.left}</option>
              <option value="center">{t.center}</option>
              <option value="right">{t.right}</option>
            </select>
          </label>
          <label className="check-row">
            <input type="checkbox" checked={options.trimCells} onChange={(event) => updateOption('trimCells', event.target.checked)} />
            {t.trimCells}
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={options.normalizeEmptyCells}
              onChange={(event) => updateOption('normalizeEmptyCells', event.target.checked)}
            />
            {t.normalizeEmpty}
          </label>
          <label className="check-row">
            <input type="checkbox" checked={showPreview} onChange={(event) => setShowPreview(event.target.checked)} />
            {t.showPreview}
          </label>
          <div className="button-row">
            <button type="button" className="primary-button" disabled={isOverLimit} onClick={() => setOutput(result.markdown)}>
              {t.runTable}
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
          <div className="summary-box">
            <h3>{t.warnings}</h3>
            {result.warnings.length === 0 ? (
              <p>{t.noWarnings}</p>
            ) : (
              <ul>
                {result.warnings.map((warning) => (
                  <li key={`${warning.rowNumber}-${warning.message}`}>{warning.message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="output-column">
          <TextAreaPanel id="table-output" label={t.output} value={output} readOnly />
          <CopyButton text={output} label={t.copy} copiedLabel={t.copied} failedLabel={t.copyFailed} />
        </div>
      </div>
      {showPreview && result.rows.length > 0 ? (
        <div className="preview-panel">
          <h3>{t.preview}</h3>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {result.rows[0]?.map((cell, index) => (
                    <th key={`${cell}-${index}`}>{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </ToolCard>
  );
}
