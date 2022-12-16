export interface Clock {
  now(): Date
}

export class ClockFake implements Clock {
  private date?: Date

  now() {
    return this.date ?? new Date()
  }

  setNow(date?: Date) {
    this.date = date
  }
}
