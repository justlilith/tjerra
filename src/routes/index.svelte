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
  
  import * as Helpers from '$lib/ts/Helpers'
  
  //init
  
  export let cardsFetch
  
  let cards:CardT[] =
  [ {name: "test0", "description": "test"}
  , {name: "test1", "description": "test"}
  , {name: "test2", "description": "test"}
  , {name: "test3", "description": "test"}
  , {name: "test4", "description": "test"}
  ]
  
  
  onMount(async ()=> {
    console.log(cardsFetch.list)
    cards = await Helpers.shuffle(cardsFetch.list)
    cards = Helpers.draw(cards, 3)
    // cards = cardsFetch.list
    console.log(cards)
  })
</script>


<main>
  {#each cards as card}
  <div>{card?.name}</div>
  {/each}
</main>

<style lang='scss'>
</style>