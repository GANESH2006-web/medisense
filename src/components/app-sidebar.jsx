import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@/components/ui/Avatar.jsx"
import { useEffect, useState } from 'react';
import {auth} from  "@/components/Authentication/firebaseConfig.js"
// Define icons as components
const HomeIcon = () => (
    <svg className="fill-white " xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="">
        <path
            d="M226.67-186.67h140v-246.66h226.66v246.66h140v-380L480-756.67l-253.33 190v380ZM160-120v-480l320-240 320 240v480H526.67v-246.67h-93.34V-120H160Zm320-352Z"/>
    </svg>
);

const DiseaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
        <path
            d="M80-580v-153.33q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33v246.66h-66.67v-246.66H146.67V-580H80Zm200 293.33q-9.67 0-17.67-4.5-8-4.5-13-13.5l-70.33-142H80v-66.66h120q8.87 0 16.94 4.83 8.06 4.83 12.39 13.83l50.67 100 130-260q4.33-8.66 12.59-12.66 8.25-4 17.33-4 9.08 0 17.41 4 8.34 4 12.67 12.66l75.67 152q-14.67 9-28.17 20-13.5 11-25.5 23.34l-52-105.34-130.67 260q-4.07 9-12.22 13.5t-17.11 4.5ZM449.67-160h-303q-27 0-46.84-19.83Q80-199.67 80-226.67V-380h66.67v153.33h279q3.66 17.67 9.66 34.34 6 16.66 14.34 32.33ZM480-480ZM679.93-86.67q-80.26 0-136.76-56.57-56.5-56.57-56.5-136.83 0-80.26 56.57-136.76 56.57-56.5 136.83-56.5 80.26 0 136.76 56.57 56.5 56.57 56.5 136.83 0 80.26-56.57 136.76-56.57 56.5-136.83 56.5ZM688-260l91-91-28-28-91 91 28 28Z"/>
    </svg>
);

const DrugIcon = () => (
    <svg className="fill-white " xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px"
         fill="">
        <path
            d="m311.43-57.37-62.86-46.91v-183.09h-55.94q-26.63 0-45.95-19.31-19.31-19.32-19.31-45.95v-314.74h-10q-13.47-.48-22.45-9.87-8.99-9.39-8.99-22.94 0-14.02 9.35-23.23 9.34-9.22 23.29-9.22h130v-85.94H220q-13.95 0-23.29-9.51t-9.34-23.53q0-14.02 9.34-23.24 9.34-9.22 23.29-9.22h120q13.95 0 23.29 9.4 9.34 9.39 9.34 23.41t-9.34 23.36q-9.34 9.33-23.29 9.33h-28.57v85.94h130q13.95 0 23.29 9.39 9.35 9.4 9.35 23.42 0 13.54-8.99 22.75-8.98 9.22-22.45 9.7h-10v314.74q0 26.63-19.31 45.95-19.32 19.31-45.95 19.31h-55.94v230Zm-118.8-295.26h174.74v-75.94H290q-8.72 0-15.08-6.35-6.35-6.36-6.35-15.08 0-8.72 6.35-15.08 6.36-6.35 15.08-6.35h77.37v-77.14H290q-8.72 0-15.08-6.35-6.35-6.36-6.35-15.08 0-8.72 6.35-15.08 6.36-6.35 15.08-6.35h77.37v-75.94H192.63v314.74Zm408.8 276.7q-26.63 0-46.06-19.44-19.44-19.43-19.44-46.06V-406q0-32.24 8-49.22 8-16.98 21.24-30.74 21.4-21.19 27.4-32.07 6-10.88 6-23.4v-30h-10q-13.47-.48-22.34-9.88-8.86-9.39-8.86-22.93 0-14.02 9.72-23.36 9.71-9.33 22.91-9.33h200q13.95 0 23.29 9.51t9.34 23.53q0 13.54-8.86 22.76-8.87 9.22-22.34 9.7h-10v30q0 11.52 7.5 24.4 7.5 12.88 28.9 34.07 13.47 13.76 19.85 29.24 6.39 15.48 6.39 47.72v264.57q0 26.63-19.44 46.06-19.43 19.44-46.06 19.44H601.43Zm0-305.5h177.14V-406q0-17.52-9.89-31.64-9.88-14.12-21.64-28.4-15.24-19.24-21.86-34.64-6.61-15.41-6.61-37.89v-32.86h-57.14v32.86q0 21.24-6.11 36.77-6.12 15.52-21.36 34.76-11.53 14.52-22.03 28.9-10.5 14.38-10.5 32.14v24.57Zm0 120h177.14v-77.14H601.43v77.14Zm0 120h177.14v-77.14H601.43v77.14Zm0-120h177.14-177.14Z"/>
    </svg>
);

const DoctorIcon = () => (
    <svg className="fill-white " xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="">
        <path
            d="M543.11-70.24q-116.07 0-192.7-81.34t-76.63-194.7v-31.18q-88.58-12.19-148.36-79.3-59.77-67.1-59.77-158.26v-234.07h126.46v-41.67h68.37v151.72h-68.37v-41.68h-58.09v165.38q0 72.27 50.34 122.13t122.42 49.86q72.09 0 122.53-49.86 50.45-49.86 50.45-122.13v-165.38h-58.33v41.68H353.3v-151.72h68.13v41.67h126.46v234.07q0 90.69-59.17 157.67-59.18 66.98-146.81 79.42v31.65q0 85.42 56.87 146.54 56.87 61.13 144.4 61.13 81.65 0 141.27-60.63 59.62-60.63 59.62-147.28v-75.09q-35.96-11.19-59.06-41.52-23.1-30.33-23.1-69.75 0-48.42 33.84-82.31 33.85-33.9 82.38-33.9 48.53 0 82.37 33.9 33.85 33.89 33.85 82.31 0 39.42-23.1 69.75t-59.05 41.52v75.33q0 115.17-79.02 195.61-79.01 80.43-190.07 80.43Zm234.85-413.11q20.93 0 35.31-14.2 14.38-14.21 14.38-35.14 0-20.94-14.2-35.32-14.21-14.38-35.14-14.38-20.94 0-35.32 14.2-14.38 14.21-14.38 35.14 0 20.94 14.2 35.32 14.21 14.38 35.15 14.38Zm.17-49.52Z"/>
    </svg>
);

// Define data object separately
const data = {
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            items: [
                {title: "Home", url: "/", icon: <HomeIcon/>},
                {title: "Disease Analysis", url: "/DiseasePrediction", icon: <DiseaseIcon/>},
                {title: "Drug Recommender", url: "/DrugRecomendation", icon: <DrugIcon/>},
                {title: "Doctor Locator", url: "/DoctorLocator", icon: <DoctorIcon/>},
            ],
        },
    ],
};

export function AppSidebar({...props}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser({
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid
                });
                console.log(currentUser.photoURL);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);
    function handleSignout(){
        try {
            auth.signOut();
            setUser(null);
        }
        catch(error) {
            console.log(error);
        }


    }
    return (
        <Sidebar {...props} className="h-auto rounded-b-3xl bg-teal-500  dark:bg-stone-950  ">
            <SidebarHeader className="p-6"></SidebarHeader>
            <SidebarContent className="h-16">
                {data.navMain.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="mb-5 text-2xl text-white dark:text-white font-playwrite">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem className="rounded-xl p-2 my-1" key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive} className="hover:border-2 hover:text-white hover:bg-neutral-900 hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-25 hover:rounded-2xl hover:h-12
                                                                                                       dark:hover:bg-gray-100 dark:hover:backdrop-filter dark:hover:backdrop-blur-lg dark:hover:bg-opacity-25 ">
                                            <a href={item.url} className="mr-auto flex items-center space-x-2 text-white dark:text-white">
                                                <div className="p-1 ">{item.icon}</div>
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="p-6 flex flex-row flex-wrap ">

                {user?.photoURL && (
                    <Avatar  >
                        <AvatarImage src={user.photoURL} alt={user.displayName || "User avatar"} />

                    </Avatar>

                )}

                <button className="text-slate-50 w-auto h-4 ml-5 justify-self-end self-stretch " onClick={handleSignout}  >Login out </button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
