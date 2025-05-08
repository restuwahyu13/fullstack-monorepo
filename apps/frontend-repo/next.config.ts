import type { NextConfig } from 'next'
import os from 'node:os'

let logger: Record<string, any> = {}
if (process.env.NODE_ENV === 'development') {
	logger = Object.assign(
		{
			logging: {
				fetches: {
					fullUrl: true,
					hmrRefreshes: true
				},
				incomingRequests: true
			}
		},
		logger
	)
}

const nextConfig: NextConfig = {
	compress: process.env.NODE_ENV === 'development' ? true : false,
	reactStrictMode: process.env.NODE_ENV === 'development' ? true : false,
	productionBrowserSourceMaps: process.env.NODE_ENV === 'development' ? true : false,
	experimental: {
		caseSensitiveRoutes: true,
		optimizeCss: true,
		cpus: os.cpus().length / 2
	},
	...logger
}

export default nextConfig
