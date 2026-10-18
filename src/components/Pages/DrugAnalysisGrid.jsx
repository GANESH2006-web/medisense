"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PropTypes from "prop-types";

export function DrugAnalysisGrid({ llmResponse = {}, selectedOption }) {
    let content;
    if (selectedOption === "diet") {
        content = llmResponse?.diet;
    } else if (selectedOption === "drugInfo") {
        content = llmResponse?.drugInfo;
    } else if (selectedOption === "sideEffects") {
        content = llmResponse?.sideEffects;
    }

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-950">
            <h2 className="text-2xl font-bold mb-4 dark:text-blue-400">
                Analysis - {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
            </h2>
            <Card className="rounded-3xl bg-teal-50 dark:text-blue-400">
                <CardHeader>
                    <CardTitle>{selectedOption.toUpperCase()}</CardTitle>
                </CardHeader>
                <CardContent>
                    {content ? (
                        typeof content === "string" ? (
                            <p>{content}</p>
                        ) : Array.isArray(content) ? (
                            content.map((item, index) => (
                                <div key={index} className="mb-2">
                                    {Object.entries(item).map(([key, value]) => (
                                        <p key={key}>
                                            <strong>{key}:</strong> {value}
                                        </p>
                                    ))}
                                </div>
                            ))
                        ) : (
                            Object.entries(content).map(([key, value]) => (
                                <p key={key}>
                                    <strong>{key}:</strong> {value}
                                </p>
                            ))
                        )
                    ) : (
                        <p>No data available.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

DrugAnalysisGrid.propTypes = {
    llmResponse: PropTypes.object.isRequired,
    selectedOption: PropTypes.oneOf(["diet", "drugInfo", "sideEffects"]).isRequired,
};

export default DrugAnalysisGrid;
