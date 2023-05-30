import { type Writable, writable } from 'svelte/store'

type ExampleState = {
  dotCount: Writable<integer>,
  dotSize: Writable<integer>,
  dotMin: Writable<integer>,
  dotRot: Writable<integer>,
  animRot: Writable<boolean>,
}

export const state: Writable<ExampleState> = writable({
  dotCount: writable(0),
  dotMin: writable(50),
  dotSize: writable(350),
  dotRot: writable(0),
  animRot: writable(true),
})
