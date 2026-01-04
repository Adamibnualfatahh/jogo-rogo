
const url = 'https://wger.de/api/v2/video/?limit=5';

try {
    console.log(`Fetching from: ${url}`);
    const res = await fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    });
    if (!res.ok) {
        console.log(`Failed: ${res.status} ${res.statusText}`);
    } else {
        const data = await res.json();
        console.log(`Fetched ${data.results.length} items.`);
        if (data.results.length > 0) {
            console.log('First item:', JSON.stringify(data.results[0], null, 2));
        }
    }
} catch (error) {
    console.error("Error fetching:", error);
}
