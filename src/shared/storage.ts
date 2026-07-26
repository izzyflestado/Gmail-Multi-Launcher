import { DEFAULT_SETTINGS, type ExtensionSettings } from './types'

const STORAGE_KEY = 'gmailMultiLauncherSettings'

export async function getSettings(): Promise<ExtensionSettings> {
  const result = await chrome.storage.sync.get(STORAGE_KEY)
  const stored = result[STORAGE_KEY] as ExtensionSettings | undefined

  if (!stored) {
    await chrome.storage.sync.set({ [STORAGE_KEY]: DEFAULT_SETTINGS })
    return DEFAULT_SETTINGS
  }

  return {
    ...DEFAULT_SETTINGS,
    ...stored,
  }
}

export async function saveSettings(settings: ExtensionSettings): Promise<void> {
  await chrome.storage.sync.set({ [STORAGE_KEY]: settings })
}

export function onSettingsChanged(callback: (settings: ExtensionSettings) => void): void {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return
    const change = changes[STORAGE_KEY]
    if (!change) return
    callback(change.newValue as ExtensionSettings)
  })
}
