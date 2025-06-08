require('dotenv').config()
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_ENDPOINT: process.env.API_ENDPOINT,
    },
    // 本番環境でのみ standalone を有効化
    ...(process.env.NODE_ENV === 'production' && {
        output: 'standalone'
    }),
}

module.exports = nextConfig
