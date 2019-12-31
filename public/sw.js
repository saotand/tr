/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "turepuesto_v1"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "babel.config.js",
    "revision": "3ab3d9316a1f8e6fdd3b04bdc0c5294e"
  },
  {
    "url": "public/style.css",
    "revision": "a298bc239e267a148f3248e692b19155"
  },
  {
    "url": "src/imports/ask.js",
    "revision": "b5dbe2a4a418fc0c27852b0d7009116e"
  },
  {
    "url": "src/imports/brands.js",
    "revision": "cab3ac0ac79626af6f754e899f1ad069"
  },
  {
    "url": "src/imports/dashboard.js",
    "revision": "93bcb137b2ccc64dce8ac0256fcce42b"
  },
  {
    "url": "src/imports/index.js",
    "revision": "41103035c5ebc0b78a34bf28e3aed306"
  },
  {
    "url": "src/imports/models.js",
    "revision": "231a75be954e2766da54ce15a68f18b8"
  },
  {
    "url": "src/imports/other.js",
    "revision": "1f3e599d5dc0b74cc841b7ff296d8183"
  },
  {
    "url": "src/imports/parts.js",
    "revision": "075c7dd2fdc585863380072fae5c5218"
  },
  {
    "url": "src/imports/publicity.js",
    "revision": "b6f5f8865ea45e98c90f21af39d29545"
  },
  {
    "url": "src/imports/subparts.js",
    "revision": "7a0af09aa8c80f54fb62d0a0be061019"
  },
  {
    "url": "src/imports/tutorial.js",
    "revision": "bd2a71bc7c5aa036f28139fc0cae02fa"
  },
  {
    "url": "src/imports/ui.js",
    "revision": "e0008b2887d1d3094c8410e1975da135"
  },
  {
    "url": "src/imports/users.js",
    "revision": "4244a5f9615e2f6982cce469f7dadc0d"
  },
  {
    "url": "src/main.js",
    "revision": "5846c824f6ce743b5d159bab2fb02aa5"
  },
  {
    "url": "src/plugins/axios.js",
    "revision": "ba8bcda78925eb192e55eb9b12138d40"
  },
  {
    "url": "src/plugins/registerServiceWorker.js",
    "revision": "085a411e6268cd0a437def430df22f15"
  },
  {
    "url": "src/plugins/router/authGuard.js",
    "revision": "aa68b22dd4fd52026dd8f119a7887800"
  },
  {
    "url": "src/plugins/router/imports.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "src/plugins/router/router.js",
    "revision": "71a95ba4bb849afa4b617f65a651f71b"
  },
  {
    "url": "src/plugins/store/admin/actions.js",
    "revision": "0fd90ea5a79cb9468980ed9b36279ea7"
  },
  {
    "url": "src/plugins/store/admin/getters.js",
    "revision": "420efef0752f7e2062a45ff2e5137077"
  },
  {
    "url": "src/plugins/store/admin/mutations.js",
    "revision": "f72fcbdd82b017f2fa0aa2bdf7140a7b"
  },
  {
    "url": "src/plugins/store/admin/state.js",
    "revision": "b7ba20b2dac0c709d60f865283106985"
  },
  {
    "url": "src/plugins/store/ask/actions.js",
    "revision": "471bf771a1fe4c1305b4b70fa9e48d45"
  },
  {
    "url": "src/plugins/store/ask/getters.js",
    "revision": "1714979ee6bdf0b0c336d117a21e20a0"
  },
  {
    "url": "src/plugins/store/ask/mutations.js",
    "revision": "f898552464647637cc3eeb4264851cf7"
  },
  {
    "url": "src/plugins/store/ask/state.js",
    "revision": "8f71d7208c8e38c4634e0764ccb51c87"
  },
  {
    "url": "src/plugins/store/index.js",
    "revision": "7c940f8b7778fbe410b903e56929a475"
  },
  {
    "url": "src/plugins/store/ui/actions.js",
    "revision": "13853ed7a2ad04e0a4c38c63b2e5cabe"
  },
  {
    "url": "src/plugins/store/ui/getters.js",
    "revision": "90691eec052c34fd609ecd521dd2d802"
  },
  {
    "url": "src/plugins/store/ui/mutations.js",
    "revision": "5c2606189d06db8942873d3cbd856749"
  },
  {
    "url": "src/plugins/store/ui/state.js",
    "revision": "bab391a8d9d65f43d155614bbdcc68ec"
  },
  {
    "url": "src/plugins/store/user/actions.js",
    "revision": "ab62dd517414d6c58aa9eacf42b4112f"
  },
  {
    "url": "src/plugins/store/user/getters.js",
    "revision": "6ec11e43f83299168ab1fdb7d7d8d2eb"
  },
  {
    "url": "src/plugins/store/user/mutations.js",
    "revision": "efbab910afcd567da08182d3f1cee6a6"
  },
  {
    "url": "src/plugins/store/user/state.js",
    "revision": "497e6afbbf0f395fbc2858904732a270"
  },
  {
    "url": "src/plugins/vuetify.js",
    "revision": "4cd7a5cf1f987a53e96a027961bbe2b0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:html|htm|xml)$/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"markup", plugins: [new workbox.expiration.Plugin({ maxAgeSeconds: 1800, purgeOnQuotaError: false })] }), 'GET');
