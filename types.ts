
export type MuscleGroup = 'Dada' | 'Lengan' | 'Kaki' | 'Perut' | 'Punggung' | 'Bahu';
export type Equipment = 'Tanpa alat' | 'Dumbbell' | 'Barbell' | 'Kabel' | 'Mesin';
export type Category = 'Strength' | 'Cardio' | 'Stretching' | string;
export type Difficulty = 'Pemula' | 'Menengah' | 'Mahir';

export interface MuscleDetail {
  id: number;
  name: string;
  nameEn: string;
  isFront: boolean;
  imageUrlMain: string;
  imageUrlSecondary: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  targetMuscle: MuscleGroup;
  secondaryMuscles: string[];
  detailedMuscles?: MuscleDetail[];
  equipment: Equipment;
  category: Category;
  imageUrl: string;
  videoUrl?: string; // Legacy: single video
  videos?: { url: string; author?: string; size?: number }[]; // New: multiple videos
  variations?: number;
  steps: string[];
}

export interface WorkoutProgram {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  exerciseCount: number;
  imageUrl: string;
  tags: string[];
  exerciseIds: string[];
}
