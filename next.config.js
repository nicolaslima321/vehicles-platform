const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: process.env.NODE_ENV === 'production'
      ? 'https://shippify-nicolas-challenge.herokuapp.com/api'
      : 'http://localhost:8080/api',
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.module.scss";`,
  },
};

module.exports = nextConfig
