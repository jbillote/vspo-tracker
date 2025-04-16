'use server'

import { api } from 'libs'
import { ChevronRight, House } from 'lucide-react'
import Link from 'next/link'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'

export async function AppSidebar() {
    // TODO: Error handling
    const { data, error } = await api.api.streamers.get()

    return (
        <Sidebar className="top-(--header-height) !h-[calc(100svh-var(--header-height))]">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuButton size="lg" asChild>
                        <Link href="/">
                            <div className="flex aspect-square size-8 items-center justify-center  rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <House className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-bold">Home</span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>VSPO!</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible asChild defaultOpen={true}>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="JP">
                                    <Link href="#">
                                        <span>JP</span>
                                    </Link>
                                </SidebarMenuButton>
                                {data?.['VSPO!'].JP.length ? (
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                <ChevronRight />
                                                <span className="sr-only">Toggle</span>
                                            </SidebarMenuAction>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {data?.['VSPO!'].JP.map((streamer) => (
                                                    <SidebarMenuSubItem key={streamer}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={`/${streamer}`}>
                                                                <span>{streamer}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                ): null}
                            </SidebarMenuItem>
                        </Collapsible>
                        <Collapsible asChild defaultOpen={true}>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="EN">
                                    <Link href="#">
                                        <span>EN</span>
                                    </Link>
                                </SidebarMenuButton>
                                {data?.['VSPO!'].EN.length ? (
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                <ChevronRight />
                                                <span className="sr-only">Toggle</span>
                                            </SidebarMenuAction>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {data?.['VSPO!'].EN.map((streamer) => (
                                                    <SidebarMenuSubItem key={streamer}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={`/${streamer}`}>
                                                                <span>{streamer}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                ): null}
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    )
}
