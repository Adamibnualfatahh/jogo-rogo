
import jsdom from "jsdom";
const { JSDOM } = jsdom;

// Mock browser environment for api.ts logic
global.document = new JSDOM(`...`).window.document;


const cleanHtml = (html) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
};

const getSteps = (description) => {
    if (!description) return [];

    if (description.includes('<li')) {
        const div = document.createElement('div');
        div.innerHTML = description;
        const listItems = div.querySelectorAll('li');
        if (listItems.length > 0) {
            return Array.from(listItems).map(li => {
                return (li.textContent || li.innerText || '').trim();
            }).filter(s => s.length > 3);
        }
    }

    const text = cleanHtml(description);
    if (!text) return [];

    return text
        .split(/\n+|(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 10 && !s.toLowerCase().includes('exercise'));
};

const htmlExample = `
<p>Questo è un esercizio avanzato.</p>
<ol>
  <li><b>Set up the box: </b>Position the box behind you.</li>
  <li><b>Stand with proper form: </b>Stand with your feet shoulder-width apart.</li>
  <li><b>Lower down: </b>Sit back as if going to sit on a chair.</li>
</ol>
`;

console.log("Steps extracted:");
const steps = getSteps(htmlExample);
console.log(steps);
