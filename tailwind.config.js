/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#0a0a0a',
                    800: '#1a1a1a',
                },
                gold: {
                    500: '#d4af37',
                    600: '#aa8c2c',
                }
            }
        },
    },
    plugins: [],
}
