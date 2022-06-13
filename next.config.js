/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: 'http://localhost:8080/api',
  },
  reactStrictMode: true,
  sassOptions: {
    prependData: `@import "styles/variables.scss";`,
  }
}

module.exports = nextConfig
