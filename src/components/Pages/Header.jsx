import { Input } from "@/components/ui/input.jsx";
import { useDarkMode } from '@/hooks/DarkModeContext.jsx';
export default function Header() {
    const { darkmode, setDarkMode } = useDarkMode();
    return (
        <>
            <header className="flex flex-nowrap w-[97%] h-[5%] rounded-t-3xl mx-5  mt-4 bg-white p-5 dark:bg-blue-400  ">
                <h1 className="self-center mx-5 text-teal-500 font-playwrite text-2xl capitalize dark:text-black">medisense.ai</h1>
                <div className="relative self-center flex flex-row ml-auto ">
                    <Input
                        className="text-gray-700 text-sm rounded-xl p-4 w-40 h-7 placeholder-teal-500 border border-teal-500 hover:w-80 hover:ease-in-out delay-200 transition-all dark:text-black dark:border-black"
                        placeholder="Search"
                        type="search"
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className=" absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </div>

                <div className="relative ml-auto flex flex-row">
                    <button className="mr-4 self-center" onClick={() => setDarkMode(prev => !prev)}>
                        {darkmode ? (
                                <svg className="w-6 h-6  dark:text-black" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="1.2"
                                          d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                                </svg>):(
                            <svg className="w-6 h-6 fill-teal-500 text-teal-500 size-6" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill=""
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1.2"
                                      d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/>
                            </svg>
                            )}
                    </button>
                </div>
            </header>
        </>
    );
}