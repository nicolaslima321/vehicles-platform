const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: process.env.NODE_ENV === 'production'
      ? 'https://shippify-nicolas-challenge.herokuapp.com/'
      : 'http://localhost:8080/api',
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./variables.scss";`,
  }
}

module.exports = nextConfig
