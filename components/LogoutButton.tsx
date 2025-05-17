"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="flex items-center gap-1 text-base w-30 "
      variant='default'
    >
      <LogOut className="h-5 w-5" />
      <label className="text-sm">Logout</label>
    </Button>
  );
}
