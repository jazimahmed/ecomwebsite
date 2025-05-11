'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function Catnavbar() {
  return (
    <div className="bg-muted px-6 py-3 flex items-center justify-start gap-30 border-b">
      {/* Category Dropdown Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" variant="outline" className="flex items-center gap-2">
            Categories <ChevronDown size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Electronics</DropdownMenuItem>
          <DropdownMenuItem>Fashion</DropdownMenuItem>
          <DropdownMenuItem>Home & Kitchen</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Individual Category Buttons */}
      <div className="flex  gap-20">
        <Button size="lg" variant="outline">Men</Button>
        <Button size="lg" variant="outline">Women</Button>
        <Button size="lg" variant="outline">Kids</Button>
      </div>
    </div>
  )
}
