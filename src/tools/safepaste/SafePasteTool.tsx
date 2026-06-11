import { useMemo, useState } from 'react';
import { CopyButton } from '../../components/CopyButton';
import { InputLimitNotice } from '../../components/InputLimitNotice';
import { TextAreaPanel } from '../../components/TextAreaPanel';
import { ToolCard } from '../../components/ToolCard';
import type { Strings } from '../../i18n/strings';
import { isInputTooLarge } from '../shared';
import { defaultSafePasteOptions, maskSensitiveText, type SafePasteOptions } from './safepaste';

type SafePasteProps = {
  t: Strings;
};

const sampleText =
  'Contact jane@example.com or +1 415 555 0199. Visit https://example.com/private. Server: 192.168.0.10. Token: sk-test_abcdefghijklmnopqrstuvwxyz123456.';

export function SafePaste({ t }: SafePasteProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [customText, setCustomText] = useState('');
  const [options, setOptions] = useState<SafePasteOptions>(defaultSafePasteOptions);
  const isOverLimit = isInputTooLarge(input);
  const result = useMemo(
    () =>
      isOverLimit
        ? { output: '', summary: { EMAIL: 0, PHONE: 0, URL: 0, IP: 0, NUMBER: 0, SECRET: 0, CUSTOM: 0 } }
        : maskSensitiveText(input, { ...options, customPhrases: customText.split('\n') }),
    [customText, input, isOverLimit, options],
  );

  function updateOption<K extends keyof Omit<SafePasteOptions, 'customPhrases'>>(key: K, value: SafePasteOptions[K]) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  const checkboxes = [
    ['emails', t.emails],
    ['phones', t.phones],
    ['urls', t.urls],
    ['ips', t.ips],
    ['longNumbers', t.longNumbers],
    ['secrets', t.secrets],
  ] as const;

  return (
    <ToolCard title={t.safepaste} description={t.safepasteDesc} helper={t.localHelper}>
      {isOverLimit ? (
        <InputLimitNotice message={t.tooLarge} note={t.tooLargeNote} />
      ) : null}
      <p className="warning">{t.bestEffort}</p>
      <div className="workspace-grid">
        <TextAreaPanel id="safepaste-input" label={t.input} value={input} onChange={setInput} placeholder={t.empty} />
        <div className="control-panel" aria-label={t.controls}>
          {checkboxes.map(([key, label]) => (
            <label className="check-row" key={key}>
              <input type="checkbox" checked={options[key]} onChange={(event) => updateOption(key, event.target.checked)} />
              {label}
            </label>
          ))}
          <label>
            <span>{t.customWords}</span>
            <textarea
              className="mini-textarea"
              value={customText}
              onChange={(event) => setCustomText(event.target.value)}
              placeholder={t.customPlaceholder}
            />
          </label>
          <div className="button-row">
            <button type="button" className="primary-button" disabled={isOverLimit} onClick={() => setOutput(result.output)}>
              {t.runSafepaste}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setInput('');
                setOutput('');
                setCustomText('');
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
            <h3>{t.summary}</h3>
            <dl className="summary-list">
              {Object.entries(result.summary).map(([category, count]) => (
                <div key={category}>
                  <dt>{category}</dt>
                  <dd>{count}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="output-column">
          <TextAreaPanel id="safepaste-output" label={t.output} value={output} readOnly />
          <CopyButton text={output} label={t.copy} copiedLabel={t.copied} failedLabel={t.copyFailed} />
        </div>
      </div>
    </ToolCard>
  );
}
