const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const customProdConfigs =
  isProduction
    ? {}
    : {
        sassOptions: {
          includePaths: [path.join(__dirname, 'styles')],
          prependData: `@import "variables.module.scss";`,
        },
      };

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: isProduction
      ? 'https://shippify-nicolas-challenge.herokuapp.com/api'
      : 'http://localhost:8080/api',
  },
  reactStrictMode: true,
  ...customProdConfigs,
};

module.exports = nextConfig
