"use client"

import React, { useEffect, useState } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { GripVerticalIcon, WalletIcon, BuildingIcon, CreditCardIcon, AlertTriangleIcon } from "lucide-react"
import { getBudgets, subscribeBudgets, type Budget } from "@/lib/budgetStore"
import Link from "next/link"

function SortableBudgetItem({ item }: { item: Budget }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const progressPercentage = item.allocated ? (item.spent / item.allocated) * 100 : 0
  const isNearCeiling = progressPercentage > 85

  return (
    <div ref={setNodeRef} style={style} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm relative group mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing">
            <GripVerticalIcon className="h-5 w-5" />
          </div>
          <div className={`p-2 rounded-lg ${item.allocationType === 'department' ? 'bg-blue-50 text-blue-600' : item.allocationType === 'card' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'}`}>
            {item.allocationType === 'department' ? (
              <BuildingIcon className="h-4 w-4" />
            ) : item.allocationType === 'card' ? (
              <CreditCardIcon className="h-4 w-4" />
            ) : (
              <WalletIcon className="h-4 w-4" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">
              <Link href={`/corporate_admin/budget/${item.id}`} className="hover:text-emerald-700 transition">
                {item.name}
              </Link>
            </h4>
            <p className="text-xs text-slate-500 uppercase tracking-wider">{item.allocationType}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-slate-900">RWF {item.allocated.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Allocated Budget</p>
        </div>
      </div>
      
      <div className="space-y-1.5 pl-8 pr-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-600">Spent: RWF {item.spent.toLocaleString()}</span>
          <span className={`${isNearCeiling ? 'text-red-600 font-semibold flex items-center gap-1' : 'text-slate-600'}`}>
            {isNearCeiling && <AlertTriangleIcon className="h-3 w-3" />}
            {progressPercentage.toFixed(1)}% Used
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div 
            className={`h-full ${isNearCeiling ? 'bg-red-500' : 'bg-slate-900'}`} 
            style={{ width: `${Math.min(progressPercentage, 100)}%` }} 
          />
        </div>
      </div>
      
      {/* Slider for reallocating directly within the card */}
      <div className="pl-8 pr-2 pt-2">
        <p className="text-xs font-medium text-slate-500 mb-2">Adjust Allocation Limit</p>
        <Slider defaultValue={[item.allocated]} max={5000000} step={100000} className="w-full" />
      </div>
    </div>
  )
}

export function BudgetAllocations() {
  const [items, setItems] = useState<Budget[]>(() => getBudgets())

  useEffect(() => {
    const unsubscribe = subscribeBudgets(() => setItems(getBudgets()))
    return unsubscribe
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const totalAllocated = items.reduce((acc, item) => acc + item.allocated, 0)
  const totalSpent = items.reduce((acc, item) => acc + item.spent, 0)
  const corporateFloat = 8400000
  const availableFloat = corporateFloat - totalAllocated

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-100 rounded-xl text-slate-700">
            <WalletIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Corporate Float</p>
            <p className="text-2xl font-bold text-slate-900">RWF {corporateFloat.toLocaleString()}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <BuildingIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Allocated</p>
            <p className="text-2xl font-bold text-slate-900">RWF {totalAllocated.toLocaleString()}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CreditCardIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Unallocated Balance</p>
            <p className="text-2xl font-bold text-emerald-600">RWF {availableFloat.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Budget Hierarchy</h3>
            <p className="text-sm text-slate-500">Drag to reorder hierarchy or adjust sliders to reallocate budget.</p>
          </div>
          <Button variant="outline" onClick={() => alert("Layout saved successfully!")}>Save Layout</Button>
        </div>
        
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="max-w-3xl">
              {items.map(item => <SortableBudgetItem key={item.id} item={item} />)}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
