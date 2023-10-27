import { CircleNotch } from "@phosphor-icons/react/dist/ssr/CircleNotch";
import { classNames } from "~/utils/classNames";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isLoading?: boolean;
}

export function Button({
  className,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps): JSX.Element | null {
  return (
    <button
      type="button"
      {...props}
      disabled={isLoading || disabled}
      className={classNames(
        "flex items-center gap-2 justify-center text-white text-lg font-semibold bg-app-blue-500 rounded-[10px] w-full px-4 py-5 shadow-button hover:enabled:bg-app-blue-400 transition-colors disabled:bg-app-gray-500",
        className,
      )}
    >
      {children}
      {isLoading && <CircleNotch className="animate-spin" size={20} />}
    </button>
  );
}
