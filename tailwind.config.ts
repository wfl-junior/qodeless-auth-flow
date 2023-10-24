import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        app: {
          blue: {
            500: "#4461F2",
            900: "#14162E",
          },
          yellow: {
            500: "#DDA82A",
          },
          gray: {
            100: "#EAF0F7",
            200: "#DFDFDF",
            300: "#C7C7C7",
            500: "#4F555A",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
