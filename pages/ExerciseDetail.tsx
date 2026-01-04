
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchExerciseById, fetchVideoByExerciseId } from '../api';
import { Exercise, MuscleDetail } from '../types';

const LazyVideoPlayer: React.FC<{ url: string; poster?: string }> = ({ url, poster }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isPlaying) {
    return (
      <div
        className="relative w-full h-full bg-black cursor-pointer group"
        onClick={() => setIsPlaying(true)}
      >
        {poster && <img src={poster} alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50" />}
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

const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleDetail | null>(null);

  useEffect(() => {
    if (id) {
      const loadDetail = async () => {
        setLoading(true);
        const data = await fetchExerciseById(id);

        // If data found but no video, try fetching correctly (Legacy support)
        if (data && !data.videoUrl) {
          // This part tries to fetch a single video URL if strictly needed, 
          // but our api.ts now handles array mapping. 
          // Keeping safe fallback just in case.
          try {
            const video = await fetchVideoByExerciseId(id);
            if (video) {
              // If fetchVideoByExerciseId returns a string (legacy) or object
              // We'll trust our new API logic predominantly
            }
          } catch (e) { console.error(e); }
        }

        setExercise(data);
        setLoading(false);
      };
      loadDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-gym-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-400">Memuat detail latihan...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Latihan tidak ditemukan</h2>
        <button onClick={() => navigate('/exercises')} className="mt-4 text-gym-accent">Kembali ke Daftar</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">

      {/* Modal for Muscle Details */}
      {selectedMuscle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedMuscle(null)}>
          <div className="bg-gym-surface border border-white/10 rounded-3xl p-6 max-w-2xl w-full shadow-2xl transform scale-100 transition-all" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">{selectedMuscle.name}</h3>
                <p className="text-gray-400 text-sm">{selectedMuscle.nameEn}</p>
              </div>
              <button
                onClick={() => setSelectedMuscle(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Posisi Utama</p>
                <div className="aspect-square bg-black rounded-xl overflow-hidden border border-white/10">
                  <img src={selectedMuscle.imageUrlMain} alt={selectedMuscle.name} className="w-full h-full object-contain" />
                </div>
              </div>
              {selectedMuscle.imageUrlSecondary && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Posisi Sekunder</p>
                  <div className="aspect-square bg-black rounded-xl overflow-hidden border border-white/10">
                    <img src={selectedMuscle.imageUrlSecondary} alt={selectedMuscle.name} className="w-full h-full object-contain" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <span className={`px-3 py-1 text-xs uppercase font-bold rounded-lg ${selectedMuscle.isFront ? 'bg-gym-accent/20 text-gym-accent' : 'bg-purple-500/20 text-purple-400'}`}>
                Posisi: {selectedMuscle.isFront ? 'Depan' : 'Belakang'}
              </span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Kembali
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Right Column: Details - MOVED FIRST FOR MOBILE */}
        <div className="space-y-6 lg:col-start-3 lg:row-start-1">
          <div className="bg-gym-surface rounded-3xl p-6 border border-white/5 sticky top-8">
            <h1 className="text-3xl font-black text-white mb-2 leading-tight">{exercise.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-gym-accent text-black px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{exercise.category}</span>
              <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{exercise.equipment}</span>
              {exercise.variations !== undefined && exercise.variations > 0 && (
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{exercise.variations} Variasi</span>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">Target Utama</h4>
                <p className="text-xl font-bold text-white">{exercise.targetMuscle}</p>
              </div>

              {exercise.detailedMuscles && exercise.detailedMuscles.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest border-b border-white/10 pb-2">Anatomi Otot Spesifik</h4>
                  <div className="space-y-3">
                    {exercise.detailedMuscles.map(muscle => (
                      <div
                        key={muscle.id}
                        onClick={() => setSelectedMuscle(muscle)}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-gym-accent/30 cursor-pointer transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          {muscle.imageUrlMain && (
                            <div className="w-10 h-10 rounded-full bg-black overflow-hidden border border-white/10 group-hover:border-gym-accent/50 transition-colors">
                              <img src={muscle.imageUrlMain} alt={muscle.name} className="w-full h-full object-cover scale-150" />
                            </div>
                          )}
                          <div>
                            <p className="text-white text-sm font-bold group-hover:text-gym-accent transition-colors">{muscle.name}</p>
                            {muscle.nameEn && <p className="text-gray-500 text-xs">{muscle.nameEn}</p>}
                          </div>
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-lg ${muscle.isFront ? 'bg-gym-accent/20 text-gym-accent' : 'bg-purple-500/20 text-purple-400'}`}>
                            {muscle.isFront ? 'Depan' : 'Belakang'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exercise.secondaryMuscles.length > 0 && !exercise.detailedMuscles && (
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest">Otot Sekunder</h4>
                  <div className="flex flex-wrap gap-2">
                    {exercise.secondaryMuscles.map(m => (
                      <span key={m} className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] rounded-full font-bold border border-white/10 uppercase">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Left Column: Media - MOVED SECOND but positioned Left on Desktop */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 space-y-8">

          {/* Main Video/Image Display */}
          {exercise.videos && exercise.videos.length > 0 ? (
            <div className="space-y-8">
              {exercise.videos.map((video, idx) => (
                <div key={idx} className="bg-gym-surface rounded-3xl p-6 border border-white/5">
                  <h3 className="text-white font-bold mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gym-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                    Panduan Video {exercise.videos && exercise.videos.length > 1 ? `#${idx + 1}` : ''}
                  </h3>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                    <LazyVideoPlayer url={video.url} poster={exercise.imageUrl} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-[10px] text-gray-500 italic">*Author: {video.author}</p>
                    {video.size && <p className="text-[10px] text-gray-500">{(video.size / 1024 / 1024).toFixed(1)} MB</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : exercise.videoUrl ? (
            // Legacy fallback
            <div className="bg-gym-surface rounded-3xl p-6 border border-white/5">
              <h3 className="text-white font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gym-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                Panduan Video
              </h3>
              <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                <LazyVideoPlayer url={exercise.videoUrl} poster={exercise.imageUrl} />
              </div>
              <p className="mt-3 text-[10px] text-gray-500 italic">
                *Video disediakan oleh database publik Wger.
              </p>
            </div>
          ) : (
            // YouTube Fallback State
            <div className="bg-gym-surface rounded-3xl p-6 border border-white/5">
              <h3 className="text-white font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 1010 10A10.011 10.011 0 0010 0zm3.93 10.65l-6.32 3.65a.75.75 0 01-1.13-.65v-7.3a.75.75 0 011.13-.65l6.32 3.65a.75.75 0 010 1.3z" /></svg>
                Panduan Video
              </h3>
              <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center p-6 relative group cursor-pointer hover:bg-white/10 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg className="w-16 h-16 text-gray-600 group-hover:text-red-500 transition-colors mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                <p className="text-gray-300 font-medium mb-1">Video belum tersedia di database.</p>
                <p className="text-xs text-gray-500 mb-6">Jangan khawatir, cari tutorial terbaik di YouTube.</p>

                <a
                  href={`https://www.youtube.com/results?search_query=how+to+do+${exercise.name}+exercise+tutorial`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-all transform group-hover:scale-105 shadow-lg shadow-red-600/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  <span>Cari di YouTube</span>
                </a>
              </div>
            </div>
          )}

          {/* Steps */}
          <div className="bg-gym-surface rounded-3xl p-8 border border-white/5">
            <h3 className="text-xl font-black text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-gym-accent flex items-center justify-center text-black text-sm mr-3">1</span>
              Instruksi Gerakan
            </h3>
            <ol className="space-y-4">
              {exercise.steps.map((step, idx) => (
                <li key={idx} className="flex group">
                  <span className="mr-4 text-gray-500 font-mono font-bold group-hover:text-gym-accent transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                  <p className="text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: step }}></p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
