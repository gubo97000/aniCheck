module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{png,css,js,svg,html,webmanifest}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'dist/sw.js',
};
