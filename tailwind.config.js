module.exports = {
    content: [
        "./*.html",
        "./js/**/*.js"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#0f172a",
                accent: "#0ea5e9",
                success: "#10b981",
                "surface-light": "#ffffff",
                "surface-dark": "#0f172a",
                "border-light": "#e2e8f0",
                "border-dark": "#334155",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            boxShadow: {
                'depth': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                'depth-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
                'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                'toggle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
            },
            transitionDuration: {
                '250': '250ms',
            }
        },
    },
    plugins: [],
}
