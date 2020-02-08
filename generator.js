const workbox = require('workbox-build');

workbox.generateSW(
    {
        cacheId: 'turepuesto_v1',
        globDirectory: './',
        globPatterns: [
            '**/*.{css,js}'
        ],
        globIgnores: [
            '**/generator.js',
            '**/sw.js',
            'node_modules/**/*'
        ],
        swDest: './dist/sw.js',
        runtimeCaching: [
            {
                urlPattern: /\.(?:html|htm|xml)$/,
                handler: 'staleWhileRevalidate',
                options: {
                    cacheName: 'markup',
                    expiration: {
                        maxAgeSeconds: 1800
                    }
                }
            }
        ]
    });
