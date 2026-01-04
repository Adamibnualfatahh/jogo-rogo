
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-30"
            alt="Gym Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gym-dark via-gym-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-gym-accent/10 border border-gym-accent/20 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-gym-accent rounded-full animate-pulse"></span>
              <span className="text-gym-accent text-xs font-bold uppercase tracking-widest">Platform Fitness Video Gratis</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              JogoRogo <br /><span className="text-gym-accent">Jaga Raga Anda</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Platform latihan fisik berbasis video yang sepenuhnya gratis. Panduan otot dan workout terbaik untuk kesehatanmu.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/exercises" className="bg-gym-accent hover:bg-green-400 text-black px-8 py-4 rounded-full font-bold text-center transition-all transform hover:scale-105 shadow-xl shadow-gym-accent/20">
                Mulai Latihan
              </Link>
              <Link to="/videos" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-bold text-center transition-all">
                Lihat Video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gym-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Kenapa Memilih JogoRogo?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Kami fokus pada kualitas instruksi video dan akses gratis untuk semua.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Latihan Berdasarkan Otot"
              description="Ingin melatih Dada? Atau Kaki? Cari gerakan terbaik berdasarkan target ototmu."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
              title="Workout Tanpa Alat"
              description="Tidak punya peralatan? Kami punya ratusan modul latihan bodyweight yang efektif."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>}
              title="Bahasa Indonesia"
              description="Semua istilah dan panduan disajikan dalam Bahasa Indonesia yang mudah dipahami."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gym-surface py-20">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-gym-accent mb-2">100+</div>
            <div className="text-gray-400 text-sm">Gerakan Latihan</div>
          </div>
          <div>
            <div className="text-4xl font-black text-gym-accent mb-2">Gratis</div>
            <div className="text-gray-400 text-sm">Selamanya</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 bg-gym-surface border border-white/5 rounded-3xl hover:border-gym-accent/30 transition-all duration-300">
    <div className="w-16 h-16 bg-gym-accent/10 rounded-2xl flex items-center justify-center text-gym-accent mb-8">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export default Home;
