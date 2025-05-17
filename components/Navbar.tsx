import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, ChevronDown, Search } from "lucide-react"
import Link from "next/link"
import Searchbox from "./Searchbox"
import LogoutButton from "./LogoutButton"
import AvatarCom from "./AvatarCom"
import Catnavbar from "./Catnavbar"
import Cartbutton from "./Cartbutton"
type Props = {
  search?: string;
  session?: boolean
};


const Navbar = ({ search, session }: Props) => {

  
  
  
  
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-blue-300 shadow-sm text-lg w-full z-[9999]">
      
      
      <Link href={'/'}>
        <div className="flex items-center gap-3">
          <img
            src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
            alt="Logo"
            className="h-10 w-10"
          />
          <span className="text-2xl font-bold">EComStore</span>
        </div>
      </Link>

      <Catnavbar/>

      <Searchbox searchParam={search}/>


      
      <div className="flex items-center gap-6">

        
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 px-4 py-2 text-base bg-blue-300 hover:bg-blue-400 ">
              USD <ChevronDown className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>USD</DropdownMenuItem>
            <DropdownMenuItem>EUR</DropdownMenuItem>
            <DropdownMenuItem>LKR</DropdownMenuItem>
            <DropdownMenuItem>INR</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Cart Icon */}
        <Cartbutton session={session}/>

        {/* Profile Links */}
        {!session ? (
          <div className="flex items-center gap-2 text-base">
            <User className="h-5 w-5" />
            <a href="/auth/login" className="hover:underline">Login</a> /
            <a href="/auth/register" className="hover:underline">Register</a>
          </div>
        ) : (
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <AvatarCom />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">Go to Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )}
       


        
      </div>
    </nav>
  )
}

export default Navbar


