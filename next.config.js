const runtimeCaching = require("next-pwa/cache")

const withPWA = require("next-pwa")({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	runtimeCaching,
	skipWaiting: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async redirects() {
		return [
			{
				source: '/calculator/twos-complement',
				destination: '/calculator/twos-complement/dec/bin',
				permanent: false
			},
			{
				source: '/twos-complement',
				destination: '/calculator/twos-complement/dec/bin',
				permanent: false
			}
		]
	}
}

module.exports = withPWA(nextConfig)
