import plugin from 'tailwindcss/plugin';

const myCustomUtilitiesPlugin = plugin(function ({ addUtilities }) {
    addUtilities({
        '.text-nav-text-hover': {
            color: '#A2743A',
        },
    });
});

export default [
    myCustomUtilitiesPlugin,
];