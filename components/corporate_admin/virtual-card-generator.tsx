"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { PlusIcon, EyeIcon, CopyIcon, QrCodeIcon, CreditCardIcon } from "lucide-react"

export function VirtualCardGenerator() {
  const [open, setOpen] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [revealCVV, setRevealCVV] = useState(false)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerated(true)
  }

  const resetState = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setTimeout(() => {
        setIsGenerated(false)
        setRevealCVV(false)
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={resetState}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
          <PlusIcon className="mr-2 size-4" /> Issue new card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isGenerated ? "Virtual Card Issued" : "Issue Virtual Card"}</DialogTitle>
          <DialogDescription>
            {isGenerated 
              ? "Your new virtual card is ready for use. Copy the details below."
              : "Generate a new virtual card for an employee or specific purpose."}
          </DialogDescription>
        </DialogHeader>

        {!isGenerated ? (
          <form onSubmit={handleGenerate} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Employee / Cardholder Name</label>
              <Input required placeholder="e.g. Jane Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Purpose</label>
              <Input required placeholder="e.g. Q3 Marketing Trip" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Amount Ceiling (RWF)</label>
              <Input required type="number" placeholder="500000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Validity</label>
              <Select defaultValue="single">
                <SelectTrigger>
                  <SelectValue placeholder="Select validity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Use</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-slate-950 hover:bg-slate-800">Generate Card</Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-6 p-4 flex flex-col items-center">
            {/* Styled Virtual Card Representation */}
            <div className="relative w-full h-48 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-6 text-white shadow-xl overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <QrCodeIcon className="size-24" />
              </div>
              <div className="flex justify-between items-center z-10">
                <div className="font-bold text-lg tracking-wider">yoGuide</div>
                <div className="px-2 py-1 bg-white/20 rounded-md text-xs backdrop-blur-sm">Virtual</div>
              </div>
              <div className="z-10 space-y-4">
                <div className="font-mono text-xl tracking-[0.15em] flex justify-between items-center">
                  <span>5412</span>
                  <span>7512</span>
                  <span>3412</span>
                  <span>3456</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase opacity-70">Cardholder</span>
                    <span className="font-medium tracking-wide">Jane Doe</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase opacity-70">Exp</span>
                      <span className="font-medium font-mono">12/26</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase opacity-70">CVV</span>
                      <span className="font-medium font-mono w-8 text-center bg-white/10 rounded cursor-pointer select-none"
                            onMouseDown={() => setRevealCVV(true)}
                            onMouseUp={() => setRevealCVV(false)}
                            onMouseLeave={() => setRevealCVV(false)}
                            onTouchStart={() => setRevealCVV(true)}
                            onTouchEnd={() => setRevealCVV(false)}
                      >
                        {revealCVV ? "123" : "***"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full justify-center">
              <Button variant="outline" className="flex-1 gap-2">
                <CopyIcon className="size-4" /> Copy Number
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <QrCodeIcon className="size-4" /> Show QR
              </Button>
            </div>
            <div className="text-center text-xs text-slate-500">
              Hold the CVV box to reveal the security code.
            </div>
            <DialogFooter className="w-full sm:justify-center">
              <Button onClick={() => setOpen(false)} className="w-full bg-slate-950 hover:bg-slate-800">Done</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
