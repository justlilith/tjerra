<script lang='ts' context='module'>
  export async function load({ fetch }) {

    const cardList = await fetch('endpoints/cards.json')
    return {
      props: {
        cardsFetch: await cardList.json()
      }
    }
  }
</script>

<script lang='ts'>
  import { onMount } from 'svelte'
  
  import * as Helpers from '$lib/ts/Helpers'
  
  //init
  
  export let cardsFetch

  let cards:CardT[] = new Array(5)
  cards[0] = {name: "test0", "description": "test"}
  cards[1] = {name: "test1", "description": "test"}
  cards[2] = {name: "test2", "description": "test"}
  cards[3] = {name: "test3", "description": "test"}
  cards[4] = {name: "test4", "description": "test"}
  
  
  onMount(async ()=> {
    console.log(cardsFetch.list)
    console.log(Helpers.shuffle(cardsFetch.list))
    cards = Helpers.shuffle(cardsFetch.list)
  })
</script>


<main>
  {#each cards as card}
  <div>{card.name}</div>
  {/each}
</main>

<style lang='scss'>
</style>