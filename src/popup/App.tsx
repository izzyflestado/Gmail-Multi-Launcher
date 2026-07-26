import { useEffect, useRef, useState } from 'react'
import type { AccountSlot, ExtensionSettings } from '../shared/types'
import { DEFAULT_SETTINGS } from '../shared/types'
import { getSettings, saveSettings } from '../shared/storage'
import { launchAccounts } from '../shared/launcher'
import { AccountRow } from './components/AccountRow'
import './App.css'

function makeId(): string {
  return `acct-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function App() {
  const [settings, setSettings] = useState<ExtensionSettings>(DEFAULT_SETTINGS)
  const [loaded, setLoaded] = useState(false)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    getSettings().then((s) => {
      setSettings(s)
      setLoaded(true)
    })
  }, [])

useEffect(() => {
  if (!loaded) return
  if (isFirstLoad.current) {
    isFirstLoad.current = false
    return
  }
  saveSettings(settings)
}, [settings, loaded])

  function updateAccounts(updater: (accounts: AccountSlot[]) => AccountSlot[]) {
    setSettings((prev) => ({ ...prev, accounts: updater(prev.accounts) }))
  }

  function handleToggle(id: string) {
    updateAccounts((accounts) =>
      accounts.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    )
  }

  function handleChange(id: string, patch: Partial<AccountSlot>) {
    updateAccounts((accounts) => accounts.map((a) => (a.id === id ? { ...a, ...patch } : a)))
  }

  function handleRemove(id: string) {
    updateAccounts((accounts) => accounts.filter((a) => a.id !== id))
  }

  function handleAdd() {
    const nextIndex =
      settings.accounts.length > 0 ? Math.max(...settings.accounts.map((a) => a.index)) + 1 : 0
    updateAccounts((accounts) => [
      ...accounts,
      { id: makeId(), index: nextIndex, label: 'New account', email: '', enabled: true },
    ])
  }

  function handleSelectAll() {
    updateAccounts((accounts) => accounts.map((a) => ({ ...a, enabled: true })))
  }

  function handleClearAll() {
    updateAccounts((accounts) => accounts.map((a) => ({ ...a, enabled: false })))
  }

  function handleToggleAutoLaunch() {
    setSettings((prev) => ({ ...prev, autoLaunchEnabled: !prev.autoLaunchEnabled }))
  }

  async function handleOpenSelectedNow() {
    const selected = settings.accounts.filter((a) => a.enabled)
    if (selected.length === 0) return
    await launchAccounts(selected)
  }

  async function handleOpenSingleNow(id: string) {
    const account = settings.accounts.find((a) => a.id === id)
    if (!account) return
    await launchAccounts([account])
  }

  const selectedCount = settings.accounts.filter((a) => a.enabled).length

  return (
    <div className="app">

      <section className="toggle-row">
        <div className="toggle-row__text">
          <span className="toggle-row__title">Enable Multi-Launch</span>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={settings.autoLaunchEnabled}
            onChange={handleToggleAutoLaunch}
          />
          <span className="switch__track">
            <span className="switch__thumb" />
          </span>
        </label>
      </section>

      <section className="account-list">
        {settings.accounts.length === 0 && (
          <p className="empty-state">
            No accounts saved yet. Click &ldquo;+ Add Account&rdquo; below to register one.
          </p>
        )}
        {settings.accounts
          .slice()
          .sort((a, b) => a.index - b.index)
          .map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              onToggle={handleToggle}
              onChange={handleChange}
              onRemove={handleRemove}
              onOpenNow={handleOpenSingleNow}
            />
          ))}
      </section>

      <button type="button" className="add-account-button" onClick={handleAdd}>
        + Add Account
      </button>

      <section className="bulk-actions">
        <button type="button" className="btn btn--secondary" onClick={handleSelectAll}>
          Select All
        </button>
        <button type="button" className="btn btn--secondary" onClick={handleClearAll}>
          Clear All
        </button>
      </section>

      <button
        type="button"
        className="btn btn--primary open-now-button"
        onClick={handleOpenSelectedNow}
        disabled={selectedCount === 0}
      >
        Open Selected Accounts Now{selectedCount > 0 ? ` (${selectedCount})` : ''}
      </button>
    </div>
  )
}
