import { describe, expect, it } from "vitest"

import { Balance } from "./Balance.js"

describe("Balance", () => {
  it("adds an amount", () => {
    const balance = Balance.zeroBalance()

    balance.add(1000)

    expect(balance.amount).toEqual(1000)

    balance.add(500)

    expect(balance.amount).toEqual(1500)
  })

  it("substracts an amount", () => {
    const balance = Balance.fromAmount(2000)

    balance.substract(1500)

    expect(balance.amount).toEqual(500)
  })

  it("throws if trying to substract an amount greater than the balance", () => {
    const balance = Balance.fromAmount(2000)

    expect(() => balance.substract(2500)).toThrowError()
  })
})
