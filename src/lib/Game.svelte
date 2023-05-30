<script lang="ts">
  import { onMount } from 'svelte'
  import Phaser from "phaser"
  import Interface from './Interface.svelte'
  import Dot from "./dot.js"
  import { state } from './stores.js'

  $: ({ dotSize, dotMin, dotRot, dotCount, animRot } = $state)

  const bw: integer = 800
  const bh: integer = 600
  const dotLimit: integer = 400
  $: realRot = $dotRot

  let gameRoot
  let game : Phaser.Game

  let dots: Dot[] = []

  class SvelteUIExample extends Phaser.Scene {
    sw: number
    sh: number

    create() {
      this.sw = bw
      this.sh = bh

      
      this.cameras.main.setBackgroundColor('#ffffff')


      this.input.on("pointerdown", pointer=> {
        this.spawn(pointer.worldX, pointer.worldY)
      })
      
      this.scale.on('resize', (gameSize)=> {
        this.sw = gameSize.width
        this.sh = gameSize.height
      })
    }

    update(time: number, delta: number): void {
        if ($animRot) {
          realRot = (realRot + (10 * (delta / 1000))) % 360
          rotateAll(realRot)
          $dotRot = Math.round(realRot)
        }
    }

    spawn(x: number, y: number): void {
      x = Math.floor(x)
      y = Math.floor(y)
      const d = new Dot(this, x, y, $dotSize, $dotMin, $dotRot)
      dots.push(d)
      if (dots.length > dotLimit) {
        const remove = dots.slice(0, dots.length - dotLimit)
        for (let n = 0; n < remove.length; n++) {
          remove[n].destroy(true)
        }
        dots = dots.slice(dots.length - dotLimit)
      } else {
        dots = dots
      }
    }

    randomSpawn(): void {
      const x = Math.random() * this.sw
      const y = Math.random() * this.sh
      this.spawn(x, y)
    }
  }

  onMount(()=> {
    game = new Phaser.Game({
      type: Phaser.WEBGL,
      parent: gameRoot,
      width: bw,
      height: bh,
      scale: {
        mode: Phaser.Scale.RESIZE,
      },
      scene: SvelteUIExample,
      antialias: false,
    })
  })

  const spawnDot =(): void=> {
    for (let x = 0; x < 10; x++) {
      game.scene.scenes[0].randomSpawn()
    }
  }

  const rotateAll =(a: number): void=> {
    for (let x = 0; x < dots.length; x++) {
      dots[x].rotate(a)
    }
  }

  const resizeAll =(min: number, size: number): void=> {
    for (let x = 0; x < dots.length; x++) {
      dots[x].resize(min, size)
    }
  }

  $: if (!$animRot) rotateAll(realRot)
  $: resizeAll($dotMin, $dotSize)
  $: dotCount.set(dots.length)
</script>

<div class="game" bind:this={gameRoot}>
  <Interface spawn={spawnDot} />
</div>
