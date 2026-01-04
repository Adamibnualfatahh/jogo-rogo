
const url = 'https://wger.de/api/v2/exerciseinfo/?limit=10&language=2';

try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    const data = await res.json();

    console.log(`Fetched ${data.results.length} items.`);

    data.results.forEach((item, idx) => {
        let name = item.name;
        let desc = item.description;

        if (!name && item.translations) {
            const trans = item.translations.find(t => t.language === 2);
            if (trans) {
                name = trans.name;
                desc = trans.description ? trans.description.substring(0, 20) + "..." : "No desc";
            }
        }

        console.log(`[${idx}] Name: ${name} | Desc: ${desc}`);
    });

} catch (error) {
    console.error("Error fetching:", error);
}
