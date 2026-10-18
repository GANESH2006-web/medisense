import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./login-form";
import Logo from "@/assets/Logo";
import {Toaster} from "sonner";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Logo Section */}

            <div className="w-1/2 bg-c1 flex items-center justify-center">
                <Logo className="w-full h-full" />
            </div>

            {/* Login Form Section */}
            <div className="w-1/2 flex flex-col gap-4 p-6 md:p-10 bg-c1 ">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Medi.Ai
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
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
                    </div>
                </div>
            </div>
        </div>
    );
}
