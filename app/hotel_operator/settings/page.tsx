"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type BankAccount = {
  id: string
  accountHolderName: string
  bankName: string
  accountType: "checking" | "savings"
  accountNumber: string
  routingSwiftCode: string
  taxId: string
  isDefault: boolean
}

export default function Page() {
  const [tab, setTab] = React.useState("general")
  const [frequency, setFrequency] = React.useState("every_day")
  const [custom, setCustom] = React.useState("")

  // Payment states
  const [bankAccounts, setBankAccounts] = React.useState<BankAccount[]>(() => {
    try {
      const saved = localStorage.getItem("hotel_bank_accounts")
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      console.error(e)
      return []
    }
  })
  const [isAddingAccount, setIsAddingAccount] = React.useState(false)
  const [editingAccountId, setEditingAccountId] = React.useState<string | null>(null)
  const nextIdRef = React.useRef(1)
  const [formData, setFormData] = React.useState({
    accountHolderName: "",
    bankName: "",
    accountType: "checking" as const,
    accountNumber: "",
    routingSwiftCode: "",
    taxId: "",
  })
  const [transactionThresholdEnabled, setTransactionThresholdEnabled] = React.useState(false)
  const [transactionCountThreshold, setTransactionCountThreshold] = React.useState(10)
  const [apiBaseUrl, setApiBaseUrl] = React.useState("")
  const [apiPrimaryColor, setApiPrimaryColor] = React.useState("#10b981")
  const [apiSecondaryColor, setApiSecondaryColor] = React.useState("#f8fafc")
  const [apiAccentColor, setApiAccentColor] = React.useState("#1d4ed8")
  const [apiFontFamily, setApiFontFamily] = React.useState("Inter, sans-serif")
  const [apiBorderSize, setApiBorderSize] = React.useState("1")

  const saveSchedule = () => {
    const payload = { frequency, custom, transactionThresholdEnabled, transactionCountThreshold }
    try {
      localStorage.setItem("hotel_redeem_schedule", JSON.stringify(payload))
      alert("Redeem schedule saved")
    } catch (e) {
      console.error(e)
    }
  }

  const saveApiSettings = () => {
    try {
      localStorage.setItem(
        "hotel_api_integration",
        JSON.stringify({ apiBaseUrl, apiPrimaryColor, apiSecondaryColor, apiAccentColor, apiFontFamily, apiBorderSize })
      )
      alert("API integration settings saved")
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddAccount = () => {
    if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber || !formData.routingSwiftCode) {
      alert("Please fill all required fields")
      return
    }

    const accountId = editingAccountId || `acc-${nextIdRef.current++}`

    const newAccount: BankAccount = {
      id: accountId,
      ...formData,
      isDefault: editingAccountId ? bankAccounts.find(a => a.id === editingAccountId)?.isDefault || false : bankAccounts.length === 0,
    }

    let updated: BankAccount[]
    if (editingAccountId) {
      updated = bankAccounts.map(a => (a.id === editingAccountId ? newAccount : a))
    } else {
      updated = [...bankAccounts, newAccount]
    }

    setBankAccounts(updated)
    try {
      localStorage.setItem("hotel_bank_accounts", JSON.stringify(updated))
      alert(`Bank account ${editingAccountId ? "updated" : "added"} successfully`)
    } catch (e) {
      console.error(e)
    }

    resetForm()
  }

  const handleDeleteAccount = (id: string) => {
    const updated = bankAccounts.filter(a => a.id !== id)
    setBankAccounts(updated)
    try {
      localStorage.setItem("hotel_bank_accounts", JSON.stringify(updated))
      alert("Bank account deleted")
    } catch (e) {
      console.error(e)
    }
  }

  const handleSetDefault = (id: string) => {
    const updated = bankAccounts.map(a => ({
      ...a,
      isDefault: a.id === id,
    }))
    setBankAccounts(updated)
    try {
      localStorage.setItem("hotel_bank_accounts", JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
  }

  const handleEditAccount = (account: BankAccount) => {
    setFormData({
      accountHolderName: account.accountHolderName,
      bankName: account.bankName,
      accountType: account.accountType,
      accountNumber: account.accountNumber,
      routingSwiftCode: account.routingSwiftCode,
      taxId: account.taxId,
    })
    setEditingAccountId(account.id)
    setIsAddingAccount(true)
  }

  const resetForm = () => {
    setFormData({
      accountHolderName: "",
      bankName: "",
      accountType: "checking",
      accountNumber: "",
      routingSwiftCode: "",
      taxId: "",
    })
    setEditingAccountId(null)
    setIsAddingAccount(false)
  }

  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Settings</h1>
            <p className="mt-2 text-sm text-slate-500">Configure property details, bank accounts, and user access.</p>
          </div>
        </div>

        <div className="mt-8">
          <Tabs value={tab} onValueChange={(v: string) => setTab(v)}>
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="redeems">Redeems</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-500">General property settings appear here.</p>
              </div>
            </TabsContent>

            <TabsContent value="payments">
              <div className="space-y-6">
                {/* Bank Accounts Section */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">Bank accounts</h2>
                      
                    </div>
                    {!isAddingAccount && (
                      <button onClick={() => setIsAddingAccount(true)} className="rounded-md bg-emerald-700 text-white px-4 py-2 text-sm w-full sm:w-auto">
                        Add account
                      </button>
                    )}
                  </div>

                  {/* Add/Edit Form */}
                  {isAddingAccount && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200 space-y-4">
                      <h3 className="font-semibold text-slate-950">{editingAccountId ? "Edit" : "Add new"} bank account</h3>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Account holder name *</label>
                          <input
                            type="text"
                            value={formData.accountHolderName}
                            onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                            placeholder="John Doe"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Bank name *</label>
                          <input
                            type="text"
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                            placeholder="e.g. Chase Bank"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Account type *</label>
                          <select
                            value={formData.accountType}
                            onChange={(e) => setFormData({ ...formData, accountType: e.target.value as "checking" | "savings" })}
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          >
                            <option value="checking">Checking</option>
                            <option value="savings">Savings</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Account number *</label>
                          <input
                            type="password"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                            placeholder="••••••••••••1234"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Routing/Swift code *</label>
                          <input
                            type="text"
                            value={formData.routingSwiftCode}
                            onChange={(e) => setFormData({ ...formData, routingSwiftCode: e.target.value })}
                            placeholder="Routing or SWIFT code"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Tax ID / Business registration</label>
                          <input
                            type="text"
                            value={formData.taxId}
                            onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                            placeholder="e.g. EIN or VAT ID"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button onClick={handleAddAccount} className="rounded-md bg-emerald-700 text-white px-4 py-2 text-sm">
                          {editingAccountId ? "Update" : "Add"} account
                        </button>
                        <button onClick={resetForm} className="rounded-md border border-slate-300 bg-white text-slate-700 px-4 py-2 text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bank Accounts List */}
                  {bankAccounts.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h3 className="font-semibold text-slate-950">Saved accounts</h3>
                      {bankAccounts.map((account) => (
                        <div key={account.id} className="p-4 bg-white rounded-lg border border-slate-200 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold text-slate-950">{account.accountHolderName}</p>
                              {account.isDefault && <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full">Default</span>}
                            </div>
                            <p className="text-sm text-slate-600">{account.bankName} - {account.accountType}</p>
                            <p className="text-sm text-slate-500 mt-1">Acc: ••••••••••••{account.accountNumber.slice(-4)}</p>
                            {account.taxId && <p className="text-sm text-slate-500">Tax ID: {account.taxId}</p>}
                          </div>
                          <div className="flex gap-2">
                            {!account.isDefault && (
                              <button
                                onClick={() => handleSetDefault(account.id)}
                                className="rounded-md text-sm border border-slate-300 bg-white text-slate-700 px-3 py-1"
                              >
                                Set default
                              </button>
                            )}
                            <button
                              onClick={() => handleEditAccount(account)}
                              className="rounded-md text-sm border border-slate-300 bg-white text-slate-700 px-3 py-1"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAccount(account.id)}
                              className="rounded-md text-sm border border-rose-300 bg-rose-50 text-rose-700 px-3 py-1"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {bankAccounts.length === 0 && !isAddingAccount && (
                    <div className="mt-6 p-4 text-center text-slate-500">
                      <p className="text-sm">No bank accounts added yet. Add one to get started.</p>
                    </div>
                  )}
                </div>

                {/* Settlement Information */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-lg font-semibold text-slate-950 mb-4">Settlement information</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Settlement currency</label>
                      <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>CAD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Minimum settlement amount</label>
                      <input type="number" defaultValue="100" min="0" step="10" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <button className="mt-4 rounded-md bg-emerald-700 text-white px-4 py-2 text-sm">Save settings</button>
                </div>

                {/* API Integration Styling */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">API integration styling</h2>
                      <p className="mt-1 text-sm text-slate-500">Choose how embedded API components should appear.</p>
                    </div>
                    <button onClick={saveApiSettings} className="rounded-md bg-emerald-700 text-white px-4 py-2 text-sm">
                      Save API settings
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">API endpoint</label>
                      <input
                        type="text"
                        value={apiBaseUrl}
                        onChange={(e) => setApiBaseUrl(e.target.value)}
                        placeholder="https://api.example.com"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Font family</label>
                      <input
                        type="text"
                        value={apiFontFamily}
                        onChange={(e) => setApiFontFamily(e.target.value)}
                        placeholder="Inter, sans-serif"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Primary color</label>
                      <input
                        type="color"
                        value={apiPrimaryColor}
                        onChange={(e) => setApiPrimaryColor(e.target.value)}
                        className="h-10 w-full rounded-md border border-slate-300 p-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Secondary color</label>
                      <input
                        type="color"
                        value={apiSecondaryColor}
                        onChange={(e) => setApiSecondaryColor(e.target.value)}
                        className="h-10 w-full rounded-md border border-slate-300 p-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Accent color</label>
                      <input
                        type="color"
                        value={apiAccentColor}
                        onChange={(e) => setApiAccentColor(e.target.value)}
                        className="h-10 w-full rounded-md border border-slate-300 p-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Border size (px)</label>
                      <input
                        type="number"
                        min={0}
                        value={apiBorderSize}
                        onChange={(e) => setApiBorderSize(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-semibold text-slate-950">Preview</h3>
                    <div
                      style={{
                        background: apiSecondaryColor,
                        color: apiPrimaryColor,
                        border: `${apiBorderSize}px solid ${apiAccentColor}`,
                        fontFamily: apiFontFamily,
                      }}
                      className="mt-3 rounded-xl p-4"
                    >
                      <p className="text-sm">API component preview text uses your selected palette, font, and border size.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="redeems">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold">Redeem schedule</h2>
                <p className="mt-1 text-sm text-slate-500">Configure how often the system attempts to redeem payments to your account.</p>

                <div className="mt-4 space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="freq" value="every_hour" checked={frequency === "every_hour"} onChange={() => setFrequency("every_hour")} />
                    <span className="text-sm">Every hour</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="freq" value="every_day" checked={frequency === "every_day"} onChange={() => setFrequency("every_day")} />
                    <span className="text-sm">Every day</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="freq" value="every_week" checked={frequency === "every_week"} onChange={() => setFrequency("every_week")} />
                    <span className="text-sm">Every week</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="freq" value="every_month" checked={frequency === "every_month"} onChange={() => setFrequency("every_month")} />
                    <span className="text-sm">Every month</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="freq" value="custom" checked={frequency === "custom"} onChange={() => setFrequency("custom")} />
                    <span className="text-sm">Custom</span>
                  </label>

                  {frequency === "custom" ? (
                    <div className="mt-2">
                      <label className="text-sm text-slate-600">Custom interval (cron or human readable)</label>
                      <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. every 12 hours or 0 */12 * * *" className="mt-1 w-full rounded-md border p-2" />
                    </div>
                  ) : null}

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-slate-950">Redeem by transaction count</h3>
                        <p className="text-sm text-slate-500">If enabled, redeems only run when the minimum number of transactions is reached.</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={transactionThresholdEnabled}
                          onChange={(e) => setTransactionThresholdEnabled(e.target.checked)}
                          className="rounded border-slate-300"
                        />
                        <span className="text-sm text-slate-700">Enable transaction threshold</span>
                      </label>

                      <div className="w-full sm:w-48">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Minimum transactions</label>
                        <input
                          type="number"
                          min={1}
                          value={transactionCountThreshold}
                          onChange={(e) => setTransactionCountThreshold(Number(e.target.value))}
                          disabled={!transactionThresholdEnabled}
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button onClick={saveSchedule} className="rounded-md bg-emerald-700 text-white px-4 py-2">Save schedule</button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
