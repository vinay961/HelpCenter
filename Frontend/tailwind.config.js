/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '116': '116px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

