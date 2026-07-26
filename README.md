# Gmail Multi-Launcher

A Chrome extension (Manifest V3 + React + TypeScript + Vite) that automatically opens Gmail in separate tabs for your chosen Google accounts whenever you visit `gmail.com` or `mail.google.com`.

> **Browser support:** Built for Chrome and other Chromium-based browsers (Edge, Brave, Opera, Vivaldi). **Not tested on Firefox or other non-Chromium browsers**, which use a different extension API (`browser.*`) and may need code changes to work correctly.

## Features

- Popup UI to manage account slots (name, email, Google account index, enabled checkbox)
- Auto-launch on Gmail navigation — no manual clicking needed
- Duplicate-tab prevention (focuses existing tabs instead of reopening)
- "Open Selected Accounts Now" for on-demand launching
- Select All / Clear All / Enable Auto Launch toggle
- Settings synced via `chrome.storage.sync`
- 100% local — no backend, no OAuth, no external APIs

## Why manual account setup?

Chrome has no API to list which Google accounts are signed in. So instead, you map each account to its Google account index once (the `N` in `mail.google.com/mail/u/N/`), and the extension remembers it.

## Install (from source)

```bash
git clone https://github.com/<your-username>/gmail-multi-launcher.git
cd gmail-multi-launcher
npm install
npm run build
```

Then in (your browser of your choice):
1. Go to `(browsername)://extensions` or however your browser does that
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `dist/` folder

## Develop with hot reload

```bash
npm run dev
go to http://localhost:42069/
```
Once you finish:
```
npm run build
```

Load the generated `dist/` folder as unpacked (see above). Popup changes hot-reload; background/manifest changes auto-reload the extension.

## Usage

1. Open the popup and add an account slot for each Google account you use
2. Set its `u/N` index — find yours by switching accounts in Gmail and checking the URL
3. Check the accounts you want auto-opened
4. Visit `gmail.com` — selected accounts open automatically in new tabs

## Tech stack

- Manifest V3
- TypeScript
- React
- Vite + [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin)

## License

MIT
