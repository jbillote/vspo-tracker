'use server'

import { AppSidebar } from "@/components/appSidebar"
import { SiteHeader } from "@/components/siteHeader"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { API } from 'libs'
import "./globals.css"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: streamers, error } = await API.api.v1.streamers.get()

  if (error) {
    throw new Error()
  }

  return (
    <html lang="en" className="dark">
      <body>
        <div className="[--header-height:calc(theme(spacing.14))]">
          <SidebarProvider className="flex flex-col">
            <SiteHeader />
            <div className="flex flex-1">
              <AppSidebar streamers={streamers!} />
              <SidebarInset>
                {children}
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  )
}
