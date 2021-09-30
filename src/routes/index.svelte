<script lang='ts' context='module'>
  export async function load({ fetch }) {
    
    const cardList = await fetch('endpoints/cards.json')
    if (cardList.ok) {
      return {
        props: {
          cardsFetch: await cardList.json()
        }
      }
    }
  }
</script>

<script lang='ts'>
  import { onMount } from 'svelte'
  import { browser } from '$app/env';
  
  import Card from '$lib/components/Card.svelte'
  import * as Helpers from '$lib/ts/Helpers'
  
  //init
  
  export let cardsFetch
  let spread:CardT[] = []
  
  let cards:CardT[] = []
  // let cards:CardT[] =
  // [ {name: "test0", "description": "test"}
  // , {name: "test1", "description": "test"}
  // , {name: "test2", "description": "test"}
  // , {name: "test3", "description": "test"}
  // , {name: "test4", "description": "test"}
  // ]
  
  
  onMount(async ()=> {
    console.log(cardsFetch.list)
    cards = await Helpers.shuffle(cardsFetch.list);
    // [cards, spread] = Helpers.draw(cards, 1);
    // cards = cardsFetch.list
    console.log(cards)
  })
</script>


<main>
  <!-- <div id="placemat" class="max3"> -->
  <div id="placemat" class="max5">
  {#key spread.length}
  {#each spread as card}
  {#await spread.indexOf(card) then cardIndex}
  {#if cardIndex == 0}
  <div class="l">
    <Card {card}></Card>
  </div>
  {:else if cardIndex == 1}
  <div class="c">
    <Card {card}></Card>
  </div>
  {:else if cardIndex == 2}
  <div class="r">
    <Card {card}></Card>
  </div>
  {:else if cardIndex == 3}
  <div class="tc">
    <Card {card}></Card>
  </div>
  {:else if cardIndex == 4}
  <div class="bc">
    <Card {card}></Card>
  </div>
  {/if}
  {/await}
  {/each}
  {/key}
</div>
  
  <button on:click="{async () => {
    cards = await Helpers.shuffle(cards)
  }}">Shuffle deck</button>
  
  <button on:click="{() => {
    let hand;
    [cards, hand] = Helpers.draw(cards);
    console.log(hand)
    // hand.forEach((card) => {
      // spread = [...spread, ...[{name:"test", index:1111, description:""}]]
      spread = [...spread, ...hand]
      // })
      // spread = hand
      console.log(spread)
    }}">Draw a card</button>
    
    <button on:click="{() => {
      cards = Helpers.append({deck: cards, vals:spread})
      spread = []
    }}">Return spread</button>
    <!-- <button on:click="{() => {
      console.log(spread)
    }}">Return spread</button> -->
  </main>
  
  <style lang='scss'>
    .max3 {
      display: flex;
      flex-direction: row;
    }
    .max5 {
      display: grid;
      grid-template-areas: 'tl tc tr'
      'l c r'
      'bl bc br';
      width: 800px;
      height: 800px;
      grid-auto-columns: 150px;
      grid-auto-rows: 250px;
    }
    .l {
      grid-area:l;
    }
    .c {
      grid-area:c;
    }
    .r {
      grid-area:r;
    }
    .tc {
      grid-area:tc;
    }
    .bc {
      grid-area:bc;
    }
  </style>