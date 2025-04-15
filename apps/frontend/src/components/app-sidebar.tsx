'use server'

import { api } from 'libs'
import { House } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

export async function AppSidebar() {
    // TODO: Error handling
    const { data, error} = await api.api.streamers.get()

    return (
        <Sidebar className="top-(--header-height) !h-[calc(100svh-var(--header-height))]">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuButton size="lg" asChild>
                        <a href="/">
                            <div className="flex aspect-square size-8 items-center justify-center  rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <House className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-bold">Home</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Members</SidebarGroupLabel>
                    <SidebarMenu>
                        {data?.streamers.map((streamer) => (
                            <SidebarMenuItem key={streamer}>
                                <SidebarMenuButton asChild>
                                    <a href={`/streamer/${streamer}`} title={streamer}>
                                        <span>{streamer}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    )
}
