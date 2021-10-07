<script lang='ts'>
  import { createEventDispatcher } from 'svelte'

  export let value = 1
  
  const dispatcher = createEventDispatcher()

  const increase = (value:number, amount: number, max:number):number => {
    dispatcher('changeSpreadCount', 'increase')
    return value + amount <= max ? value + amount : value
  }
  const decrease = (value:number, amount: number, min:number):number => {
    dispatcher('changeSpreadCount', 'decrease')
    return value - amount >= min ? value - amount : value
  }
</script>

<div class='number-picker'>
  <button class='tleft' on:click="{()=> {
    value = increase(value,1,12)
  }}">+</button>
  <span class='mleft'>{value}</span>
  <span class='mright'>card{value > 1 ? 's' : ''} in spread</span>
  <button class='bleft' on:click="{()=> {
    value = decrease(value,1,1)
  }}">-</button>
</div>

<style lang='scss'>
  .number-picker {
    display: grid;
    grid-template-areas: 'tleft tright' 'mleft mright' 'bleft bright';
    // width: 40px;
    height: 80px;
  }

  .tleft {
    grid-area: tleft;
  }
  .mleft {
    grid-area: mleft;
  }
  .mright {
    grid-area: mright;
  }
  .bleft {
    grid-area: bleft;
  }
</style>