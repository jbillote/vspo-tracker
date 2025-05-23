'use client'

import { SidebarIcon } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'

export function SiteHeader() {
    // TODO: Look into switching <BreadcrumbLink> to <Link> to prevent layout rerendering
    const { toggleSidebar } = useSidebar()

    return (
        <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
                <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <SidebarIcon />
                </Button>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">VSPO! Tracker</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
            </div>
        </header>
    )
}
