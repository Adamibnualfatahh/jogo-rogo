
const url = 'https://wger.de/api/v2/muscle/';

try {
    console.log(`Fetching from: ${url}`);
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    const data = await res.json();
    console.log('Muscles:', data.results.map(m => m.name).join(', '));
} catch (error) {
    console.error("Error fetching:", error);
}
