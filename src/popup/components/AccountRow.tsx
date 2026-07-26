import type { AccountSlot } from '../../shared/types'
import { Avatar } from './Avatar'

interface AccountRowProps {
  account: AccountSlot
  onToggle: (id: string) => void
  onChange: (id: string, patch: Partial<AccountSlot>) => void
  onRemove: (id: string) => void
  onOpenNow: (id: string) => void
}

export function AccountRow({ account, onToggle, onChange, onRemove, onOpenNow }: AccountRowProps) {
  return (
    <div className={`account-row ${account.enabled ? 'account-row--enabled' : ''}`}>
      <input
        type="checkbox"
        className="account-row__checkbox"
        checked={account.enabled}
        onChange={() => onToggle(account.id)}
        aria-label={`Include ${account.label || 'this account'} in auto-launch`}
      />

      <Avatar label={account.label} />

      <div className="account-row__fields">
        <input
          className="account-row__label-input"
          type="text"
          value={account.label}
          placeholder="Account name"
          onChange={(e) => onChange(account.id, { label: e.target.value })}
        />
        <input
          className="account-row__email-input"
          type="text"
          value={account.email}
          placeholder="you@example.com"
          onChange={(e) => onChange(account.id, { email: e.target.value })}
        />
      </div>

      <div className="account-row__index">
        <label htmlFor={`index-${account.id}`}>u/</label>
        <input
          id={`index-${account.id}`}
          type="number"
          min={0}
          max={20}
          value={account.index}
          onChange={(e) =>
            onChange(account.id, { index: Math.max(0, Number(e.target.value) || 0) })
          }
        />
      </div>

      <div className="account-row__actions">
        <button
          type="button"
          className="icon-button"
          title="Open this account's Gmail now"
          onClick={() => onOpenNow(account.id)}
        >
          ↗
        </button>
        <button
          type="button"
          className="icon-button icon-button--danger"
          title="Remove this account slot"
          onClick={() => onRemove(account.id)}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
