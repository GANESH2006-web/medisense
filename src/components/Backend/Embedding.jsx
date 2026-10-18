// Embedding.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { HfInference } from '@huggingface/inference';
import QdrantSearch from '@/components/Backend/qdrant.jsx';

const Embedding = ({ sentence, onSourceReady, Url }) => {
    const [embedding, setEmbedding] = useState(null);
    const client = new HfInference(import.meta.env.VITE_ACESS_TOKEN);


    useEffect(() => {
        if (!sentence) return;
        const fetchEmbedding = async () => {
            try {
                const result = await client.featureExtraction({
                    model: "sentence-transformers/all-MiniLM-L6-v2",
                    inputs: sentence,
                });
                setEmbedding(result);
                console.log("Embedding vector:", result);
            } catch (error) {
                console.error("Error generating embedding:", error);
            }
        };
        fetchEmbedding();
    }, [sentence]);

    return (
        <>
            {embedding ? (
                <QdrantSearch vector={embedding} onSourceReady={onSourceReady} Url={Url} />
            ) : (
                "Generating embedding..."
            )}
        </>
    );
};

Embedding.propTypes = {
    sentence: PropTypes.string.isRequired,
    onSourceReady: PropTypes.func.isRequired,
    Url: PropTypes.string, // Optional if you want to override the default Qdrant endpoint
};

export default Embedding;
