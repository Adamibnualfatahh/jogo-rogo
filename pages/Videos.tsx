
import React, { useState, useEffect } from 'react';
import { fetchExercises } from '../api';

interface VideoData {
    id: string;
    videoUrl: string;
    author: string;
    size: number;
    title: string;
    category: string;
}

const LazyVideoPlayer: React.FC<{ url: string }> = ({ url }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    if (!isPlaying) {
        return (
            <div
                className="relative w-full h-full bg-black cursor-pointer group"
                onClick={() => setIsPlaying(true)}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gym-accent rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg text-white text-xs font-bold">
                    Ketuk untuk Memutar
                </div>
            </div>
        );
    }

    return (
        <video
            controls
            autoPlay
            className="w-full h-full object-cover"
        >
            <source src={url} type="video/mp4" />
            Browser Anda tidak mendukung pemutaran video.
        </video>
    );
};

const Videos: React.FC = () => {
    const [videos, setVideos] = useState<VideoData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            // Fetch exercises instead of raw videos to get the titles
            const response = await fetchExercises(100);
            const exercises = response.results;

            const flattenedVideos: VideoData[] = [];

            exercises.forEach(ex => {
                // Add from 'videos' array
                if (ex.videos && ex.videos.length > 0) {
                    ex.videos.forEach(v => {
                        flattenedVideos.push({
                            id: `${ex.id}-${v.url}`, // Create unique key
                            videoUrl: v.url,
                            author: v.author || 'Wger Community',
                            size: v.size || 0,
                            title: ex.name,
                            category: ex.category
                        });
                    });
                }
                // Fallback to legacy videoUrl if no videos array but url exists
                else if (ex.videoUrl) {
                    flattenedVideos.push({
                        id: `${ex.id}-legacy`,
                        videoUrl: ex.videoUrl,
                        author: 'Wger Community',
                        size: 0,
                        title: ex.name,
                        category: ex.category
                    });
                }
            });

            setVideos(flattenedVideos);
            setLoading(false);
        };
        load();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-white mb-4">Galeri Video</h1>
                <p className="text-gray-400">Koleksi video latihan dari komunitas Wger dengan judul latihan lengkap.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-video bg-white/5 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, idx) => (
                        <div key={idx} className="group relative bg-gym-surface rounded-2xl overflow-hidden border border-white/5 hover:border-gym-accent/50 transition-all flex flex-col">
                            <div className="p-4 pb-2">
                                <span className="inline-block px-2 py-1 bg-gym-accent/10 text-gym-accent text-[10px] font-bold rounded-full mb-2 uppercase tracking-wide">
                                    {video.category}
                                </span>
                                <h3 className="text-white font-bold text-lg leading-tight truncate" title={video.title}>{video.title}</h3>
                            </div>

                            <div className="aspect-video bg-black relative">
                                <LazyVideoPlayer url={video.videoUrl} />
                            </div>

                            <div className="p-4 pt-2 mt-auto">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-500 italic">By: {video.author}</p>
                                    {video.size > 0 && (
                                        <div className="text-[10px] text-gray-600 font-mono">{(video.size / 1024 / 1024).toFixed(1)} MB</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Videos;
