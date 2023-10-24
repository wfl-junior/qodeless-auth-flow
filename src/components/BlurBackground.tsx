interface BlurBackgroundProps {}

export function BlurBackground({}: BlurBackgroundProps): JSX.Element | null {
  return (
    <div aria-hidden className="absolute -z-10 inset-0">
      <div className="aspect-square w-[226px] rounded-full bg-app-yellow-500 absolute -top-[113px] -left-[67px] blur-[158px]" />

      <div className="aspect-square w-[226px] rounded-full bg-app-blue-500 absolute -bottom-[113px] -right-[67px] blur-[158px]" />
    </div>
  );
}
