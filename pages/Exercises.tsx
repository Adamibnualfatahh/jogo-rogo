
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchExercises } from '../api';
import ExerciseCard from '../components/ExerciseCard';
import { Exercise } from '../types';

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);

  const [categoryFilter, setCategoryFilter] = useState<string | 'All'>('All');
  const [equipmentFilter, setEquipmentFilter] = useState<string>('All');

  const categoryOptions = ['All', 'Abs', 'Arms', 'Back', 'Chest', 'Legs', 'Shoulders'];

  // Update search state if URL param changes (e.g. navigation from Muscle Guide)
  useEffect(() => {
    const param = searchParams.get('search');
    if (param) {
      // Check if the search param exactly matches a category (case-insensitive)
      const matchedCategory = categoryOptions.find(c => c.toLowerCase() === param.toLowerCase());

      if (matchedCategory) {
        setCategoryFilter(matchedCategory);
        setSearch(''); // Clear text search to avoid redundancy, let the filter button do the work
      } else {
        setSearch(param);
        setCategoryFilter('All'); // Reset category if it's a specific search term
      }
    }
  }, [searchParams]);

  const loadData = async (currentOffset: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchExercises(limit, currentOffset);

      if (data.results.length === 0 && currentOffset === 0) {
        setError("Database sedang sibuk atau koneksi lambat. Silakan tekan tombol segarkan di bawah.");
      }

      setExercises(data.results);
      setTotalCount(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);

    } catch (err) {
      setError("Gagal terhubung ke server Wger. Pastikan internet Anda aktif.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(offset);
  }, [offset]);

  const handleNext = () => {
    if (nextPage) {
      setOffset(prev => prev + limit);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (prevPage) {
      setOffset(prev => Math.max(0, prev - limit));
      window.scrollTo(0, 0);
    }
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      const name = ex.name || "";
      const category = ex.category || "";
      const equipment = ex.equipment || "";
      const target = ex.targetMuscle || "";
      const secondary = ex.secondaryMuscles || [];

      const searchLower = search.toLowerCase();

      const matchesSearch =
        name.toLowerCase().includes(searchLower) ||
        target.toLowerCase().includes(searchLower) ||
        secondary.some(s => s.toLowerCase().includes(searchLower));

      const matchesCategory = categoryFilter === 'All' ||
        category.toLowerCase() === categoryFilter.toLowerCase();
      const matchesEquipment = equipmentFilter === 'All' ||
        equipment.toLowerCase() === equipmentFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesEquipment;
    });
  }, [search, categoryFilter, equipmentFilter, exercises]);

  const equipmentOptions = useMemo(() => {
    const equipments = new Set(exercises.map(e => e.equipment || 'Tanpa alat').filter(Boolean));
    return ['All', ...Array.from(equipments).sort()];
  }, [exercises]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gym-accent/10 border border-gym-accent/20 rounded-full mb-4">
            <div className="w-1.5 h-1.5 bg-gym-accent rounded-full animate-pulse"></div>
            <span className="text-gym-accent text-[10px] font-black uppercase tracking-widest">JogoRogo Database</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4">Katalog Gerakan</h1>
          <p className="text-gray-400 mb-6">Menampilkan latihan pilihan yang telah melalui proses validasi sistem.</p>

          <div className="relative">
            <input
              type="text"
              placeholder="Cari gerakan (misal: Push up, Bench...)"
              className="w-full bg-gym-surface border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-gym-accent transition-colors shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-gym-surface/50 p-6 rounded-2xl border border-white/5">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Target Otot</h4>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(c => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${categoryFilter === c
                    ? 'bg-gym-accent text-black border-gym-accent'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                    }`}
                >
                  {c === 'All' ? 'Semua' : c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gym-surface/50 p-6 rounded-2xl border border-white/5">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Peralatan</h4>
            <div className="flex flex-wrap gap-2">
              {equipmentOptions.map(e => (
                <button
                  key={e}
                  onClick={() => setEquipmentFilter(e)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${equipmentFilter === e
                    ? 'bg-gym-accent text-black border-gym-accent'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                    }`}
                >
                  {e === 'All' ? 'Semua' : e}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gym-accent/5 rounded-2xl border border-gym-accent/10">
            <div className="text-white font-bold text-xl mb-1">
              {totalCount > 0 ? totalCount : '...'}
            </div>
            <div className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Total Gerakan</div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gym-surface h-80 rounded-2xl animate-pulse border border-white/5"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-gym-surface/20 rounded-3xl border border-white/5 border-dashed">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-gray-400 font-medium px-8">{error}</p>
              <button
                onClick={() => loadData(offset)}
                className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gym-accent transition-colors"
              >
                Segarkan Sekarang
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {filteredExercises.map(ex => (
                  <ExerciseCard key={ex.id} exercise={ex} />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col md:flex-row items-center justify-between bg-gym-surface/50 p-6 rounded-2xl border border-white/5">
                <div className="text-sm text-gray-400 mb-4 md:mb-0">
                  Menampilkan <span className="font-bold text-white">{offset + 1}-{Math.min(offset + limit, totalCount)}</span> dari <span className="font-bold text-white">{totalCount}</span> Latihan
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handlePrev}
                    disabled={!prevPage}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!prevPage ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-gym-accent hover:text-black'}`}
                  >
                    Sebelumnya
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!nextPage}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!nextPage ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-gym-accent text-black hover:bg-green-400 shadow-lg shadow-gym-accent/20'}`}
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
