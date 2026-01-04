
import { Exercise, WorkoutProgram } from './types';

const BASE_URL = 'https://wger.de/api/v2';

const headers = {
  'Accept': 'application/json',
};

/**
 * Utilitas untuk membersihkan teks dari tag HTML
 */
const cleanHtml = (html?: string | null): string => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

/**
 * Memecah deskripsi menjadi langkah-langkah yang rapi
 * Mendukung format HTML list (<li>) dan paragraf/kalimat biasa
 */
const getSteps = (description?: string | null): string[] => {
  if (!description) return [];

  // 1. Coba ambil dari tag <li>
  if (description.includes('<li')) {
    const div = document.createElement('div');
    div.innerHTML = description;
    const listItems = div.querySelectorAll('li');
    if (listItems.length > 0) {
      return Array.from(listItems).map(li => {
        return (li.textContent || li.innerText || '').trim();
      }).filter(s => s.length > 3); // Filter yang terlalu pendek
    }
  }

  // 2. Fallback: Parsing teks biasa
  const text = cleanHtml(description);
  if (!text) return [];

  return text
    .split(/\n+|(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10 && !s.toLowerCase().includes('exercise'));
};

/**
 * MENGAMBIL DAFTAR LATIHAN
 * Strategi: Ambil 100 data terbaru, lalu filter secara manual untuk kualitas terbaik.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * MENGAMBIL DAFTAR LATIHAN
 * Strategi: Gunakan limit & offset untuk pagination.
 */
export const fetchExercises = async (limit: number = 20, offset: number = 0): Promise<PaginatedResponse<Exercise>> => {
  try {
    // Gunakan filter language=2 (English) untuk konsistensi data
    const url = `${BASE_URL}/exerciseinfo/?limit=${limit}&offset=${offset}&language=2`;
    console.log('Fetching URL:', url); // Debug url

    const res = await fetch(url, { headers });

    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    console.log(`Fetched page with ${data.results?.length} items`);

    // 1. Filter: Hanya ambil yang punya nama dan deskripsi
    // 2. De-duplikasi: Wger sering mengembalikan gerakan yang sama dalam berbagai bahasa
    const uniqueExercises = new Map();

    data.results.forEach((item: any) => {
      let name = item.name?.trim();
      let description = item.description;

      // Logic tambahan: Cek di translations jika root kosong (terjadi saat filter language=2)
      if ((!name || !description) && item.translations) {
        const trans = item.translations.find((t: any) => t.language === 2);
        if (trans) {
          if (!name) name = trans.name?.trim();
          if (!description) description = trans.description;
        }
      }

      // Lewati jika nama kosong atau hanya angka/gerakan tanpa nama
      if (!name || name.length < 3 || name.toLowerCase().includes('gerakan tanpa nama')) return;

      // Jika gerakan sudah ada di Map, lewati (ini menangani duplikat antar bahasa)
      if (!uniqueExercises.has(name.toLowerCase())) {
        const image = item.images && item.images.length > 0
          ? item.images[0].image
          : `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800&sig=${item.id}`;

        uniqueExercises.set(name.toLowerCase(), {
          id: item.id.toString(),
          name: name,
          description: cleanHtml(description) || 'Ketuk untuk panduan lengkap.',
          targetMuscle: item.category?.name || 'Umum',
          secondaryMuscles: item.muscles ? item.muscles.map((m: any) => m.name) : [],
          equipment: item.equipment && item.equipment.length > 0 ? item.equipment[0].name : 'Tanpa alat',
          category: item.category?.name || 'Strength',
          imageUrl: image,
          videoUrl: item.videos && item.videos.length > 0 ? item.videos[0].video : undefined,
          videos: item.videos ? item.videos.map((v: any) => ({
            url: v.video,
            author: v.license_author,
            size: v.size
          })) : [],
          variations: item.variations,
          detailedMuscles: item.muscles ? item.muscles.map((m: any) => ({
            id: m.id,
            name: m.name,
            nameEn: m.name_en,
            isFront: m.is_front,
            imageUrlMain: m.image_url_main ? `https://wger.de${m.image_url_main}` : '',
            imageUrlSecondary: m.image_url_secondary ? `https://wger.de${m.image_url_secondary}` : ''
          })) : [],
          steps: getSteps(description)
        });
      }
    });

    const result = Array.from(uniqueExercises.values());

    return {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: result
    };
  } catch (err) {
    console.error('Fetch Exercises Failed:', err);
    return { count: 0, next: null, previous: null, results: [] };
  }
};

export const fetchExerciseById = async (id: string): Promise<Exercise | null> => {
  try {
    const res = await fetch(`${BASE_URL}/exerciseinfo/${id}/`, { headers });
    if (!res.ok) return null;
    const item = await res.json();

    const image = item.images && item.images.length > 0
      ? item.images[0].image
      : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800';

    // 1. Name Logic: Try root name, then translation (English=2)
    let name = item.name;
    if ((!name || name.trim() === '') && item.translations) {
      const trans = item.translations.find((t: any) => t.language === 2);
      if (trans && trans.name) name = trans.name;
    }

    // 2. Video Logic: Map all videos
    const videos = item.videos ? item.videos.map((v: any) => ({
      url: v.video,
      author: v.license_author,
      size: v.size
    })) : [];

    const steps = getSteps(item.description);

    return {
      id: item.id.toString(),
      name: name || 'Gerakan Fitness',
      description: cleanHtml(item.description) || 'Instruksi teks belum tersedia.',
      targetMuscle: item.category?.name || 'Umum',
      secondaryMuscles: item.muscles ? item.muscles.map((m: any) => m.name) : [],
      detailedMuscles: item.muscles ? item.muscles.map((m: any) => ({
        id: m.id,
        name: m.name,
        nameEn: m.name_en,
        isFront: m.is_front,
        imageUrlMain: m.image_url_main ? `https://wger.de${m.image_url_main}` : '',
        imageUrlSecondary: m.image_url_secondary ? `https://wger.de${m.image_url_secondary}` : ''
      })) : [],
      equipment: item.equipment && item.equipment.length > 0 ? item.equipment[0].name : 'Tanpa alat',
      category: item.category?.name || 'Strength',
      imageUrl: image,
      videoUrl: videos.length > 0 ? videos[0].url : undefined, // Keep for backward compatibility
      videos: videos,
      steps: steps.length > 0 ? steps : [
        'Atur posisi tubuh dengan tegap dan stabil.',
        'Lakukan gerakan secara perlahan dengan fokus pada otot.',
        'Jaga napas tetap teratur (buang napas saat beban terberat).',
        'Lakukan 3 set dengan 10-12 repetisi.'
      ]
    };
  } catch (err) {
    return null;
  }
};

export const fetchPublicTemplates = async (limit = 10): Promise<WorkoutProgram[]> => {
  try {
    const res = await fetch(`${BASE_URL}/public-templates/?limit=${limit}`, { headers });
    const data = await res.json();
    return data.results.map((item: any) => ({
      id: item.id.toString(),
      title: item.name || 'Program Latihan',
      description: cleanHtml(item.description) || 'Program komunitas untuk hasil maksimal.',
      difficulty: 'Menengah',
      estimatedTime: '45 mnt',
      exerciseCount: item.exercises_count || 5,
      imageUrl: `https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800&sig=${item.id}`,
      tags: ['Wger'],
      exerciseIds: []
    }));
  } catch {
    return [];
  }
};

export const fetchTemplateById = async (id: string): Promise<WorkoutProgram | null> => {
  try {
    const res = await fetch(`${BASE_URL}/public-templates/${id}/`, { headers });
    const item = await res.json();
    return {
      id: item.id.toString(),
      title: item.name,
      description: cleanHtml(item.description),
      difficulty: 'Menengah',
      estimatedTime: '60 mnt',
      exerciseCount: 0,
      imageUrl: `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800&sig=${item.id}`,
      tags: ['Verified'],
      exerciseIds: []
    };
  } catch {
    return null;
  }
};

export const fetchMuscles = async () => {
  try {
    const res = await fetch(`${BASE_URL}/muscle/`, { headers });
    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};

export const fetchVideos = async (limit = 20) => {
  try {
    const res = await fetch(`${BASE_URL}/video/?limit=${limit}`, { headers });
    const data = await res.json();
    return data.results.map((item: any) => ({
      id: item.id.toString(),
      uuid: item.uuid,
      exercise: item.exercise,
      videoUrl: item.video,
      author: item.license_author,
      size: item.size
    }));
  } catch {
    return [];
  }
};

export const fetchVideoByExerciseId = async (exerciseId: string): Promise<any[] | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/video/?exercise=${exerciseId}`, { headers });
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.map((v: any) => ({
        url: v.video,
        author: v.license_author,
        size: v.size
      }));
    }
    return undefined;
  } catch {
    return undefined;
  }
};
