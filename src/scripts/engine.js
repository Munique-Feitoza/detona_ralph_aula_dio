const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    resetBtn: document.querySelector(".resetBtn"),
    lives: document.querySelector("#lives")
  },
  values: {
    timerId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    livesExist: 2,
    countDownTimerId: setInterval(countDown, 1000),
    scoreFinal: 0
  }
}


function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  
  if(state.values.currentTime <= 0) {
    clearInterval(state.values.timerId);
    clearInterval(state.values.countDownTimerId);
    state.values.timerId = null;
    state.values.hitPosition = 0;
    state.values.result = 0;
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
    if (state.values.livesExist >= 0) {
      state.values.countDownTimerId = setInterval(countDown, 1000);
      start();
      state.view.lives.textContent = `x${state.values.livesExist--}`;
    } else {
      alert(`O jogo acabou, mais sorte na próxima vez, você fez ${state.values.scoreFinal} pontos`);
      state.values.scoreFinal = 0;
      state.values.livesExist = 3;
      state.view.lives.textContent = `x${state.values.livesExist}`;
      reset();
    }
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  })
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if(square.id === state.values.hitPosition) {
        state.values.result++;
        state.values.scoreFinal++
        state.view.score.textContent = state.values.result++;
        state.values.hitPosition = null;
        playSound("hit");
      }
    })
  })
}

function reset() {
  state.view.resetBtn.addEventListener("click", () => {
    clearInterval(state.values.timerId);
    clearInterval(state.values.countDownTimerId);
    state.values.timerId = null;
    state.values.hitPosition = 0;
    state.values.result = 0;
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
    state.values.countDownTimerId = setInterval(countDown, 1000);
    
    start();
  });
}



function start() {
  moveEnemy();
  addListenerHitBox();
  reset();
}

start();

