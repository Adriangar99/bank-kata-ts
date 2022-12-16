export class Balance {
  private _amount: number

  private constructor(amount: number) {
    this._amount = amount
  }

  static zeroBalance() {
    return new Balance(0)
  }

  static fromAmount(amount: number) {
    return new Balance(amount)
  }

  add(amount: number) {
    this._amount += amount
  }

  substract(amount: number) {
    const result = this._amount - amount

    if (result < 0) throw new Error()

    this._amount = result
  }

  get amount() {
    return this._amount
  }
}
