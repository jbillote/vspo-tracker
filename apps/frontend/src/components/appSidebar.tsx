'use server'

import { ChevronRight, House } from 'lucide-react'
import Link from 'next/link'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'

type sidebarProps = {
    name: string,
    branches: {
        name: string,
        members: {
            name: string
        }[]
    }[]
}

export async function AppSidebar({ streamers }: { streamers: sidebarProps[] }) {
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
                {streamers.map((org) => (
                    <SidebarGroup key={org.name}>
                        <SidebarGroupLabel>{org.name}</SidebarGroupLabel>
                        {org.branches.map((branch) => (
                            <SidebarMenu key={branch.name}>
                                <Collapsible asChild defaultOpen={true}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild tooltip={branch.name}>
                                            <Link href="#">
                                                <span>{branch.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                        {branch.members.length ? (
                                            <>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                        <ChevronRight />
                                                        <span className="sr-only">Toggle</span>
                                                    </SidebarMenuAction>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {branch.members.map((member) => (
                                                            <SidebarMenuSubItem key={member.name}>
                                                                <SidebarMenuSubButton asChild>
                                                                    <Link href={`/${member.name}`}>
                                                                        <span>{member.name}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </>
                                        ) : null}
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenu>
                        ))}
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    )
}
