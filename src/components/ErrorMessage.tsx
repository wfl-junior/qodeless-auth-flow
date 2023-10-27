interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({message}: ErrorMessageProps): JSX.Element | null {
  if (!message) {
    return null
  }

  return (
    <span className="text-sm text-red-500">{message}</span>
  );
}