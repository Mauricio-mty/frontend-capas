module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                poppins : ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
            colors: {
                navbg: rgba(14, 27, 36, 1),
                navtext: rgba(242, 244, 243, 1),
                navtexthover: rgba(162, 116, 58, 1),
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: ["@tailwindcss/postcss"],
}