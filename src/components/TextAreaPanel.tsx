type TextAreaPanelProps = {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
};

export function TextAreaPanel({ id, label, value, onChange, readOnly, placeholder }: TextAreaPanelProps) {
  return (
    <label className="textarea-panel" htmlFor={id}>
      <span>{label}</span>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck="false"
      />
    </label>
  );
}
