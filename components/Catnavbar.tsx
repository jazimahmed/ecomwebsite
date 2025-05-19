'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function Catnavbar() {
  const router = useRouter()

  const handleSelect = (value: string) => {
    router.push(`/?category=${value}`)
  }

  return (
    <div className="hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            
            variant="outline"
            className="flex items-center gap-2 bg-blue-300 h-10 w-35 text-lg text-gray-700 hover:bg-blue-400"
          >
            Categories <ChevronDown size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handleSelect("beauty")}>
            beauty
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("fashion")}>
            Fashion
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("smartphones")}>
            Smartphones
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
