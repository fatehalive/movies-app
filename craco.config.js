const path = require('path')
const postcss = require('./postcss.config')

/** @type {import('@craco/craco').Config} */
module.exports = {
  style: {
    postcss,
  },
  typescript: {
    enableTypeChecking: true,
  },
  devServer: (config) => {
    console.log('> load_devServer_config')
    return config
  },
  webpack: {
    configure: (config) => {
        console.log(`> load_webpack_config`)
        // overrides konfigurasi webpack bawaan cra disini

        // add alias
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src')
        }
        
        return config
    },
    
  },
};
