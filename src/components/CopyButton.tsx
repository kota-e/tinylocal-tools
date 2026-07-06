import { useEffect, useState } from 'react';

type CopyButtonProps = {
  text: string;
  label: string;
  copiedLabel: string;
  failedLabel: string;
  resetKey?: string;
};

export function CopyButton({ text, label, copiedLabel, failedLabel, resetKey = text }: CopyButtonProps) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus('');
  }, [resetKey]);

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
