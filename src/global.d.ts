/// <reference types="@sveltejs/kit" />

interface CardT {
  description: string
  index: number
  name: string
}

interface appendArgs {
  deck:CardT[]
  , vals: CardT | CardT[]
}