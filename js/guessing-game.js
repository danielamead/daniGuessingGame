const generateWinningNumber = () => {
  return Math.ceil(Math.random() * 100);
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(guess) {
    if (typeof guess === 'number' && guess >= 1 && guess <= 100) {
      this.playersGuess = guess;
      return this.checkGuess();
    } else {
      document.querySelector('#feedback').innerHTML = 'That is an invalid guess.';
    }
  }

  checkGuess() {
    let feedback = '';

    if (this.playersGuess === this.winningNumber) {
      feedback = 'You Guessed It! Have Some Pie!';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      feedback = 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        feedback = 'You Shall Have No Pie!';
      } else {
        let diff = this.difference();
        if (diff < 10) feedback = "You're burning up!";
        else if (diff < 25) feedback = "You're lukewarm.";
        else if (diff < 50) feedback = "You're a bit chilly.";
        else feedback = "You're ice cold!";
      }
    }
    document.querySelector('#feedback').innerHTML = feedback;
    document.querySelector(`#guess${this.pastGuesses.length}`).innerHTML = this.playersGuess;
  }
}

const newGame = () => {
  return new Game();
}

const playGame = () => {
  const game = newGame();
  const button = document.querySelector('button');

  button.addEventListener('click', function() {
    const playersGuess = +document.querySelector('input').value;
    document.querySelector('input').value = '';

    game.playersGuessSubmission(playersGuess);
  });
}

{
  const playAgain = document.getElementById('reset');
  playAgain.addEventListener('click', function() {
    location.reload();
  });
}

playGame();
