
import React from 'react';
import { Link } from 'react-router-dom';
import { Exercise } from '../types';

interface Props {
  exercise: Exercise;
}

const ExerciseCard: React.FC<Props> = ({ exercise }) => {
  return (
    <Link 
      to={`/exercise/${exercise.id}`}
      className="group bg-gym-surface border border-white/5 rounded-2xl overflow-hidden hover:border-gym-accent/50 transition-all transform hover:-translate-y-1 shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={exercise.imageUrl} 
          alt={exercise.name} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
        />
        <div className="absolute top-3 left-3 bg-gym-accent text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-md">
          {exercise.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-gym-accent transition-colors">
            {exercise.name}
          </h3>
          <span className="text-xs text-gray-500 font-medium">#{exercise.targetMuscle}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
            <svg className="w-3 h-3 mr-1 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            {exercise.targetMuscle}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
             <svg className="w-3 h-3 mr-1 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            {exercise.equipment}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;
