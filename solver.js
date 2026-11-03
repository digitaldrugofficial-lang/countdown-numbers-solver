/*!
 * countdown-numbers-solver
 * Finds the shortest exact (or closest) solution to a Countdown numbers round.
 * MIT licence. https://lettercracker.co.uk/countdown-solver/
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.countdownSolve = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Solve a Countdown numbers round.
   * @param {number[]} numbers  The six (or any number of) starting numbers.
   * @param {number}   target   The target, usually 100 to 999.
   * @returns {{value:number, distance:number, steps:string[]}}
   *   value: the closest number reached, distance: how far from target,
   *   steps: the working, one operation per step, e.g. "75 × 8 = 600".
   *
   * Rules: + − × ÷ only, each number used at most once, every
   * intermediate result must be a positive whole number. Iterative
   * deepening means the first exact answer found uses the fewest steps.
   */
  function solve(numbers, target) {
    var best = { d: Infinity, steps: [], v: 0 };

    function rec(arr, steps, depth) {
      for (var i = 0; i < arr.length; i++) {
        var d = Math.abs(arr[i] - target);
        if (d < best.d || (d === best.d ? steps.length < best.steps.length : false)) {
          best = { d: d, steps: steps.slice(), v: arr[i] };
        }
      }
      if (best.d === 0 || steps.length >= depth) return;
      for (var p = 0; p < arr.length; p++) {
        for (var q = p + 1; q < arr.length; q++) {
          var x = arr[p], y = arr[q];
          if (x < y) { var t = x; x = y; y = t; }
          var rest = arr.filter(function (_, k) { return k !== p ? k !== q : false; });
          var moves = [[x + y, x + ' + ' + y]];
          if (x !== y) moves.push([x - y, x + ' − ' + y]);
          if (y !== 1) {
            moves.push([x * y, x + ' × ' + y]);
            if (x % y === 0) moves.push([x / y, x + ' ÷ ' + y]);
          }
          for (var m = 0; m < moves.length; m++) {
            steps.push(moves[m][1] + ' = ' + moves[m][0]);
            rest.push(moves[m][0]);
            rec(rest, steps, depth);
            rest.pop();
            steps.pop();
            if (best.d === 0) return;
          }
        }
      }
    }

    for (var depth = 0; depth < numbers.length; depth++) {
      rec(numbers.slice(), [], depth);
      if (best.d === 0) break;
    }
    return { value: best.v, distance: best.d, steps: best.steps };
  }

  return solve;
});
