import { vi } from "vitest"

export interface Console {
  log(text: string): void
}

export class ConsoleFake implements Console {
  log = vi.fn()
}
