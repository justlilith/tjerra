import { default as fs } from 'fs';
export async function get({ params }) {
    const list = JSON.parse(fs.readFileSync(`src/lib/cards/cards.json`, { encoding: 'utf8' }));
    return {
        body: {
            list
        }
    };
}
//# sourceMappingURL=cards.json.js.map