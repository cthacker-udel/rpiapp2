const join = require("node:path");

module.exports = {
    plugins: {
        "@tailwindcss/postcss": {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
};
