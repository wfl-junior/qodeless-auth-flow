interface GoogleIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number;
}

export function GoogleIcon({
  size = 28,
  ...props
}: GoogleIconProps): JSX.Element | null {
  return (
    <svg
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.44 14.318c0-.992-.09-1.947-.255-2.863H14v5.415h7.535a6.44 6.44 0 01-2.794 4.226v3.512h4.524c2.648-2.437 4.175-6.026 4.175-10.29z"
        fill="#4285F4"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 28c3.78 0 6.949-1.254 9.265-3.392l-4.524-3.512c-1.254.84-2.857 1.336-4.741 1.336-3.646 0-6.733-2.463-7.834-5.772H1.49v3.627C3.793 24.863 8.527 28 13.999 28z"
        fill="#34A853"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.166 16.66A8.416 8.416 0 015.727 14c0-.923.16-1.82.44-2.66V7.713H1.488A13.994 13.994 0 000 14c0 2.26.54 4.397 1.49 6.287l4.676-3.627z"
        fill="#FBBC05"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 5.568c2.055 0 3.9.707 5.352 2.094l4.015-4.016C20.943 1.387 17.774 0 14 0 8.527 0 3.793 3.137 1.489 7.713l4.677 3.627C7.267 8.03 10.354 5.568 14 5.568z"
        fill="#EA4335"
      />
    </svg>
  );
}
