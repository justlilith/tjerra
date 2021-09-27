function shuffle(deck:CardT[]):CardT[] {
  // return deck
  const shuffle2 = (deck:CardT[]):CardT[] => {
    deck = deck.map((value, index) =>{
      if (Math.random() >= .3) {
        const card = deck.splice(index,1)
        // const half = deck.splice(Math.floor(deck.length / 2))
        deck.push(card[0])
        // deck = deck.concat(half[0])
        return deck[index]
        // return deck[index]
      } else {
        const card = deck.pop()
        deck.push(deck[index])
        deck[index] = card
        return deck[index]
      }
    })
    return deck
  }

  if (deck.length == 1) {
    return deck
  }
  else {
    deck = shuffle2(deck)
    deck = shuffle2(deck)
    deck = shuffle2(deck)
    deck = shuffle2(deck)
    return shuffle2(deck)
  }
}

export {
  shuffle
}