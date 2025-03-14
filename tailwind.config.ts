import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      cursor: {
        fancy: "url(hand.cur), pointer"
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true // 모바일에서 호버 끄기
  },
  plugins: []
};
export default config;
