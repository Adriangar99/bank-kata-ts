import { Balance } from "./Balance.js"
import { Clock } from "./Clock.js"
import { Console } from "./Console.js"

interface Statement {
  date: Date
  amount: number
  balance: number
}

interface AccountInterface {
  deposit(amount: number): void
  withdraw(amount: number): void
  printStatement(): void
}

export class Account implements AccountInterface {
  private statements: Statement[] = []

  constructor(private balance: Balance, private console: Console, private clock: Clock) {}

  deposit(amount: number): void {
    this.balance.add(amount)

    this.statements.push({
      amount,
      balance: this.balance.amount,
      date: this.clock.now(),
    })
  }
  withdraw(amount: number): void {
    this.balance.substract(amount)

    this.statements.push({
      amount,
      balance: this.balance.amount,
      date: this.clock.now(),
    })
  }
  printStatement(): void {
    this.console.log("DATE | AMOUNT | BALANCE")

    this.statements
      .reverse()
      .forEach(({ date, amount, balance }) =>
        this.console.log(
          `${date.getDate()}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date.getFullYear()} | ${amount.toFixed(2)} | ${balance.toFixed(2)}`,
        ),
      )
  }
}
