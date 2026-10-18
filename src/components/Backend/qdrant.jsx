// qdrant.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const QdrantSearch = ({ vector, onSourceReady, Url }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const clientUrl = Url || `/qdrant/collections/Harrison_manual_of_medicine/points/search`;

    useEffect(() => {
        if (!vector) return;
        const searchPoints = async () => {
            const body = {
                vector,
                top: 5,
                with_payload: true,
            };

            try {
                const response = await axios.post(clientUrl, body, {
                    headers: {
                        Authorization:
                            `Bearer ${import.meta.env.VITE_QDRANT_KEY}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data.result && response.data.result.length > 0) {
                    setResults(response.data.result);
                    if (onSourceReady) onSourceReady(response.data.result);
                } else {
                    setError("No results found.");
                }
            } catch (err) {
                setError(`Error fetching results: ${err.message}`);
                console.error('Error details:', err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        searchPoints();
    }, [vector, onSourceReady, clientUrl]);

    if (loading) return <div className="justify-center animate-spin">Loading Qdrant results...</div>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    return <pre>{JSON.stringify(results, null, 2)}</pre>;
};

QdrantSearch.propTypes = {
    vector: PropTypes.array.isRequired,
    onSourceReady: PropTypes.func.isRequired,
    Url: PropTypes.string, // Optional override of the default endpoint.
};

export default QdrantSearch;
