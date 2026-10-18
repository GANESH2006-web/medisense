// Disease.jsx
"use client";

import { useEffect, useState } from "react";
import Embedding from "@/components/Backend/Embedding.jsx";
import LLM from "@/components/Backend/llm.jsx";
import { getFormData, subscribeToFormData } from "@/components/Backend/formDataStore.js";
import DiseaseAnalysisGrid from "./DiseaseAnalysisGrid";
import YouTubeVideos from "@/components/Backend/YouTubeVideos.jsx";

export function Disease() {
    const [patientData, setPatientData] = useState(getFormData());
    const [source, setSource] = useState(null);
    const [llmResponse, setLlmResponse] = useState(null);

    // Subscribe to patient data changes.
    useEffect(() => {
        const unsubscribe = subscribeToFormData(setPatientData);
        return () => unsubscribe();
    }, []);

    if (!patientData) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center">
                <a
                    href="#"
                    className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        Something went wrong
                    </h5>
                    <div className="text-gray-700 dark:text-gray-400">
                        Please fill the form.
                    </div>
                </a>
            </div>
        );
    }

    // Complete prompt for disease analysis.
    const diseasePrompt = `You are a medical analysis assistant. Your task is to analyze patient data, including their symptoms and provided medical literature, and generate a detailed diagnosis along with contextual explanations.
Follow clinical guidelines and reference the provided source to supply additional background information on the disease, its possible causes, and treatment recommendations.
Return your response in a JSON format with the following keys:
{
  "disease": {"name": string, "stage": string, "likelihood": number, "explanation": string},
  "symptoms": [{"name": string, "likelihood": number, "severity": string, "duration": string, "explanation": string}],
  "affected_organs": [{"name": string, "percentage": number, "impact": string, "explanation": string}],
  "precautions": [{"action": string, "priority": string, "rationale": string}],
  "causes": [{"factor": string, "confidence": number, "evidence": string}],
  "references": [{"source": string, "section": string, "relevance": string}],
  "disclaimer": string
}
Ensure if the filed symptoms  are nan or empty don't show disease return empty symptoms field
Ensure that each section is detailed and evidence-based. Do not include sensitive source identifiers.
In the disclaimer, include a recommendation on which specialist to consult `;

    return (

        <div className="p-6 bg-slate-50 min-h-screen dark:bg-slate-950">
            <h1 className="text-3xl text-teal-500 font-bold mb-6 dark:text-c1">
                Disease Prediction Analysis
            </h1>

            {!source && (
                <div className="mb-4">
                    <Embedding
                        sentence={patientData.symptoms}
                        onSourceReady={(qdrantResult) => setSource(qdrantResult)}
                        Url={'/qdrant/collections/Harrison_manual_of_medicine/points/search'}
                    />
                </div>
            )}

            {source && !llmResponse && (
                <div className="mb-4">
                    <LLM
                        patientdata={JSON.stringify(patientData, null, 2)}
                        source={JSON.stringify(source, null, 2)}
                        onResponseReady={(response) => setLlmResponse(response)}
                        prompt={diseasePrompt}
                    />
                </div>
            )}

            {llmResponse && <DiseaseAnalysisGrid llmResponse={llmResponse} />}
            {llmResponse && <YouTubeVideos content={llmResponse?.disease?.name} />}
        </div>
    );
}

export default Disease;
