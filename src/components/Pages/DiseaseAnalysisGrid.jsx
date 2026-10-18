"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function DiseaseAnalysisGrid({ llmResponse = {} }) {
    const [selectedCard, setSelectedCard] = useState(null)

    // Define each section with a title and a render function.
    const categories = [
        {
            key: "disease",
            title: "Disease",
            render: () => {
                const disease = llmResponse?.disease
                if (!disease) return <p>No data available.</p>
                return (
                    <div className="space-y-1">
                        <p>
                            <strong>Name:</strong> {disease.name}
                        </p>
                        <p>
                            <strong>Stage:</strong> {disease.stage}
                        </p>
                        <p>
                            <strong>Likelihood:</strong> {Math.round((disease.likelihood || 0) * 100)}%
                        </p>
                        <p>
                            <strong>Explanation:</strong> {disease.explanation}
                        </p>
                    </div>
                )
            },
        },
        {
            key: "symptoms",
            title: "Symptoms",
            render: () => {
                const symptoms = llmResponse?.symptoms
                if (!symptoms || !symptoms.length) return <p>No data available.</p>
                return (
                    <ul className="space-y-2 ">
                        {symptoms.map((symptom, index) => (
                            <li key={index} className="p-2">
                                <p>
                                    <strong>Name:</strong> {symptom.name}
                                </p>
                                <p>
                                    <strong>Likelihood:</strong> {Math.round((symptom.likelihood || 0) * 100)}%
                                </p>
                                <p>
                                    <strong>Severity:</strong> {symptom.severity}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {symptom.duration}
                                </p>
                                <p>
                                    <strong>Explanation:</strong> {symptom.explanation}
                                </p>
                            </li>
                        ))}
                    </ul>
                )
            },
        },
        {
            key: "affected_organs",
            title: "Affected Organs",
            render: () => {
                const organs = llmResponse?.affected_organs
                if (!organs || !organs.length) return <p>No data available.</p>
                return (
                    <ul className="space-y-2">
                        {organs.map((organ, index) => (
                            <li key={index} className="p-2">
                                <p>
                                    <strong>Name:</strong> {organ.name}
                                </p>
                                <p>
                                    <strong>Percentage:</strong> {organ.percentage}%
                                </p>
                                <p>
                                    <strong>Impact:</strong> {organ.impact}
                                </p>
                                <p>
                                    <strong>Explanation:</strong> {organ.explanation}
                                </p>
                            </li>
                        ))}
                    </ul>
                )
            },
        },
        {
            key: "precautions",
            title: "Precautions",
            render: () => {
                const precautions = llmResponse?.precautions
                if (!precautions || !precautions.length) return <p>No data available.</p>
                return (
                    <ul className="space-y-2">
                        {precautions.map((precaution, index) => (
                            <li key={index} className="p-2">
                                <p>
                                    <strong>Action:</strong> {precaution.action}
                                </p>
                                <p>
                                    <strong>Priority:</strong> {precaution.priority}
                                </p>
                                <p>
                                    <strong>Rationale:</strong> {precaution.rationale}
                                </p>
                            </li>
                        ))}
                    </ul>
                )
            },
        },
        {
            key: "causes",
            title: "Causes",
            render: () => {
                const causes = llmResponse?.causes
                if (!causes || !causes.length) return <p>No data available.</p>
                return (
                    <ul className="space-y-2">
                        {causes.map((cause, index) => (
                            <li key={index} className="p-2">
                                <p>
                                    <strong>Factor:</strong> {cause.factor}
                                </p>
                                <p>
                                    <strong>Confidence:</strong> {Math.round((cause.confidence || 0) * 100)}%
                                </p>
                                <p>
                                    <strong>Evidence:</strong> {cause.evidence}
                                </p>
                            </li>
                        ))}
                    </ul>
                )
            },
        },
        {
            key: "references",
            title: "References",
            render: () => {
                const references = llmResponse?.references
                if (!references || !references.length) return <p>No data available.</p>
                return (
                    <ul className="space-y-2">
                        {references.map((ref, index) => (
                            <li key={index} className="p-2">
                                <p>
                                    <strong>Source:</strong> {ref.source}
                                </p>
                                <p>
                                    <strong>Section:</strong> {ref.section}
                                </p>
                                <p>
                                    <strong>Relevance:</strong> {ref.relevance}
                                </p>
                            </li>
                        ))}
                    </ul>
                )
            },
        },
        {
            key: "disclaimer",
            title: "Disclaimer",
            render: () => {
                return <p>{llmResponse?.disclaimer || "No disclaimer available."}</p>
            },
        },
    ]

    return (
        <div className="p-6 bg-slate-50 min-h-screen dark:bg-slate-950">
            <h2 className="text-2xl font-bold mb-4 dark:text-c1">Medical Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                    const isSelected = selectedCard === category.key

                    // Set custom column spans:
                    // - "disease": always spans 2 columns
                    // - "disclaimer": always spans 2 columns, but with a smaller fixed height.
                    // - Others: use default behavior (expand if selected)
                    let colSpanClass = ""
                    if (category.key === "disease") {
                        colSpanClass = "col-span-2"
                    } else if (category.key === "disclaimer") {
                        colSpanClass = "col-span-2"
                    } else {
                        colSpanClass = isSelected ? "col-span-4 lg:col-span-3" : ""
                    }

                    // Set custom height classes for card content:
                    // - "disclaimer" remains small regardless of selection.
                    const contentHeightClass =
                        category.key === "disclaimer"
                            ? "h-20 overflow-hidden"
                            : isSelected
                                ? "h-auto"
                                : "h-32 overflow-hidden"

                    return (
                        <Card
                            key={category.key}
                            onClick={() => setSelectedCard(isSelected ? null : category.key)}
                            className={`bg-teal-50 cursor-pointer transition-all duration-100 ease delay-100 rounded-3xl dark:text-blue-400 dark:bg-slate-800 dark:border-blue-700 ${colSpanClass}`}
                        >
                            <CardHeader>
                                <CardTitle className="dark:text-c1">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent className={contentHeightClass}>
                                {category.render()}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default DiseaseAnalysisGrid
