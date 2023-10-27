import { classNames } from "~/utils/classNames";

interface OAuthButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
}

export function OAuthButton({
  className,
  ...props
}: OAuthButtonProps): JSX.Element | null {
  return (
    <a
      {...props}
      className={classNames(
        "flex items-center gap-2 justify-center rounded-[10px] bg-white shadow-oauth-button p-4 text-lg transition-colors dark:text-black hover:bg-app-gray-50 dark:hover:bg-app-gray-100",
        className,
      )}
    />
  );
}
