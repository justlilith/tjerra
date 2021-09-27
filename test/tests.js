import { test } from 'zora';

import {shuffle} from '../src/lib/ts/Helpers.js'

  test(`should shuffle`, t => {
    const deck = new Array(52)
    deck.fill(11, 0, Math.floor(deck.length / 2))
    deck.fill(88, Math.ceil(deck.length / 2), deck.length)
    
    t.eq(shuffle([1]), shuffle([1]))
    
    t.ok(shuffle(deck).length == deck.length)
    
    t.notEq(shuffle(deck), shuffle(deck))
  })