import { useState, useEffect } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({
    url: 'https://api.groq.com/openai/v1/chat/completions',
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

function LLM({ patientdata, source, onResponseReady, prompt }) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const systemInstruction = prompt;

    useEffect(() => {
        const fetchLLMResponse = async () => {
            if (!patientdata || !source || !systemInstruction) {
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const messages = [
                    { role: "system", content: systemInstruction },
                    {
                        role: "user",
                        content: `Patient Data:\n${patientdata}\n\nMedical Literature (source):\n${source}\n\nProvide a detailed diagnosis in JSON format.`
                    }
                ];

                const chatCompletion = await groq.chat.completions.create({
                    messages,
                    model: "llama-3.2-90b-vision-preview",
                    temperature: 0.6,
                    max_completion_tokens: 4096,
                    top_p: 0.95,
                    stream: false,
                    response_format: { type: "json_object" },
                    stop: null,
                });

                const completionText = chatCompletion.choices[0]?.message?.content;

                if (completionText) {
                    try {
                        const parsedResponse = JSON.parse(completionText);
                        setResponse(JSON.stringify(parsedResponse, null, 2));
                        if (onResponseReady) onResponseReady(parsedResponse);
                    } catch (err) {
                        console.error('Raw completionText:', completionText);
                        setError(`Error parsing JSON: ${err.message}`);
                        setResponse(completionText);
                    }
                } else {
                    setResponse("No content returned.");
                    setError("No content returned.");
                }
            } catch (err) {
                setError(`Error fetching response: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchLLMResponse();
    }, [patientdata, source, systemInstruction]); // Consider removing onResponseReady if stable.

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>LLM Response</h1>
            {loading && <p>Loading response...</p>}
            {error && (
                <div style={{ color: 'red' }}>
                    <h3>Error:</h3>
                    <pre>{error}</pre>
                </div>
            )}
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{response}</pre>
                </div>
            )}
        </div>
    );
}

export default LLM;
