const typography = require('@tailwindcss/typography');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          background3: "var(--global-bg-3)",
          background4: "var(--global-bg-4)",
          background5: "var(--global-bg-5)",
          background6: "var(--global-bg-6)",
          background7: "var(--global-bg-7)",
          background8: "var(--global-bg-8)",
          background9: "var(--global-bg-9)",
          background10: "var(--global-bg-10)",
          background11: "var(--global-bg-11)",
          background12: "var(--global-bg-12)",
          background13: "var(--global-bg-13)",
          background14: "var(--global-bg-14)",
          background15: "var(--global-bg-15)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)",
          text4: "var(--global-text-4)",
          text5: "var(--global-text-5)",
          text6: "var(--global-text-6)",
          text7: "var(--global-text-7)",
          text8: "var(--global-text-8)",
          text9: "var(--global-text-9)",
          text10: "var(--global-text-10)",
          text11: "var(--global-text-11)",
          text12: "var(--global-text-12)",
          text13: "var(--global-text-13)"
        },
        button: {
          background1: "var(--button-bg-1)",
          background2: "var(--button-bg-2)",
          text1: "var(--button-text-1)",
          text2: "var(--button-text-2)"
        },
        edittext: {
          background1: "var(--edittext-bg-1)"
        },
        header: {
          background1: "var(--header-bg-1)"
        }
      },
      fontFamily: {
        'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif']
      }
    }
  },
  plugins: [typography]
};