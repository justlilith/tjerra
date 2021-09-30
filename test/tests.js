import { test } from 'zora';

import * as Helpers from './src/lib/ts/Helpers.js'


let deck = new Array(5)
deck = await deck.fill(1,0,deck.length - 1)
deck = deck.map((v,i) => {
  return Math.ceil(((Math.random() + 1) * deck.length) % deck.length)
})

let deck2 = JSON.parse(JSON.stringify(deck))

test(`should shuffle`, async (t) => {
  // deck.fill(11, 0, Math.floor(deck.length / 2))
  // deck.fill(88, Math.ceil(deck.length / 2), deck.length)  
  
  t.eq(Helpers.shuffle([1]), Helpers.shuffle([1]))
  
  // t.ok(shuffle(deck2).length == deck.length)
  
  // t.notEq(shuffle(deck), shuffle(deck2))
  // t.eq(shuffle(deck), 4)
})

test(`should draw`, async (t) => {
  t.eq(Helpers.draw(deck), [deck[0]])
  t.eq(Helpers.draw(deck, 1), [deck[0]])
  t.eq(Helpers.draw(deck, 3), [deck[0], deck[1], deck[2]] )
  t.eq(Helpers.draw(deck, 666), deck)
})

test(`should discard`, async (t) => {
  let miniDeck = [1, 2, 3, 4, 5]
  t.eq(Helpers.discard(miniDeck), [2, 3, 4, 5])
  t.eq(Helpers.discard(miniDeck, 3), [4, 5])
  t.eq(Helpers.discard(miniDeck, 666), [])
})

test(`should append`, async (t) => {
  let miniDeck = [1,2,3,4,5]
  t.eq(Helpers.append({deck: miniDeck, vals: 6}), [1, 2, 3, 4, 5, 6])
  t.eq(Helpers.append({deck: miniDeck, vals: [6]}), [1, 2, 3, 4, 5, 6])
  t.eq(Helpers.append({deck: miniDeck, vals: [1, 2]}), [1, 2, 3, 4, 5, 1, 2])
})