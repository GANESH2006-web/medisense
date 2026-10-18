import { useState, useEffect } from "react";

const API_KEY = "AIzaSyClaLZ-SelWFTt9OZSj3d3uFLJ_UsNwfSo"; // Replace with your actual YouTube API key

function YouTubeVideos({ content }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (!content) return;

        async function fetchVideos() {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(content + " prevention treatment")}&maxResults=13&type=video&key=${API_KEY}`
                );
                const data = await response.json();
                setVideos(data.items || []);
            } catch (error) {
                console.error("Error fetching YouTube videos:", error);
            }
        }

        fetchVideos();
    }, [content]);

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-blue-40000hnm">Related Videos on YouTube</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div key={video.id.videoId} className="bg-teal-100 p-4 shadow rounded-2xl dark:bg-c4">
                        <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            title={video.snippet.title}
                            allowFullScreen
                        />
                        <p className="mt-2 font-medium">{video.snippet.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YouTubeVideos;
