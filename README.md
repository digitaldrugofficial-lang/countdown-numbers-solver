# Countdown Numbers Solver (JavaScript)

A small, dependency-free JavaScript solver for the **Countdown numbers round**: give it six numbers and a target, and it returns the **shortest exact solution**, or the closest possible answer when the target cannot be reached.

**[Try the live demo](https://digitaldrugofficial-lang.github.io/countdown-numbers-solver/)** · Full letters, numbers and conundrum solver: **[LetterCracker Countdown Solver](https://lettercracker.co.uk/countdown-solver/)**

## Example

```js
const solve = require('./solver.js');

solve([25, 50, 75, 100, 3, 6], 952);
// {
//   value: 952,
//   distance: 0,
//   steps: [ '75 × 3 = 225', '100 + 6 = 106', '225 × 106 = 23850',
//            '23850 − 50 = 23800', '23800 ÷ 25 = 952' ]
// }
```

In the browser, include `solver.js` and call `countdownSolve(numbers, target)`.

## Rules it follows

- Operations: addition, subtraction, multiplication and division.
- Each starting number can be used once; you do not have to use them all.
- Every step must give a positive whole number (no fractions, no negatives).
- Pointless steps (× 1, ÷ 1) are skipped.

## How it works

The solver uses **iterative deepening**: it first tries every one-step answer, then every two-step answer, and so on. The first exact match it finds therefore uses the fewest operations, which is what you want when explaining the working. If no exact answer exists, it returns the closest number it reached and the shortest way to get there.

For hand-solving methods (estimating from the largest number, the 25/50/75/100 shortcuts and more), see the [Countdown numbers strategy guide](https://lettercracker.co.uk/countdown-numbers-strategy/). To practise, play [Countdown Maths](https://lettercracker.co.uk/countdown-maths/) or the full [Countdown game](https://lettercracker.co.uk/countdown-game/).

## How often is a target reachable?

From 3,600 random rounds run through this solver:

| Targets | Exact answer possible (1 large / 2 large) | Average shortest working |
|---|---|---|
| 100 to 299 | 99.8% / 100% | 3.1 / 2.9 steps |
| 300 to 599 | 98.8% / 99.5% | 3.6 / 3.4 steps |
| 600 to 999 | 96.0% / 96.3% | 3.9 / 3.8 steps |

## Licence

MIT. See [LICENSE](LICENSE).

Not affiliated with Channel 4 or Countdown. Made by Muhammad Moazzam at [LetterCracker](https://lettercracker.co.uk/).
