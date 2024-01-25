const path = require('path')

/** @type {import('@craco/craco').Config} */
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  typescript: {
    enableTypeChecking: true,
  },
  webpack: {
    configure: (config: any, { env, paths }: { env: any, paths: any }) => {
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
