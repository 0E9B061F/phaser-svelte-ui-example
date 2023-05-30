<script lang="ts">
  import { state } from './stores.js'

  export let spawn

  $: ({ dotSize, dotMin, dotRot, dotCount } = $state)

  $: rotDisplay = Math.round($dotRot)
</script>

<div class="main-ui">
  <div class="ui-widget spawner">
    <div class="ui-line">
      <div class="ui-obj">{$dotCount}</div>
      <button class="ui-obj ui-btn" on:click={spawn}>SPAWN</button>
    </div>
    <div class="ui-line">
      <div class="ui-pair">
        <div class="ui-label">MIN</div>
        <input class="ui-obj ui-inp" type="number" bind:value={$dotMin} />
      </div>
      <div class="ui-pair">
        <div class="ui-label">SIZE</div>
        <input class="ui-obj ui-inp" type="number" bind:value={$dotSize} />
      </div>
    </div>
    <div class="ui-line">
      <div class="ui-pair">
        <div class="ui-label">ROTATION</div>
        <input class="ui-obj ui-inp" type="number" bind:value={$dotRot} />
      </div>
    </div>
  </div>
</div>