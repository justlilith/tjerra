function discard(deck:CardT[], discardCount?:number):CardT[] {
  if (!discardCount) {
    return deck.slice(1)
  }
  discardCount = Math.min(discardCount, deck.length)
  return deck.slice(discardCount)
}


function draw(deck:CardT[], drawCount?:number):CardT[] {
  if (!drawCount || drawCount === 1) {
    return [deck[0]]
  }

  const returnDeck = []
  drawCount = Math.min(drawCount, deck.length)
  
  for (let n = 0; n < drawCount; n++) {
    returnDeck.push(deck[n])
  }
  
  return returnDeck
}


  async function shuffle(deck:CardT[]):Promise<CardT[]> {
  const check = (array1, array2, index) => {
    if (array2.includes(array1[index])) {
      return check(array1, array2, (index + 1) % array1.length)
    } else {
      return index
    }
  }

  return new Promise((resolve) => {
    if (deck.length == 1) {
      resolve(deck)
    }
    else {
      deck = JSON.parse(JSON.stringify(deck))
      const newDeck = []

      deck.forEach(() => {
        const factor = Math.random()
        const newIndex = check(deck, newDeck, Math.floor(deck.length * factor))
        newDeck.push(deck[newIndex])
      })
      // return deck
      resolve(newDeck)
    }
  })
}

export {
  draw
  , discard
  , shuffle
}