import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "./user-nav"
import Form from "./FormSignOut"
import { Button } from "@/components/ui/button"
import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";


export async function SiteHeader() {
  const authRequest = auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <UserNav />
            <Form action="/api/auth/logut">
              <Button size="sm" className={(user) ? "ml-2" : "hidden"}>Logout</Button>
            </Form>
          </nav>
        </div>
      </div>
    </header>
  )
}