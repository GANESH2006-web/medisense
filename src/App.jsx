// src/App.jsx
import React from "react";
import Hero from "@/components/Hero.jsx";
import Form from "@/components/ui/Form.jsx";


export default function App() {



    return (
        <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
            <section className="relative w-full h-screen snap-start ">
                <Hero  />

            </section>

            <section className="relative w-full h-full snap-end flex">
                {/* Left half with background image */}
                <div className="w-1/2 h-full bg-[url(./assets/img1.jpg)] bg-contain bg-repeat-round  dark:bg-[url(./assets/img2.jpg)]"></div>

                <div className="w-1/2 h-full flex items-center justify-center bg-teal-400 dark:bg-c4 ">
                    <Form />
                </div>
            </section>
        </div>
    );
}
