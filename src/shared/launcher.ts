import type { AccountSlot } from './types'


export function buildGmailUrl(accountIndex: number): string {
  return `https://mail.google.com/mail/u/${accountIndex}/`
}

export async function launchAccounts(
  accounts: AccountSlot[],
  onTabCreated?: (tabId: number) => void
): Promise<void> {
  for (const account of accounts) {
    const targetUrl = buildGmailUrl(account.index)

    const existingTabs = await chrome.tabs.query({
      url: `https://mail.google.com/mail/u/${account.index}/*`,
    })

    if (existingTabs.length > 0 && existingTabs[0].id !== undefined) {
      const tab = existingTabs[0]
      await chrome.tabs.update(tab.id!, { active: true })
      if (tab.windowId !== undefined) {
        await chrome.windows.update(tab.windowId, { focused: true })
      }
      continue
    }

    // Not open yet - create it.
    const newTab = await chrome.tabs.create({ url: targetUrl, active: false })
    if (newTab.id !== undefined) {
      onTabCreated?.(newTab.id)
    }
  }
}
