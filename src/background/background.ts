import { getSettings } from '../shared/storage'
import { launchAccounts } from '../shared/launcher'

const extensionOpenedTabIds = new Set<number>()

let lastLaunchAt = 0
const LAUNCH_COOLDOWN_MS = 5000

const GMAIL_HOSTS = new Set(['mail.google.com', 'gmail.com', 'www.gmail.com'])

chrome.webNavigation.onCommitted.addListener(async (details) => {
  if (details.frameId !== 0) return

  let url: URL
  try {
    url = new URL(details.url)
  } catch {
    return
  }

  if (!GMAIL_HOSTS.has(url.hostname)) return

  if (extensionOpenedTabIds.has(details.tabId)) {
    extensionOpenedTabIds.delete(details.tabId)
    return
  }

  const now = Date.now()
  if (now - lastLaunchAt < LAUNCH_COOLDOWN_MS) return

  const settings = await getSettings()
  if (!settings.autoLaunchEnabled) return

  const selectedAccounts = settings.accounts.filter((a) => a.enabled)
  if (selectedAccounts.length === 0) return

  lastLaunchAt = now

  await launchAccounts(selectedAccounts, (tabId) => {
    extensionOpenedTabIds.add(tabId)
  })
})

chrome.tabs.onRemoved.addListener((tabId) => {
  extensionOpenedTabIds.delete(tabId)
})
