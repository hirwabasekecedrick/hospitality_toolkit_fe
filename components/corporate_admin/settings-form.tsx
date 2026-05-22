"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BuildingIcon, UserIcon, BellIcon, ShieldCheckIcon, LinkIcon, SaveIcon } from "lucide-react"

export function SettingsForm() {
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
              <span>Users & Roles</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="workflows" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 rounded-xl px-4 py-3 h-auto">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4" />
              <span>Approval Workflows</span>
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Contact Email</label>
              <Input defaultValue="finance@acmecorp.rw" type="email" />
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
              <p className="text-sm text-slate-500">Manage dashboard access and roles for your team.</p>
            </div>
            <Button variant="outline" onClick={() => alert("Invite sent!")}>Invite User</Button>
          </div>
          <div className="text-center py-12 text-slate-500 border border-dashed border-slate-200 rounded-xl">
            User management table will appear here.
          </div>
        </div>
      </TabsContent>

      <TabsContent value="workflows" className="focus-visible:outline-none">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Approval Workflows</h3>
              <p className="text-sm text-slate-500">Define multi-step approval chains for large transactions.</p>
            </div>
            <Button variant="outline" onClick={() => alert("Workflow builder opened!")}>Create Workflow</Button>
          </div>
          <div className="text-center py-12 text-slate-500 border border-dashed border-slate-200 rounded-xl">
            Drag-and-drop workflow builder will appear here.
          </div>
        </div>
      </TabsContent>

      <TabsContent value="notifications" className="focus-visible:outline-none">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
              <p className="text-sm text-slate-500">Configure which events trigger push, email, or SMS alerts.</p>
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
