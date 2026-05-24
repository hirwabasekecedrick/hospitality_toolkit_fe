"use client"

import { useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BuildingIcon, UserIcon, BellIcon, LinkIcon, SaveIcon, PlusIcon, UploadIcon, FileTextIcon, Edit2Icon, Trash2Icon, CreditCardIcon } from "lucide-react"

interface Employee {
  id: string
  name: string
  role: string
  cardStatus: string
}

const initialEmployees: Employee[] = [
  { id: "emp-001", name: "Alice Niyonkuru", role: "Finance", cardStatus: "No card" },
  { id: "emp-002", name: "Eric Habimana", role: "Procurement", cardStatus: "Card generated" },
  { id: "emp-003", name: "Beatrice Uwase",  role: "Operations", cardStatus: "No card" },
]

export function SettingsForm() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [importMessage, setImportMessage] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [formName, setFormName] = useState("")
  const [formRole, setFormRole] = useState("")
  const [formCardStatus, setFormCardStatus] = useState("No card")

  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) => {
        const query = searchTerm.toLowerCase().trim()
        if (!query) return true
        return (
          employee.name.toLowerCase().includes(query) ||
          employee.role.toLowerCase().includes(query)
        )
      }),
    [employees, searchTerm]
  )

  const resetForm = () => {
    setFormName("")
    setFormRole("")
    setFormCardStatus("No card")
    setEditingEmployee(null)
  }

  const openAddDialog = () => {
    resetForm()
    setDialogOpen(true)
  }

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormName(employee.name)
    setFormRole(employee.role)
    setFormCardStatus(employee.cardStatus)
    setDialogOpen(true)
  }

  const handleSaveEmployee = () => {
    if (!formName.trim()) {
      alert("Please enter an employee name and .")
      return
    }

    if (editingEmployee) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingEmployee.id
            ? { ...employee, name: formName, role: formRole || "Staff", cardStatus: formCardStatus }
            : employee
        )
      )
      setImportMessage(`Updated ${formName}.`)
    } else {
      setEmployees((current) => [
        ...current,
        {
          id: `emp-${Date.now()}`,
          name: formName,
          role: formRole || "Staff",
          cardStatus: "No card",
        },
      ])
      setImportMessage(`${formName} was added successfully.`)
    }

    setDialogOpen(false)
    resetForm()
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees((current) => current.filter((employee) => employee.id !== id))
    setImportMessage("Employee removed.")
  }

  const handleGenerateCard = (id: string) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, cardStatus: "Card generated" } : employee
      )
    )
    setImportMessage("Card generated successfully.")
  }

  const parseCsvFile = async (file: File) => {
    const text = await file.text()
    const rows = text.split(/\r?\n/).map((row) => row.trim()).filter(Boolean)
    if (rows.length <= 1) return []

    return rows.slice(1).reduce<Employee[]>((result, row, index) => {
      const [name, role] = row.split(",").map((value) => value.trim())
      if (!name ) return result
      result.push({
        id: `emp-import-${Date.now()}-${index}`,
        name,
        role: role || "Staff",
        cardStatus: "No card",
      })
      return result
    }, [])
  }

  const importEmployeesFromFile = async (file: File) => {
    setImportMessage(null)
    if (file.name.toLowerCase().endsWith(".csv")) {
      const parsed = await parseCsvFile(file)
      if (parsed.length === 0) {
        setImportMessage("No valid employees found in the CSV file.")
        return
      }
      setEmployees((current) => [...current, ...parsed])
      setImportMessage(`Imported ${parsed.length} employee(s) from ${file.name}.`)
      return
    }

    const stub = {
      id: `emp-import-${Date.now()}`,
      name: file.name.replace(/\.xlsx?$|\.csv?$/i, ""),
      role: "Imported",
      cardStatus: "No card",
    }
    setEmployees((current) => [...current, stub])
    setImportMessage(`Received ${file.name}. Excel import is mocked in this demo and a placeholder employee was created.`)
  }

  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    await importEmployeesFromFile(file)
    event.target.value = ""
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)

    const file = event.dataTransfer.files?.[0]
    if (!file) return
    await importEmployeesFromFile(file)
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto p-2">
        <TabsList className="bg-transparent space-x-2 w-full justify-start h-auto">
          <TabsTrigger value="profile" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 rounded-xl px-4 py-3 h-auto">
            <div className="flex items-center gap-2">
              <BuildingIcon className="h-4 w-4" />
              <span>Company Profile</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 rounded-xl px-4 py-3 h-auto">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>Employees</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 rounded-xl px-4 py-3 h-auto">
            <div className="flex items-center gap-2">
              <BellIcon className="h-4 w-4" />
              <span>Notifications</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 rounded-xl px-4 py-3 h-auto">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              <span>Integrations</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="profile" className="focus-visible:outline-none">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Company Information</h3>
            <p className="text-sm text-slate-500">Update your company's general details and funding sources.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Company Name</label>
              <Input defaultValue="ACME Corp Rwanda" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Registration Number (RDB)</label>
              <Input defaultValue="10987654321" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Primary Funding Source</label>
              <Select defaultValue="bok">
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bok">Bank of Kigali - **** 4532</SelectItem>
                  <SelectItem value="equity">Equity Bank - **** 8821</SelectItem>
                  <SelectItem value="momo">MTN Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button className="bg-slate-950 hover:bg-slate-800 text-white" onClick={() => alert("Settings saved!")}>
              <SaveIcon className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="users" className="focus-visible:outline-none">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Employee Management</h3>
              <p className="text-sm text-slate-500">Add employees manually or upload a file, then manage access, cards, and roles.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="outline" onClick={openAddDialog}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add employee
              </Button>
              <Button variant="outline" asChild>
                <label htmlFor="employee-file" className="cursor-pointer flex items-center gap-2">
                  <UploadIcon className="h-4 w-4" /> Upload file
                </label>
              </Button>
              <input
                id="employee-file"
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={handleFileInput}
              />
            </div>
          </div>

          <div
            onDragOver={(event) => {
              event.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`rounded-3xl border-2 border-dashed p-6 text-center transition ${
              dragActive ? "border-emerald-500 bg-emerald-50/50" : "border-slate-200 bg-slate-50"
            }`}
          >
            <FileTextIcon className="mx-auto mb-3 h-8 w-8 text-slate-400" />
            <p className="text-base font-medium text-slate-900">Drag and drop a CSV/Excel file here</p>
            <p className="text-sm text-slate-500">We will import employee names,  addresses, and roles.</p>
          </div>

          {importMessage ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {importMessage}
            </div>
          ) : null}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                <Input
                  placeholder="Search employees by name,or role"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="border-0 bg-transparent px-0 py-0 focus:ring-0"
                />
              </div>
              <p className="text-sm text-slate-500">{filteredEmployees.length} employees found</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
              <table className="min-w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Card</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-4 font-medium text-slate-900">{employee.name}</td>
                      <td className="px-4 py-4">{employee.role}</td>
                      <td className="px-4 py-4">{employee.cardStatus}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="inline-flex flex-wrap items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => openEditDialog(employee)}
                          >
                            <Edit2Icon className="h-3.5 w-3.5" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleGenerateCard(employee.id)}
                          >
                            <CreditCardIcon className="h-3.5 w-3.5" /> Card
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            <Trash2Icon className="h-3.5 w-3.5" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">
                        No employees match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingEmployee ? "Edit employee" : "Add employee"}</DialogTitle>
              <DialogDescription>
                {editingEmployee
                  ? "Update employee roles,  address, or card assignment."
                  : "Add a new employee manually so they can receive a virtual card and access the dashboard."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Name</label>
                <Input value={formName} onChange={(event) => setFormName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Role</label>
                <Input value={formRole} onChange={(event) => setFormRole(event.target.value)} />
              </div>
              {editingEmployee ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Card status</label>
                  <Select value={formCardStatus} onValueChange={setFormCardStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No card">No card</SelectItem>
                      <SelectItem value="Card generated">Card generated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : null}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveEmployee}>{editingEmployee ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>

      <TabsContent value="notifications" className="focus-visible:outline-none">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
              <p className="text-sm text-slate-500">Configure which events trigger push, or SMS alerts.</p>
            </div>
          </div>
          <div className="text-center py-12 text-slate-500 border border-dashed border-slate-200 rounded-xl">
            Notification toggles will appear here.
          </div>
        </div>
      </TabsContent>

      <TabsContent value="integrations" className="focus-visible:outline-none">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">API & ERP Integrations</h3>
              <p className="text-sm text-slate-500">Manage API keys and webhooks for your internal tools.</p>
            </div>
            <Button variant="outline" onClick={() => alert("API key generated!")}>Generate API Key</Button>
          </div>
          <div className="text-center py-12 text-slate-500 border border-dashed border-slate-200 rounded-xl">
            ERP webhook configuration will appear here.
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
