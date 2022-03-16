module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "firebasestorage.googleapis.com"
    ],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'en-GB'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
}
