import { useState } from 'react';

type CopyButtonProps = {
  text: string;
  label: string;
  copiedLabel: string;
  failedLabel: string;
};

export function CopyButton({ text, label, copiedLabel, failedLabel }: CopyButtonProps) {
  const [status, setStatus] = useState('');

  async function handleCopy() {
    if (!text) {
      setStatus('');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setStatus(copiedLabel);
    } catch {
      setStatus(failedLabel);
    }
  }

  return (
    <span className="copy-group">
      <button type="button" className="secondary-button" onClick={handleCopy}>
        {label}
      </button>
      <span className="status" aria-live="polite">
        {status}
      </span>
    </span>
  );
}
