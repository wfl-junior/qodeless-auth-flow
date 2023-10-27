import { ErrorMessage } from "./ErrorMessage";

interface FormControlProps {
  children: React.ReactNode;
  errorMessage?: string;
}

export function FormControl({
  children,
  errorMessage,
}: FormControlProps): JSX.Element | null {
  return (
    <div className="flex flex-col gap-1.5">
      {children}
      <ErrorMessage message={errorMessage} />
    </div>
  );
}
