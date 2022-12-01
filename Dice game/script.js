'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const startingCondition = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
startingCondition();
//my solution
// const switchTo0 = function () {
//   player1El.classList.remove('player--active');
//   player0El.classList.add('player--active');
// };
// const switchTo1 = function () {
//   player0El.classList.remove('player--active');
//   player1El.classList.add('player--active');
// };
//

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a rndm diceroll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for rolled 1
    if (dice !== 1) {
      // add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // ugly solution
      // if (player0El.classList.contains('player--active')) {
      //   current0El.textContent = currentScore;
      // } else {
      //   current1El.textContent = currentScore;
      // }
      //
    } else {
      //switch to other p if true
      switchPlayer();
      // my solution
      // if (player0El.classList.contains('player--active')) {
      //   switchTo1();
      // } else {
      //   switchTo0();
      // }
      //
    }
  }
});

// Holding the score

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if the score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch active player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', startingCondition);
