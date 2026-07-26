import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: 'Gmail Multi-Launcher',
  version: pkg.version,
  description:
    'Automatically opens Gmail in separate tabs for your saved Google account indices whenever you visit Gmail.',
  icons: {
    16: 'public/icons/icon16.png',
    128: 'public/icons/icon128.png',
  },
  action: {
    default_popup: 'index.html',
    default_title: 'Gmail Multi-Launcher',
    default_icon: {
      16: 'public/icons/icon16.png',
      128: 'public/icons/icon128.png',
    },
  },
  background: {
    service_worker: 'src/background/background.ts',
    type: 'module',
  },
  permissions: ['storage', 'tabs', 'webNavigation'],
  host_permissions: [
    'https://mail.google.com/*',
    'https://gmail.com/*',
    'https://www.gmail.com/*',
  ],
})
