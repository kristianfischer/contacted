// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
            green: colors.green,
            red: colors.red,
            custom: '#008080',
            mygray: "#C7C7CD"
        },
        extend: {},
    },
    plugins: [],
}