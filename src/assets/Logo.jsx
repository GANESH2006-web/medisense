import {useEffect} from "react";


export default function Logo() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/finisher-header.es5.min.js";
        script.type = "text/javascript";
        script.onload = () => {
            new FinisherHeader({
                "count": 5,
                "size": {
                    "min": 158,
                    "max": 469,
                    "pulse": 0.5
                },
                "speed": {
                    "x": {
                        "min": 0.1,
                        "max": 0.5
                    },
                    "y": {
                        "min": 0.1,
                        "max": 0.4
                    }
                },
                colors: {
                    background: "#f2efe7",
                    particles: ["#9acbd0", "#48a6a7", "#2973b2"],
                },
                "blending": "none",
                "opacity": {
                    "center": 0.9,
                    "edge": 0.6
                },
                "skew": -2,
                "shapes": [
                    "c"
                ]
            });
        };
        script.onerror = () => console.error("Failed to load finisher-header script.");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <>
            <div className=" flex w-full h-full  finisher-header ">
                <div className=" flex flex-col    w-full h-full ">
                    <div className="flex flex-col items-center justify-self-center">
                        <svg className="fill-c4 stroke-4 drop-shadow-2xl size-80 " xmlns="http://www.w3.org/2000/svg" width="200"
                             height="200" viewBox="0 0 24 24">
                            <path fill=""
                                  d="M9.615 20.846q-.666 0-1.14-.474Q8 19.897 8 19.23V16H4.77q-.667 0-1.142-.475q-.474-.474-.474-1.14V12.5h5.565l1.854 2.78q.067.105.167.162q.1.058.233.058q.173 0 .304-.094t.192-.26l1.677-5.03l1.427 2.146q.075.106.188.172q.113.066.239.066h5.846v1.885q0 .666-.474 1.14q-.475.475-1.141.475H16v3.23q0 .667-.475 1.142q-.474.474-1.14.474h-4.77Zm1.239-6.961l-1.452-2.166q-.067-.104-.167-.161q-.1-.058-.235-.058H3.154V9.615q0-.666.474-1.14Q4.103 8 4.77 8H8V4.77q0-.667.475-1.142q.474-.474 1.14-.474h4.77q.666 0 1.14.474Q16 4.103 16 4.77V8h3.23q.667 0 1.142.475q.474.474.474 1.14V11.5h-5.59L13.42 8.72q-.064-.098-.18-.16q-.116-.06-.245-.06q-.167 0-.285.094t-.18.26l-1.677 5.03Z"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-center pb-20 ">
                        <h1 className=" text-7xl text-c4 font-playwrite capitalize ">medisense-ai</h1>
                        <h2 className="text-2xl text-c5 font-playwrite  capitalize  ">bridging symptoms to
                            solutions</h2>
                    </div>


                </div>

            </div>
        </>
    )
}