module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      inset: ["group-hover"],
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}