"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type BankAccount = {
  id: string;
  accountHolderName: string;
  bankName: string;
  accountType: "checking" | "savings";
  accountNumber: string;
  routingSwiftCode: string;
  taxId: string;
  isDefault: boolean;
};

export default function Page() {
  const [tab, setTab] = React.useState("general");
  const [frequency, setFrequency] = React.useState("every_day");
  const [custom, setCustom] = React.useState("");

  // Payment states
  const [bankAccounts, setBankAccounts] = React.useState<BankAccount[]>(() => {
    try {
      const saved = localStorage.getItem("hotel_bank_accounts");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  const [isAddingAccount, setIsAddingAccount] = React.useState(false);
  const [editingAccountId, setEditingAccountId] = React.useState<string | null>(
    null,
  );
  const nextIdRef = React.useRef(1);
  type BankAccountForm = {
    accountHolderName: string;
    bankName: string;
    accountType: "checking" | "savings";
    accountNumber: string;
    routingSwiftCode: string;
    taxId: string;
  };
  const [formData, setFormData] = React.useState<BankAccountForm>({
    accountHolderName: "",
    bankName: "",
    accountType: "checking",
    accountNumber: "",
    routingSwiftCode: "",
    taxId: "",
  });
  const [transactionThresholdEnabled, setTransactionThresholdEnabled] =
    React.useState(false);
  const [transactionCountThreshold, setTransactionCountThreshold] =
    React.useState(10);
  const [apiBaseUrl, setApiBaseUrl] = React.useState("");
  const [apiPrimaryColor, setApiPrimaryColor] = React.useState("#10b981");
  const [apiPrimaryColorInput, setApiPrimaryColorInput] =
    React.useState("#10b981");
  const [apiSecondaryColor, setApiSecondaryColor] = React.useState("#f8fafc");
  const [apiSecondaryColorInput, setApiSecondaryColorInput] =
    React.useState("#f8fafc");
  const [apiAccentColor, setApiAccentColor] = React.useState("#1d4ed8");
  const [apiAccentColorInput, setApiAccentColorInput] =
    React.useState("#1d4ed8");
  const [apiFontFamily, setApiFontFamily] = React.useState("Inter, sans-serif");
  const [apiBorderSize, setApiBorderSize] = React.useState("1");
  const [apiPreviewMode, setApiPreviewMode] = React.useState<"light" | "dark">(
    "light",
  );
  const [colorErrors, setColorErrors] = React.useState<{
    primary?: string;
    secondary?: string;
    accent?: string;
  }>({});
  const [hotelName, setHotelName] = React.useState("");
  const [hotelCode, setHotelCode] = React.useState("");
  const [hotelLocation, setHotelLocation] = React.useState("");
  const [hotelLogoUrl, setHotelLogoUrl] = React.useState("");
  const [hotelLogoFile, setHotelLogoFile] = React.useState<File | null>(null);
  const [hotelLogoPreview, setHotelLogoPreview] = React.useState("");
  const [hotelStarRating, setHotelStarRating] = React.useState(4);

  const securityLogs = [
    {
      id: "1",
      event: "Signed in",
      detail: "User logged in to the hotel operator dashboard.",
      time: "May 23, 2026 09:12 AM",
    },
    {
      id: "2",
      event: "Updated settings",
      detail: "Changed API integration styling and bank account details.",
      time: "May 23, 2026 10:03 AM",
    },
    {
      id: "3",
      event: "Uploaded logo",
      detail: "Updated hotel logo image in general settings.",
      time: "May 23, 2026 11:28 AM",
    },
    {
      id: "4",
      event: "Saved hotel identity",
      detail: "Updated hotel name, code, and star rating.",
      time: "May 23, 2026 12:45 PM",
    },
  ];

  React.useEffect(() => {
    if (!hotelLogoFile) {
      setHotelLogoPreview("");
      return;
    }

    const url = URL.createObjectURL(hotelLogoFile);
    setHotelLogoPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [hotelLogoFile]);

  const isValidHex = (value: string) => {
    const raw = value.trim().replace(/^#/, "");
    return (
      /^[0-9A-Fa-f]{3}$/.test(raw) ||
      /^[0-9A-Fa-f]{4}$/.test(raw) ||
      /^[0-9A-Fa-f]{6}$/.test(raw) ||
      /^[0-9A-Fa-f]{8}$/.test(raw)
    );
  };

  const normalizeHex = (value: string) => {
    const raw = value.trim().replace(/^#/, "");
    return raw ? `#${raw}` : "";
  };

  const handleColorPickerChange = (
    key: "primary" | "secondary" | "accent",
    value: string,
  ) => {
    const normalized = normalizeHex(value);
    if (key === "primary") {
      setApiPrimaryColor(normalized);
      setApiPrimaryColorInput(normalized);
      setColorErrors((prev) => ({ ...prev, primary: "" }));
    }
    if (key === "secondary") {
      setApiSecondaryColor(normalized);
      setApiSecondaryColorInput(normalized);
      setColorErrors((prev) => ({ ...prev, secondary: "" }));
    }
    if (key === "accent") {
      setApiAccentColor(normalized);
      setApiAccentColorInput(normalized);
      setColorErrors((prev) => ({ ...prev, accent: "" }));
    }
  };

  const handleColorTextChange = (
    key: "primary" | "secondary" | "accent",
    value: string,
  ) => {
    if (key === "primary") {
      setApiPrimaryColorInput(value);
      setColorErrors((prev) => ({ ...prev, primary: "" }));
    }
    if (key === "secondary") {
      setApiSecondaryColorInput(value);
      setColorErrors((prev) => ({ ...prev, secondary: "" }));
    }
    if (key === "accent") {
      setApiAccentColorInput(value);
      setColorErrors((prev) => ({ ...prev, accent: "" }));
    }
  };

  const handleColorTextBlur = (key: "primary" | "secondary" | "accent") => {
    const currentValue =
      key === "primary"
        ? apiPrimaryColorInput
        : key === "secondary"
          ? apiSecondaryColorInput
          : apiAccentColorInput;

    if (isValidHex(currentValue)) {
      const normalized = normalizeHex(currentValue);
      if (key === "primary") {
        setApiPrimaryColor(normalized);
        setApiPrimaryColorInput(normalized);
      }
      if (key === "secondary") {
        setApiSecondaryColor(normalized);
        setApiSecondaryColorInput(normalized);
      }
      if (key === "accent") {
        setApiAccentColor(normalized);
        setApiAccentColorInput(normalized);
      }
      setColorErrors((prev) => ({ ...prev, [key]: "" }));
    } else {
      setColorErrors((prev) => ({
        ...prev,
        [key]: "Enter a valid hex code like #0ea5e9",
      }));
    }
  };

  const saveSchedule = () => {
    const payload = {
      frequency,
      custom,
      transactionThresholdEnabled,
      transactionCountThreshold,
    };
    try {
      localStorage.setItem("hotel_redeem_schedule", JSON.stringify(payload));
      alert("Redeem schedule saved");
    } catch (e) {
      console.error(e);
    }
  };

  const saveApiSettings = () => {
    try {
      localStorage.setItem(
        "hotel_api_integration",
        JSON.stringify({
          apiBaseUrl,
          apiPrimaryColor,
          apiSecondaryColor,
          apiAccentColor,
          apiFontFamily,
          apiBorderSize,
        }),
      );
      alert("API integration settings saved");
    } catch (e) {
      console.error(e);
    }
  };

  const saveGeneralSettings = () => {
    try {
      localStorage.setItem(
        "hotel_general_settings",
        JSON.stringify({
          hotelName,
          hotelCode,
          hotelLocation,
          hotelLogoUrl,
          hotelStarRating,
        }),
      );
      alert("General hotel settings saved");
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHotelLogoFile(file);
    }
  };

  const handleAddAccount = () => {
    if (
      !formData.accountHolderName ||
      !formData.bankName ||
      !formData.accountNumber ||
      !formData.routingSwiftCode
    ) {
      alert("Please fill all required fields");
      return;
    }

    const accountId = editingAccountId || `acc-${nextIdRef.current++}`;

    const newAccount: BankAccount = {
      id: accountId,
      ...formData,
      isDefault: editingAccountId
        ? bankAccounts.find((a) => a.id === editingAccountId)?.isDefault ||
          false
        : bankAccounts.length === 0,
    };

    let updated: BankAccount[];
    if (editingAccountId) {
      updated = bankAccounts.map((a) =>
        a.id === editingAccountId ? newAccount : a,
      );
    } else {
      updated = [...bankAccounts, newAccount];
    }

    setBankAccounts(updated);
    try {
      localStorage.setItem("hotel_bank_accounts", JSON.stringify(updated));
      alert(
        `Bank account ${editingAccountId ? "updated" : "added"} successfully`,
      );
    } catch (e) {
      console.error(e);
    }

    resetForm();
  };

  const handleDeleteAccount = (id: string) => {
    const updated = bankAccounts.filter((a) => a.id !== id);
    setBankAccounts(updated);
    try {
      localStorage.setItem("hotel_bank_accounts", JSON.stringify(updated));
      alert("Bank account deleted");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetDefault = (id: string) => {
    const updated = bankAccounts.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setBankAccounts(updated);
    try {
      localStorage.setItem("hotel_bank_accounts", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditAccount = (account: BankAccount) => {
    setFormData({
      accountHolderName: account.accountHolderName,
      bankName: account.bankName,
      accountType: account.accountType,
      accountNumber: account.accountNumber,
      routingSwiftCode: account.routingSwiftCode,
      taxId: account.taxId,
    });
    setEditingAccountId(account.id);
    setIsAddingAccount(true);
  };

  const resetForm = () => {
    setFormData({
      accountHolderName: "",
      bankName: "",
      accountType: "checking",
      accountNumber: "",
      routingSwiftCode: "",
      taxId: "",
    });
    setEditingAccountId(null);
    setIsAddingAccount(false);
  };

  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-1 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">
              Settings
            </h1>
          </div>
        </div>

        <div className="mt-8">
          <Tabs value={tab} onValueChange={(v: string) => setTab(v)}>
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="redeems">Redeems</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      Hotel identity
                    </h2>
                  </div>
                  <button
                    onClick={saveGeneralSettings}
                    className="rounded-md bg-emerald-700 text-white px-4 py-2 text-sm"
                  >
                    Save general settings
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Hotel name
                    </label>
                    <input
                      type="text"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      placeholder="e.g. Grand Horizon Hotel"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={hotelLocation}
                      onChange={(e) => setHotelLocation(e.target.value)}
                      placeholder="e.g. Downtown, San Francisco"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Star rating
                    </label>
                    <select
                      value={hotelStarRating}
                      onChange={(e) =>
                        setHotelStarRating(Number(e.target.value))
                      }
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Hotel logo URL
                    </label>
                    <input
                      type="text"
                      value={hotelLogoUrl}
                      onChange={(e) => setHotelLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Upload logo file
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="w-full text-sm"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        Hotel preview
                      </p>
                      <p className="text-xs text-slate-500">
                        Logo loaded from URL or file selected above.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                      <span>
                        {hotelStarRating} Star{hotelStarRating > 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            className={
                              index < hotelStarRating
                                ? "text-amber-500"
                                : "text-slate-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-28 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                      {hotelLogoPreview ? (
                        <img
                          src={hotelLogoPreview}
                          alt="Hotel logo preview"
                          className="h-full w-full object-contain"
                        />
                      ) : hotelLogoUrl ? (
                        <img
                          src={hotelLogoUrl}
                          alt="Hotel logo preview"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-500">
                          No logo
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-950">
                        {hotelName || "Hotel name not set"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {hotelCode
                          ? `Code: ${hotelCode}`
                          : "Hotel code not set"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {hotelLocation || "Location not set"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payments">
              <div className="space-y-6">
                {/* Bank Accounts Section */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">
                        Bank accounts
                      </h2>
                    </div>
                    {!isAddingAccount && (
                      <button
                        onClick={() => setIsAddingAccount(true)}
                        className="rounded-md bg-emerald-700 text-white px-4 py-2 text-sm w-full sm:w-auto"
                      >
                        Add account
                      </button>
                    )}
                  </div>

                  {/* Add/Edit Form */}
                  {isAddingAccount && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200 space-y-4">
                      <h3 className="font-semibold text-slate-950">
                        {editingAccountId ? "Edit" : "Add new"} bank account
                      </h3>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Account holder name *
                          </label>
                          <input
                            type="text"
                            value={formData.accountHolderName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accountHolderName: e.target.value,
                              })
                            }
                            placeholder="John Doe"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Bank name *
                          </label>
                          <input
                            type="text"
                            value={formData.bankName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bankName: e.target.value,
                              })
                            }
                            placeholder="e.g. Chase Bank"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Account type *
                          </label>
                          <select
                            value={formData.accountType}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accountType: e.target.value as
                                  | "checking"
                                  | "savings",
                              })
                            }
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          >
                            <option value="checking">Checking</option>
                            <option value="savings">Savings</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Account number *
                          </label>
                          <input
                            type="password"
                            value={formData.accountNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accountNumber: e.target.value,
                              })
                            }
                            placeholder="••••••••••••1234"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Routing/Swift code *
                          </label>
                          <input
                            type="text"
                            value={formData.routingSwiftCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                routingSwiftCode: e.target.value,
                              })
                            }
                            placeholder="Routing or SWIFT code"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Tax ID / Business registration
                          </label>
                          <input
                            type="text"
                            value={formData.taxId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                taxId: e.target.value,
                              })
                            }
                            placeholder="e.g. EIN or VAT ID"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleAddAccount}
                          className="rounded-md bg-emerald-700 text-white px-4 py-2 text-sm"
                        >
                          {editingAccountId ? "Update" : "Add"} account
                        </button>
                        <button
                          onClick={resetForm}
                          className="rounded-md border border-slate-300 bg-white text-slate-700 px-4 py-2 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bank Accounts List */}
                  {bankAccounts.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h3 className="font-semibold text-slate-950">
                        Saved accounts
                      </h3>
                      {bankAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="p-4 bg-white rounded-lg border border-slate-200 flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold text-slate-950">
                                {account.accountHolderName}
                              </p>
                              {account.isDefault && (
                                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600">
                              {account.bankName} - {account.accountType}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              Acc: ••••••••••••{account.accountNumber.slice(-4)}
                            </p>
                            {account.taxId && (
                              <p className="text-sm text-slate-500">
                                Tax ID: {account.taxId}
                              </p>
                            )}
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
                      <p className="text-sm">
                        No bank accounts added yet. Add one to get started.
                      </p>
                    </div>
                  )}
                </div>

                {/* Settlement Information */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-lg font-semibold text-slate-950 mb-4">
                    Settlement information
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Settlement currency
                      </label>
                      <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>CAD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Minimum settlement amount
                      </label>
                      <input
                        type="number"
                        defaultValue="100"
                        min="0"
                        step="10"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <button className="mt-4 rounded-md bg-emerald-700 text-white px-4 py-2 text-sm">
                    Save settings
                  </button>
                </div>

                {/* API Integration Styling */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center flex-col sm:flex-row sm:justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">
                        API integration styling
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Customize API components
                      </p>
                    </div>
                    <div className="w-full sm:w-auto">
                      <button
                        onClick={saveApiSettings}
                        className="rounded-md bg-emerald-700 text-white px-4 py-2 w-full text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Font family
                      </label>
                      <input
                        type="text"
                        value={apiFontFamily}
                        onChange={(e) => setApiFontFamily(e.target.value)}
                        placeholder="Inter, sans-serif"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Primary color
                      </label>
                      <div className="grid gap-2 sm:grid-cols-[auto_1fr]">
                        <input
                          type="color"
                          value={apiPrimaryColor}
                          onChange={(e) =>
                            handleColorPickerChange("primary", e.target.value)
                          }
                          className="h-10 w-full rounded-md border border-slate-300 p-1"
                        />
                        <input
                          type="text"
                          value={apiPrimaryColorInput}
                          onChange={(e) =>
                            handleColorTextChange("primary", e.target.value)
                          }
                          onBlur={() => handleColorTextBlur("primary")}
                          placeholder="#10b981"
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <p
                        className={`mt-1 text-xs ${colorErrors.primary ? "text-rose-600" : "text-slate-500"}`}
                      >
                        {colorErrors.primary ||
                          "Paste a hex code or choose a color."}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Secondary color
                      </label>
                      <div className="grid gap-2 sm:grid-cols-[auto_1fr]">
                        <input
                          type="color"
                          value={apiSecondaryColor}
                          onChange={(e) =>
                            handleColorPickerChange("secondary", e.target.value)
                          }
                          className="h-10 w-full rounded-md border border-slate-300 p-1"
                        />
                        <input
                          type="text"
                          value={apiSecondaryColorInput}
                          onChange={(e) =>
                            handleColorTextChange("secondary", e.target.value)
                          }
                          onBlur={() => handleColorTextBlur("secondary")}
                          placeholder="#f8fafc"
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <p
                        className={`mt-1 text-xs ${colorErrors.secondary ? "text-rose-600" : "text-slate-500"}`}
                      >
                        {colorErrors.secondary ||
                          "Paste a hex code or choose a color."}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Accent color
                      </label>
                      <div className="grid gap-2 sm:grid-cols-[auto_1fr]">
                        <input
                          type="color"
                          value={apiAccentColor}
                          onChange={(e) =>
                            handleColorPickerChange("accent", e.target.value)
                          }
                          className="h-10 w-full rounded-md border border-slate-300 p-1"
                        />
                        <input
                          type="text"
                          value={apiAccentColorInput}
                          onChange={(e) =>
                            handleColorTextChange("accent", e.target.value)
                          }
                          onBlur={() => handleColorTextBlur("accent")}
                          placeholder="#1d4ed8"
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <p
                        className={`mt-1 text-xs ${colorErrors.accent ? "text-rose-600" : "text-slate-500"}`}
                      >
                        {colorErrors.accent ||
                          "Paste a hex code or choose a color."}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Border size (px)
                      </label>
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
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-950">
                          Preview
                        </h3>
                        <p className="text-xs text-slate-500">
                          Switch between light and dark preview styles.
                        </p>
                      </div>
                      <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-slate-600">
                        <button
                          type="button"
                          onClick={() => setApiPreviewMode("light")}
                          className={`rounded-full px-3 py-1 text-sm ${apiPreviewMode === "light" ? "bg-emerald-700 text-white" : "text-slate-700"}`}
                        >
                          Light
                        </button>
                        <button
                          type="button"
                          onClick={() => setApiPreviewMode("dark")}
                          className={`rounded-full px-3 py-1 text-sm ${apiPreviewMode === "dark" ? "bg-emerald-700 text-white" : "text-slate-700"}`}
                        >
                          Dark
                        </button>
                      </div>
                    </div>

                    <div
                      style={{
                        background:
                          apiPreviewMode === "dark"
                            ? "#0f172a"
                            : apiSecondaryColor,
                        color:
                          apiPreviewMode === "dark"
                            ? "#f8fafc"
                            : apiPrimaryColor,
                        border: `${apiBorderSize}px solid ${apiAccentColor}`,
                        fontFamily: apiFontFamily,
                      }}
                      className={`mt-4 rounded-xl p-5 ${apiPreviewMode === "dark" ? "shadow-lg shadow-slate-950/20" : "shadow-sm shadow-slate-200"}`}
                    >
                      <p className="text-sm font-semibold">
                        API component preview
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="redeems">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold">Redeem schedule</h2>

                <div className="mt-4 space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="freq"
                      value="every_day"
                      checked={frequency === "every_day"}
                      onChange={() => setFrequency("every_day")}
                    />
                    <span className="text-sm">Every day</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="freq"
                      value="every_week"
                      checked={frequency === "every_week"}
                      onChange={() => setFrequency("every_week")}
                    />
                    <span className="text-sm">Every week</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="freq"
                      value="every_month"
                      checked={frequency === "every_month"}
                      onChange={() => setFrequency("every_month")}
                    />
                    <span className="text-sm">Every month</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="freq"
                      value="custom"
                      checked={frequency === "custom"}
                      onChange={() => setFrequency("custom")}
                    />
                    <span className="text-sm">Custom</span>
                  </label>

                  {frequency === "custom" ? (
                    <div className="mt-2">
                      <label className="text-sm text-slate-600">
                        Custom interval (cron or human readable)
                      </label>
                      <input
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        placeholder="e.g. every 12 hours or 0 */12 * * *"
                        className="mt-1 w-full rounded-md border p-2"
                      />
                    </div>
                  ) : null}

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-slate-950">
                          Redeem by transaction count
                        </h3>
                        <p className="text-sm text-slate-500">
                          If enabled, redeems only run when the minimum number
                          of transactions is reached.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={transactionThresholdEnabled}
                          onChange={(e) =>
                            setTransactionThresholdEnabled(e.target.checked)
                          }
                          className="rounded border-slate-300"
                        />
                        <span className="text-sm text-slate-700">
                          Enable transaction threshold
                        </span>
                      </label>

                      <div className="w-full sm:w-48">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Minimum transactions
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={transactionCountThreshold}
                          onChange={(e) =>
                            setTransactionCountThreshold(Number(e.target.value))
                          }
                          disabled={!transactionThresholdEnabled}
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={saveSchedule}
                      className="rounded-md bg-emerald-700 text-white px-4 py-2"
                    >
                      Save schedule
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      Security activity logs
                    </h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {securityLogs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">
                            {log.event}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {log.detail}
                          </p>
                        </div>
                        <div className="text-sm text-slate-500">
                          <p className="font-medium text-slate-900">
                            {log.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
