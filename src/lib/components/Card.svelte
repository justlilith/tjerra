<script lang='ts'>
  export let card:CardT
</script>

<div class="tarot-card">
  <h2>
    {card.name}
  </h2>
  <p>{card.description}</p>
</div>

<style lang='scss'>
  .tarot-card {
    background-color: #000;
    color: white;
    height: calc(100% - 40px);
    outline: thin solid #666;
    padding:20px;
    width: 150px;
  }
</style>