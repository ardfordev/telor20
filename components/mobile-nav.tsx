import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlignLeft } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Icons } from "./icons"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { auth } from "@/auth/lucia"
import { cookies } from "next/headers"

interface MobileNavProps {}

export async function MobileNav() {
  const authRequest = auth.handleRequest({ cookies });
	const { session } = await authRequest.validateUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 md:hidden lg:hidden">
          <Avatar className="h-8 w-8">
            <AlignLeft className="h-8 w-8" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
        </DropdownMenuLabel>
            {siteConfig?.mainNav?.length ? (
              <DropdownMenuGroup className={(session) ? "" : "hidden"}>
                {siteConfig?.mainNav?.map(
                  (item, index) =>
                    item.href && (
                      <DropdownMenuItem key={index}>
                        <Link
                          href={item.href}
                          className="flex items-center space-x-2"
                        >
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                      
                    )
                    )}
              </DropdownMenuGroup>
            ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}