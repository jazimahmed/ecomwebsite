import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, ChevronDown, Search } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      
      {/* Title / Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
          alt="Logo"
          className="h-8"
        />
        <span className="text-xl font-semibold">EComStore</span>
      </div>

      {/* Search Bar */}
      <div className="relative w-1/3 max-w-sm">
        <Input placeholder="Search products..." className="pl-10" />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Currency Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              USD <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>USD</DropdownMenuItem>
            <DropdownMenuItem>EUR</DropdownMenuItem>
            <DropdownMenuItem>LKR</DropdownMenuItem>
            <DropdownMenuItem>INR</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <a href="/auth/login" className="text-sm hover:underline">Login</a> /
          <a href="/auth/register" className="text-sm hover:underline">Register</a>
        </div>

        {/* Cart Button */}
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
