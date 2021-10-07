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
  import NumerPicker from '$lib/components/NumberPicker.svelte'
  import * as Helpers from '$lib/ts/Helpers'
  import NumberPicker from '$lib/components/NumberPicker.svelte';
  
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
  
  let spreadCount = 1;
  
  
  onMount(async ()=> {
    console.log(cardsFetch.list)
    cards = await Helpers.shuffle(cardsFetch.list);
    // [cards, spread] = Helpers.draw(cards, 1);
    // cards = cardsFetch.list
    console.log(cards)
  })
</script>


<main>
  <div id="placemat" class="max{spreadCount}">
    {#key spread.length}
    {#each new Array(spreadCount) as value, index}
    <div class='card{index}'>
      {#if spread[index]}
      <!-- {#await spread.indexOf(card) then cardIndex} -->
      <Card card={spread[index]}></Card>
      <!-- {/await} -->
      {/if}
    </div>
    {/each}
    {/key}
  </div>
  <div id='chrome'>
    <div id='buttons'>
      <button on:click="{async () => {
        cards = await Helpers.shuffle(cards)
      }}">Shuffle deck</button>
      
      <button on:click="{() => {
        switch (spreadCount == spread.length){
          case true:
          default:
          break;
          case false:
          let hand;
          [cards, hand] = Helpers.draw(cards);
          console.log(hand)
          spread = [...spread, ...hand]
          console.log(spread)
        }
      }}">Draw a card</button>
      
      <button on:click="{() => {
        cards = Helpers.prepend({deck: cards, vals:spread[spread.length - 1]})
        spread = spread.filter((val, index) => {
          return index != (spread.length - 1) 
        })
      }}">Return card</button>
      
      <button on:click="{() => {
        cards = Helpers.append({deck: cards, vals:spread})
        spread = []
      }}">Return spread</button>
    </div>
    <div id='data'>
      
      <NumberPicker on:changeSpreadCount='{(e)=> {
        switch (e.detail) {
          case 'decrease':
          if (spread.length == spreadCount){
            cards = Helpers.prepend({deck: cards, vals:spread[spread.length - 1]})
            spread = spread.filter((val, index) => {
              return index != (spread.length - 1) 
            })
          }
          break
          default:
          case 'increase':
          
        }
      }}' bind:value={spreadCount}>
    </NumberPicker>
  </div>
</div>
</main>

<style lang='scss'>
  main {
    margin:auto;
    width:900px;
  }
  #placemat {
    justify-content: center;
    height:80vh;
    margin:auto;
  }
  #placemat div {
    width:10vw;
    max-height:30vh;
  }
  #chrome {
    margin:auto;
    width:800px;
    display:flex;
    flex-direction: column;
    justify-content: center;
  }
  #buttons {
    display:flex;
    flex-direction: row;
    justify-content: center;
  }
  #data {
    display:flex;
    flex-direction: row;
    justify-content: center;
  }
  .max1 {
    display: flex;
    flex-direction: row;
  }
  .max2 {
    display: flex;
    flex-direction: row;
  }
  .max3 {
    display: flex;
    flex-direction: row;
  }
  .max4 {
    display: grid;
    grid-template-areas: '. card0 .'
    'card2 . card3'
    '. card1 .';
  }
  .max5 {
    display: grid;
    // justify-content: center;
    // margin:auto;
    grid-template-areas: '. card0 .'
    'card3 card1 card4'
    '. card2 .';
    // width: 800px;
    // height: 600px;
    // grid-auto-columns: 150px;
    // grid-auto-rows: 200px;
  }
  .card0 {
    grid-area:card0;
    height:100%;
  }
  .card1 {
    grid-area:card1;
    height:100%;
  }
  .card2 {
    grid-area:card2;
    height:100%;
  }
  .card3 {
    grid-area:card3;
    height:100%;
  }
  .card4 {
    grid-area:card4;
    height:100%;
  }
</style>