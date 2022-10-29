/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                White: '#DDDDDD',
                Black: '#222831',
                Grey: '#30475E',
                Neon: {
                    100: '#51C4D3',
                    200: '#126E82'
                }
            }
        }
    },
    plugins: []
};
