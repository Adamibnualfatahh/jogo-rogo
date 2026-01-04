
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gym-dark border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gym-accent rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xl">J</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tighter">JogoRogo</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Platform latihan fisik gratis berbasis video. Jaga Raga, Jaga Kesehatan.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Navigasi</h4>
          <ul className="space-y-4">
            <li><Link to="/exercises" className="text-gray-400 hover:text-gym-accent text-sm transition-colors">Latihan</Link></li>
            <li><Link to="/videos" className="text-gray-400 hover:text-gym-accent text-sm transition-colors">Video</Link></li>
            <li><Link to="/muscle-guide" className="text-gray-400 hover:text-gym-accent text-sm transition-colors">Panduan Otot</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-gym-accent text-sm transition-colors">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Kontak</h4>
          <ul className="space-y-4">
            <li className="text-gray-400 text-sm">By Adam Ibnu Alfatah</li>
            <li className="text-gray-400 text-sm">Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-gray-500 text-xs">© 2024 JogoRogo. Free Video-Based Platform.</p>
        <p className="text-gray-500 text-xs italic">Created by Adam Ibnu Alfatah using Wger API.</p>
      </div>
    </footer>
  );
};

export default Footer;
