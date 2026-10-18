// src/components/Pages/Nav.jsx
import React from "react";
import { AppSidebar } from "@/components/app-sidebar"; // Adjust path if necessary
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {Toaster} from "sonner";

export default function NavPage({ children }) {
    return (

    <SidebarProvider className="bg-slate-800 w-[97%] h-auto mx-5 rounded-b-3xl mb-6 fixed dark:bg-stone-900">
            <AppSidebar />
            <SidebarInset>
                {children}
                <Toaster
                    position="top-center"
                    expand={false}
                    toastOptions={{
                        classNames: {
                            toast: '!bg-background !text-foreground !border',
                            title: '!font-medium',
                            description: '!text-muted-foreground'
                        }
                    }}
                />
            </SidebarInset>
        </SidebarProvider>
    );
}
