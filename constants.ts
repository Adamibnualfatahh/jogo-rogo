
import { WorkoutProgram } from './types';

/**
 * Updated with real IDs from Wger.de database.
 * Note: IDs 345 (Bench Press), 91 (Bicep curls), 112 (Squat) are usually stable 
 * across their current public database.
 */
export const MOCK_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'p1',
    title: 'Full Body Beginner',
    description: 'Program adaptasi otot untuk pemula yang ingin mulai angkat beban dengan gerakan dasar.',
    difficulty: 'Pemula',
    estimatedTime: '45-60 mnt',
    exerciseCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    tags: ['Efisien', 'Stabilisasi'],
    exerciseIds: ['345', '112', '91']
  },
  {
    id: 'p2',
    title: 'Push Day (Dada & Bahu)',
    description: 'Fokus pada otot dorong untuk membentuk bagian atas tubuh yang tegap.',
    difficulty: 'Menengah',
    estimatedTime: '60-75 mnt',
    exerciseCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800',
    tags: ['Hipertrofi', 'Power'],
    exerciseIds: ['345', '171']
  },
  {
    id: 'p3',
    title: 'Elite Back Strength',
    description: 'Latihan intensitas tinggi untuk punggung dan bicep yang kuat menggunakan gerakan pull.',
    difficulty: 'Mahir',
    estimatedTime: '90 mnt',
    exerciseCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800',
    tags: ['Lanjut', 'Back'],
    exerciseIds: ['104', '91']
  }
];
