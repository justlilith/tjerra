function append(args) {
    const deck = JSON.parse(JSON.stringify(args.deck));
    deck.push(args.vals);
    return deck.flat(1);
}
function discard(deck, discardCount) {
    if (!discardCount) {
        return deck.slice(1);
    }
    discardCount = Math.min(discardCount, deck.length);
    return deck.slice(discardCount);
}
function draw(deck, drawCount) {
    if (!drawCount || drawCount === 1) {
        return [deck[0]];
    }
    const returnDeck = [];
    drawCount = Math.min(drawCount, deck.length);
    for (let n = 0; n < drawCount; n++) {
        returnDeck.push(deck[n]);
    }
    return returnDeck;
}
async function shuffle(deck) {
    const check = (array1, array2, index) => {
        if (array2.includes(array1[index])) {
            return check(array1, array2, (index + 1) % array1.length);
        }
        else {
            return index;
        }
    };
    return new Promise((resolve) => {
        if (deck.length == 1) {
            resolve(deck);
        }
        else {
            deck = JSON.parse(JSON.stringify(deck));
            const newDeck = [];
            deck.forEach(() => {
                const factor = Math.random();
                const newIndex = check(deck, newDeck, Math.floor(deck.length * factor));
                newDeck.push(deck[newIndex]);
            });
            // return deck
            resolve(newDeck);
        }
    });
}
export { append, draw, discard, shuffle };
//# sourceMappingURL=Helpers.js.map