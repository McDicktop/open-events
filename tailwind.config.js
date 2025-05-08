export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,svelte,vue}"
  ],
  darkMode: ['class'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-gray-400",
    "bg-red-600",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
  ]
};
