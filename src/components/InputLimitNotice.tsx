type InputLimitNoticeProps = {
  message: string;
  note: string;
};

export function InputLimitNotice({ message, note }: InputLimitNoticeProps) {
  return (
    <p className="warning" role="alert">
      {message}
      <br />
      {note}
    </p>
  );
}
