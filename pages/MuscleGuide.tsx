
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMuscles } from '../api';

const MuscleGuide: React.FC = () => {
  const [muscles, setMuscles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMuscles = async () => {
      setLoading(true);
      const data = await fetchMuscles();
      setMuscles(data);
      setLoading(false);
    };
    loadMuscles();
  }, []);

  const getMuscleColor = (id: number) => {
    const colors = [
      'bg-red-500/20 text-red-400 border-red-500/30',
      'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'bg-green-500/20 text-green-400 border-green-500/30',
      'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'bg-orange-500/20 text-orange-400 border-orange-500/30',
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-white mb-4">Panduan Anatomi Otot</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Pelajari struktur tubuh manusia dan temukan gerakan yang tepat untuk setiap kelompok otot menggunakan data anatomi real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative group md:sticky md:top-24">
          <div className="absolute inset-0 bg-gym-accent/5 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
            alt="Human Anatomy Representation"
            className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/5 opacity-80"
          />
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white border-l-4 border-gym-accent pl-4">Daftar Otot (Wger API)</h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-32 bg-gym-surface animate-pulse rounded-2xl border border-white/5"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {muscles.map((muscle) => (
                <div key={muscle.id} className={`p-6 rounded-2xl border ${getMuscleColor(muscle.id)} transition-transform hover:scale-105`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{muscle.name}</h3>
                    <span className="text-[10px] font-black uppercase opacity-70">Otot Utama</span>
                  </div>
                  <p className="text-xs opacity-80 mb-4 leading-relaxed">
                    {muscle.is_front ? 'Terletak di bagian depan tubuh.' : 'Terletak di bagian belakang tubuh.'}
                  </p>
                  <Link to={`/exercises?search=${muscle.name}`} className="text-xs font-black underline hover:opacity-70">
                    Lihat Latihan
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="bg-gym-surface border border-white/10 rounded-2xl p-8">
            <h3 className="text-white font-bold mb-4">Pentingnya Memahami Anatomi</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gym-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Meningkatkan Mind-Muscle Connection untuk hasil kontraksi maksimal.</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gym-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Mencegah cidera dengan memahami rentang gerak (Range of Motion).</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-300 font-bold">
                <svg className="w-5 h-5 text-gym-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Menyeimbangkan postur tubuh antara sisi anterior dan posterior.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuscleGuide;
