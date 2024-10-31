// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // adjust path based on your project structure
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#4CAF50", // lighter green for buttons or links
                    DEFAULT: "#388E3C", // main brand color, a strong green
                    dark: "#2E7D32", // darker shade for hover effects
                },
                secondary: {
                    light: "#FFD54F", // bright yellow for highlights
                    DEFAULT: "#FFC107", // main accent yellow
                    dark: "#FFA000", // darker shade for hover
                },
                background: {
                    DEFAULT: "#F4F4F9", // soft neutral background
                    dark: "#E0E0E0", // darker background for headers or footers
                },
                accent: {
                    blue: "#1E88E5", // blue for links or interactive elements
                    red: "#E53935", // red for alerts or errors
                },
                neutral: {
                    light: "#F1F1F1",
                    DEFAULT: "#BDBDBD",
                    dark: "#757575",
                },
            },
        },
    },
    plugins: [],
};
