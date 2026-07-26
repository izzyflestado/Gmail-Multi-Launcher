export interface AccountSlot {
  id: string
  index: number
  label: string
  email: string
  enabled: boolean
}

export interface ExtensionSettings {
  accounts: AccountSlot[]
  autoLaunchEnabled: boolean
}

export const DEFAULT_SETTINGS: ExtensionSettings = {
  autoLaunchEnabled: true,
  accounts: [
    { id: 'default-0', index: 0, label: 'John Doe', email: 'john@gmail.com', enabled: true },
    { id: 'default-1', index: 1, label: 'Work', email: 'john@company.com', enabled: false },
    { id: 'default-2', index: 2, label: 'School', email: 'john@addu.edu.ph', enabled: true },
  ],
}
