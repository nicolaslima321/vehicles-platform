const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: process.env.NODE_ENV === 'production'
      ? 'https://shippify-nicolas-challenge.herokuapp.com/api'
      : 'http://localhost:8080/api',
  },
  reactStrictMode: true,
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/styles/*": ["styles/*"],
    },
  },
  sassOptions: {
    prependData: `@import "@/styles/variables.scss";`,
  }
}

module.exports = nextConfig
