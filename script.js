"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const scoreP0El = document.querySelector("#score--0");
const currentScoreP0El = document.querySelector("#current--0");
const player1El = document.querySelector(".player--1");
const scoreP1El = document.querySelector("#score--1");
const currentScoreP1El = document.querySelector("#current--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

const switchActivePlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
const resetCurrentScore = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
};

const endGame = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  diceEl.classList.add("hidden");
  playing = false;
};

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  scoreP0El.textContent = 0;
  scoreP1El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  resetCurrentScore();

  player0El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");

  activePlayer = 0;
  playing = true;
  diceEl.classList.add("hidden");
};

init();
// Setting both players's score to 0 and hiding the dice until the game starts
scoreP0El.textContent = 0;
scoreP1El.textContent = 0;
diceEl.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // Check if the dice is 1. If !true -> switch to next player
    if (dice !== 1) {
      //Adding dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switching to the next player

      resetCurrentScore();
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // Adding current score to the active player's score.
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  resetCurrentScore();

  // Checking if the score is >= 100, if so, finish the game.
  if (scores[activePlayer] >= 100) {
    endGame();
  } else {
    switchActivePlayer();
    resetCurrentScore();
  }
});

//Remove the winner's class, set all scores back to 0, current score as well
btnNew.addEventListener("click", init);
