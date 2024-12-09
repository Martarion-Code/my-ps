/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': false
    })
    )
 
    return config
  },
  // instrumentationHook: true,
  experimental: {
    // instrumentationHook: true,
    // swcMinify: true, // Enables SWC for production builds
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
}


export default nextConfig;
