
const url = 'https://wger.de/api/v2/exerciseinfo/?limit=10';

try {
    const res = await fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    });
    if (!res.ok) {
        console.log(`Failed: ${res.status} ${res.statusText}`);
    } else {
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    }
} catch (error) {
    console.error("Error fetching:", error);
}
