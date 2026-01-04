
const endpoints = [
    'https://wger.de/api/v2/workout/',
    'https://wger.de/api/v2/workoutsession/',
    'https://wger.de/api/v2/schedule/', // Guessing name
    'https://wger.de/api/v2/day/'
];

async function testEndpoints() {
    for (const url of endpoints) {
        try {
            console.log(`Testing: ${url}`);
            const res = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });
            console.log(`Status: ${res.status} ${res.statusText}`);
            if (res.ok) {
                const data = await res.json();
                console.log(`Count: ${data.count || data.results?.length}`);
            }
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
        console.log('---');
    }
}

testEndpoints();
