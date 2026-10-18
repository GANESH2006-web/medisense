


"use client";

import { useState } from "react";
import Embedding from "@/components/Backend/Embedding.jsx";
import LLM from "@/components/Backend/llm.jsx";
import DrugAnalysisGrid from "./DrugAnalysisGrid";
import YouTubeVideos from "@/components/Backend/YouTubeVideos.jsx";

export function Drug() {
    const [formData, setFormData] = useState({ disease: "", medication: "" });
    const [submitted, setSubmitted] = useState(false);
    const [source, setSource] = useState(null);
    const [llmResponse, setLlmResponse] = useState(null);
    const [selectedOption, setSelectedOption] = useState("diet");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    // Build the drug query from the form data.
    const drugQuery = `${formData.disease} ${formData.medication}`.trim();

    // Detailed prompt for drug recommendation analysis.
    const drugPrompt = `You are a pharmaceutical expert. Your task is to analyze the provided drug query along with relevant pharmacology literature, and generate comprehensive recommendations in three sections:
1. "diet": Provide a weekly diet plan that supports the prescribed drug therapy, including nutritional recommendations.
2. "drugInfo": Provide detailed information on the recommended drug, including its name, dosage, mechanism of action, and administration guidelines.
3. "sideEffects": List potential side effects, detailing severity, frequency, and recommended precautions.
Additionally, include a disclaimer advising consultation with the appropriate specialist if necessary.
Return your response in a JSON format with the following keys:
{
  "diet": {"plan": string, "explanation": string},
  "drugInfo": {"name": string, "dosage": string, "mechanism": string, "administration": string, "explanation": string},
  "sideEffects": [{"name": string, "severity": string, "frequency": string, "explanation": string}],
  "disclaimer": string
}
Ensure that each section is detailed, evidence-based, and does not include sensitive source identifiers.`;

    // Calculate YouTube query based on LLM response and selected option.
    const ytQuery = (() => {
        if (!llmResponse || !llmResponse.drugInfo?.name) return "";
        const drugName = llmResponse.drugInfo.name;
        if (selectedOption === "diet") return `${drugName} diet plan`;
        if (selectedOption === "drugInfo") return drugName;
        if (selectedOption === "sideEffects") return `${drugName} side effects`;
        return drugName;
    })();

    return (
        <div className="flex flex-col items-center min-h-screen bg-slate-100 text-slate-900 p-6 dark:bg-slate-950">
            <h2 className="text-3xl font-extrabold text-teal-400 my-10 dark:text-blue-400">
                Drug Recommendation
            </h2>

            {/* Form Section */}
            {!submitted && (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-row flex-wrap justify-center items-center gap-6 w-full max-w-5xl bg-teal-50 p-6 rounded-2xl shadow-lg dark:bg-blue-300"
                >
                    <div className="flex flex-col">
                        <label className="text-slate-900 font-medium mb-1">Disease:</label>
                        <input
                            type="text"
                            name="disease"
                            placeholder="Enter disease name"
                            value={formData.disease}
                            onChange={handleChange}
                            className="dark:text-c1 bg-white border border-teal-400 rounded-xl p-2 w-64 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-blue-900 dark:bg-slate-950 dark:focus:ring-blue-900"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-slate-900 font-medium mb-1">Medication (Optional):</label>
                        <input
                            type="text"
                            name="medication"
                            placeholder="Enter drug name (if known)"
                            value={formData.medication}
                            onChange={handleChange}
                            className="dark:text-c1 bg-white border border-teal-400 rounded-xl p-2 w-64 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-blue-900 dark:bg-slate-950 dark:focus:ring-blue-900"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-teal-400 text-white font-bold py-2 px-6 rounded-xl hover:bg-teal-500 transition dark:bg-blue-500 dark:text-slate-900 dark:hover:bg-blue-400"
                    >
                        Get Recommendations
                    </button>
                </form>
            )}

            {/* After submission */}
            {submitted && (
                <>
                    {/* Radio Buttons */}
                    <div className="flex flex-row space-x-4 mb-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                value="diet"
                                checked={selectedOption === "diet"}
                                onChange={() => setSelectedOption("diet")}
                                className="hidden"
                            />
                            <span
                                className={`px-4 py-2 rounded-2xl transition ${
                                    selectedOption === "diet"
                                        ? "bg-teal-400 text-white dark:bg-blue-400 dark:text-slate-900"
                                        : "bg-white text-slate-900 border border-teal-400 dark:border-blue-700 dark:bg-slate-950 dark:text-blue-400"
                                }`}
                            >
                🍏 Weekly Diet
              </span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                value="drugInfo"
                                checked={selectedOption === "drugInfo"}
                                onChange={() => setSelectedOption("drugInfo")}
                                className="hidden"
                            />
                            <span
                                className={`px-4 py-2 rounded-2xl transition ${
                                    selectedOption === "drugInfo"
                                        ? "bg-teal-400 text-white dark:bg-blue-400 dark:text-slate-900"
                                        : "bg-white text-slate-900 border border-teal-400 dark:border-blue-700 dark:bg-slate-950 dark:text-blue-400"
                                }`}
                            >
                💊 Drug Info
              </span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                value="sideEffects"
                                checked={selectedOption === "sideEffects"}
                                onChange={() => setSelectedOption("sideEffects")}
                                className="hidden"
                            />
                            <span
                                className={`px-4 py-2 rounded-2xl transition ${
                                    selectedOption === "sideEffects"
                                        ? "bg-teal-400 text-white dark:bg-blue-400 dark:text-slate-900"
                                        : "bg-white text-slate-900 border border-teal-400 dark:border-blue-700 dark:bg-slate-950 dark:text-blue-400"
                                }`}
                            >
                ⚠️ Drug Side Effects
              </span>
                        </label>
                    </div>

                    {/* Embedding & LLM Call */}
                    {!source && (
                        <div className="mb-4">
                            <Embedding
                                sentence={drugQuery}
                                onSourceReady={(qdrantResult) => setSource(qdrantResult)}
                                Url={'/qdrant/collections/Essentials_of_MedicalPharmacology/points/search'}
                            />
                        </div>
                    )}
                    {source && !llmResponse && (
                        <div className="mb-4">
                            <LLM
                                patientdata={JSON.stringify(formData, null, 2)}
                                source={JSON.stringify(source, null, 2)}
                                onResponseReady={(response) => setLlmResponse(response)}
                                prompt={drugPrompt}
                            />
                        </div>
                    )}


                    {llmResponse && (
                        <>
                            <DrugAnalysisGrid llmResponse={llmResponse} selectedOption={selectedOption} />
                            <YouTubeVideos content={ytQuery} />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Drug;
