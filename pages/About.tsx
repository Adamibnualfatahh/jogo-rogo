
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-gym-accent rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-gym-accent/20">
          <span className="text-black font-black text-4xl">G</span>
        </div>
        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Tentang JogoRogo</h1>
        <p className="text-gray-400 text-lg">Platform Fitness Digital Paling Transparan di Indonesia.</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Visi & Misi</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            JogoRogo lahir dari kegelisahan akan sulitnya mendapatkan panduan fitness yang terstruktur dan menggunakan bahasa yang mudah dipahami oleh orang Indonesia. Kami ingin mendemokratisasi akses ke informasi fitness yang berkualitas tanpa harus membayar biaya mahal.
          </p>
        </section>

        <section className="bg-gym-surface p-8 rounded-3xl border border-white/5">
          <h2 className="text-xl font-bold text-gym-accent mb-4 uppercase tracking-widest">Sumber Data & Transparansi</h2>
          <p className="text-gray-300 mb-6">
            JogoRogo didukung oleh <span className="text-white font-bold">Wger Open Source Fitness API</span>. Kami percaya pada kekuatan open-source untuk membangun basis pengetahuan fitness yang luas dan akurat.
          </p>
          <div className="flex space-x-4">
            <a href="https://wger.de" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 transition-all border border-white/10">
              Kunjungi Wger API
            </a>
          </div>
        </section>

        <section className="bg-red-500/5 p-8 rounded-3xl border border-red-500/10">
          <h2 className="text-xl font-bold text-red-400 mb-4 uppercase tracking-widest">Sangkalan (Disclaimer)</h2>
          <p className="text-red-300/80 text-sm leading-relaxed">
            Informasi yang disediakan oleh JogoRogo bukan merupakan saran medis profesional. Pengguna sangat disarankan untuk berkonsultasi dengan profesional medis atau dokter sebelum memulai program latihan fisik intensif, terutama jika memiliki riwayat penyakit tertentu. JogoRogo tidak bertanggung jawab atas cidera yang mungkin timbul akibat penggunaan informasi dalam platform ini tanpa pengawasan ahli.
          </p>
        </section>

        <div className="text-center py-10">
          <p className="text-gray-500 text-sm mb-4 italic">"Transformasi dimulai dari pikiran, dijalankan dengan keringat, dan diakhiri dengan hasil."</p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-gym-accent rounded-full"></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
