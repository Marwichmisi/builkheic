/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-dark': '#061E29',
                'brand-secondary': '#1D546D',
                'brand-accent': '#5F9598',
                'brand-light': '#F3F4F4',
            },
        },
    },
    plugins: [],
}
