import { describe, expect, it, vi } from "vitest"

import { Account } from "./Account.js"
import { Balance } from "./Balance.js"
import { ClockFake } from "./Clock.js"
import { ConsoleFake } from "./Console.js"

describe("Account", () => {
  it("deposits 500 euros", () => {
    const balance = Balance.zeroBalance()

    const myDate = new Date(2022, 10, 3)

    const fakeClock = new ClockFake()
    fakeClock.setNow(myDate)

    const fakeConsole = new ConsoleFake()

    const account = new Account(balance, fakeConsole, fakeClock)

    account.deposit(500)

    expect(balance.amount).toEqual(500)
  })

  it("substracts 1000 euros", () => {
    const balance = Balance.fromAmount(1001)

    const myDate = new Date(2022, 10, 3)

    const fakeClock = new ClockFake()
    fakeClock.setNow(myDate)

    const fakeConsole = new ConsoleFake()

    const account = new Account(balance, fakeConsole, fakeClock)

    account.withdraw(1000)

    expect(balance.amount).toEqual(1)
  })

  it("performs several operations", () => {
    const fakeClock = new ClockFake()
    fakeClock.setNow(new Date(2012, 0, 20))

    const fakeConsole = new ConsoleFake()

    const account = new Account(Balance.zeroBalance(), fakeConsole, fakeClock)

    account.deposit(1000)

    fakeClock.setNow(new Date(2012, 0, 23))
    account.deposit(2000)

    fakeClock.setNow(new Date(2012, 0, 24))
    account.withdraw(500)

    account.printStatement()

    expect(fakeConsole.log).toHaveBeenNthCalledWith(1, "DATE | AMOUNT | BALANCE")
    expect(fakeConsole.log).toHaveBeenNthCalledWith(2, `24/01/2012 | 500.00 | 2500.00`)
    expect(fakeConsole.log).toHaveBeenNthCalledWith(3, `23/01/2012 | 2000.00 | 3000.00`)
    expect(fakeConsole.log).toHaveBeenNthCalledWith(4, `20/01/2012 | 1000.00 | 1000.00`)
  })
})
