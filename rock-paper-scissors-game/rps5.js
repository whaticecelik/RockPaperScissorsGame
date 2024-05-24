
let score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0
};

updateScoreElement();

function resetScore(){
  score = {
    wins:0,
    losses:0,
    ties:0
  }
  let c = document.querySelector('.auto-play-button').innerText = 'Auto Play  ';
  updateScoreElement();
  localStorage.removeItem('score');
}

function makeMove(playerMove){
  const resultElement = document.querySelector('.js-result');
  const computerMove = pickComputerMove();

  if (playerMove === computerMove) {
    resultElement.innerHTML = 'Tie.';
    score.ties++
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors' ) ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    resultElement.innerHTML = 'You won.';
    score.wins++
  } else {
    resultElement.innerHTML = 'You lost.';
    score.losses++
  }

  const movesElement = document.querySelector('.js-moves');
  movesElement.innerHTML =`YOU <img src="${playerMove}-emoji.png">    <img src="${computerMove}-emoji.png"> COMPUTER `;


  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));
}

function updateScoreElement() {
  
  const scoreElement = document.querySelector('.js-score');
  scoreElement.innerHTML= `Wins: ${score.wins},  Loses: ${score.losses},  Ties: ${score.ties}`;

}

function pickComputerMove() {
  const randomNumber =Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else {
    computerMove ='scissors';
  }

  return computerMove;
}   

let intervalId;
let isAutoPlaying = false;
function autoPlay(){
  if (!isAutoPlaying){
    // here goes an arroe function
    intervalId= setInterval(() => { const playerMove = pickComputerMove();
    makeMove(playerMove);
  } , 1000);
  let a = document.querySelector('.auto-play-button').innerText = 'Stop the Game';
    isAutoPlaying= true;
  }else {
    clearInterval(intervalId);
    isAutoPlaying= false;
    let b = document.querySelector('.auto-play-button').innerText = 'Continue ';
  }
};

document.querySelector('.rock')
  .addEventListener("click",function(){
    makeMove('rock');
  } );

  
document.querySelector('.paper')
.addEventListener('click',() => { 
  makeMove('paper')
});


document.querySelector('.scissors')
  .addEventListener('click', () => {
    makeMove('scissors')
  });


document.body.addEventListener('keydown', (event)=>{
    if (event.key === 'r') {
      makeMove('rock');
    } else if (event.key ==='p'){
      makeMove('paper');
    }else if(event.key ==='s') {
      makeMove('scissors');
    }
})

alert("You can press 'r' for rock, 'p' for paper, 's' for scissors")