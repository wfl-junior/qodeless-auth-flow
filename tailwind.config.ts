import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        app: {
          blue: {
            100: "#E0F6FF",
            400: "#4285F4",
            500: "#4461F2",
            800: "#002738",
            900: "#14162E",
          },
          yellow: {
            400: "#FFE146",
            500: "#DDA82A",
          },
          gray: {
            50: "#F6F6F6",
            100: "#EAF0F7",
            200: "#DFDFDF",
            300: "#C7C7C7",
            400: "#677185",
            500: "#4F555A",
          },
        },
      },
      boxShadow: {
        "header-button": "0 4px 4px 0 rgba(0, 0, 0, 0.05)",
        button: "0 12px 21px 4px rgba(68, 97, 242, 0.15)",
        "oauth-button": "0 10px 13px 0 rgba(0, 0, 0, 0.13)",
      },
      spacing: {
        4.5: "1.125rem",
      },
    },
  },
  plugins: [],
};

export default config;
