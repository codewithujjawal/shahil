module.exports = {
  content: [
    "./templates/**/*.html", // ✅ Scans all HTML files inside templates
    "./static/**/*.css", // ✅ Scans global CSS files (optional)
    "./**/*.js", // ✅ Scans all JavaScript files in project
    "./**/*.py" // ✅ If using Python (Jinja templates in Flask/Django)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
