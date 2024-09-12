module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans these files
  ],
  theme: {
    extend: {
      colors: {
        customGrey: "#7E8185",
        customGreen: "#22C55E",
        customBorder: "#D1D1D1",
        customBackground: "#F6F6F8",
      },
      width: {
        "custom-width": "500px", // Custom width
      },
      height: {
        "custom-height": "600px", // Custom height
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
