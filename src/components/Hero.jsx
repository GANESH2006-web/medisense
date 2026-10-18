// src/components/Hero.jsx
import React from "react";
import hero from "@/assets/hero.mp4";


export default function Hero() {
    return (
        <div className="relative w-full h-full ">
            {/* Background image */}
            <video
                className="w-full h-full  shadow-xl object-cover"
                autoPlay
                muted
                playsInline
                onError={() => console.error("Video failed to load.")}
            >
                <source src={hero} type="video/mp4" />
            </video>
                <div
                    className="absolute inset-0 bg-white bg-opacity-0  flex flex-col items-center justify-start bottom-2/4 dark:bg-gray-500 dark:bg-opacity-60">
                    <h1 className="text-6xl font-bold text-slate-50  mt-20  dark:text-slate-950">
                        Your Health, Empowered by AI
                    </h1>
                    <h2 className="mt-4 text-2xl font-medium text-white  dark:text-slate-950">
                        Predict diseases and receive personalized drug recommendations with Medisense.
                    </h2>

                </div>

        </div>
);
}
