// variables pour les questions/réponses
let questions = [];
let reponses = [];
let question;
let sectionQuestion = document.querySelector(".question");
let sectionReponse = document.querySelector(".reponses");
let next = document.querySelector(".next");
let index = 0;
let score = 0;

// variables pour le timer
const timerElement = document.querySelector(".timer");
let intervalTimer = null;
let temps = 30;
let timers = [];

fetch("/api/questions/1")
  .then((res) => res.json())
  .then((res) => {
    questions = res;
    shuffleQuestions(questions)
    if (questions.length > 0) {
      question = questions[index];
      sectionQuestion.innerHTML = question.question;
      insertAswers();
      startTimer();
    }
  });

function insertAswers() {
  fetch("/api/reponses/" + question.id_question)
    .then((res) => res.json())
    .then((res) => {
      reponses = res;
      sectionReponse.innerHTML = "";
      reponses.forEach((reponse) => {
        r = document.createElement("button");
        r.className = "reponse";
        r.innerHTML = "<i></i>" + reponse.reponse;
        sectionReponse.appendChild(r);
        checkAnswer(r, reponse.correct);
        showAnswerDelay(r, reponse.correct);
      });
      next.addEventListener("click", () => {
        nextQuestion();
      });
    });
}

function checkAnswer(r, correct) {
  r.addEventListener("click", () => {
    if (correct) {
      r.classList.add("true");
      score += temps * 10;
      console.log(score);
      stopTimer();
      removeDelay();
      noClick();
    } else {
      r.classList.add("false");
      stopTimer();
      removeDelay();
      noClick();
    }
  });
}

function showAnswer(r, correct) {
  if (correct) {
    r.classList.add("true");
    stopTimer();
  } else {
    r.classList.add("false");
    stopTimer();
  }
}

function showAnswerDelay(r, correct) {
  timers.push(
    setTimeout(() => {
      showAnswer(r, correct);
      noClick();
    }, 5000)
  );
}

function nextQuestion() {
  index++;
  if (index < questions.length && index<10) {
    question = questions[index];
    sectionQuestion.innerHTML = question.question;
    insertAswers();
    startTimer();
    removeNoClick();
  } else {
    fetch("/api/score", {
      method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        id_user:2, score, id_quizz:1
      })
    })
    console.log("direction page classement");
  }
}

function noClick() {
  sectionReponse.style = "pointer-events: none"
}

function removeNoClick() {
  sectionReponse.style = "pointer-events: auto"
}

function timer() {
  let secondes = parseInt(temps % 60, 10);
  secondes = secondes < 10 ? "0" + secondes : secondes;
  timerElement.innerText = `${secondes}s`;
  temps = temps <= 0 ? 0 : temps - 1;
}

function startTimer() {
  intervalTimer = setInterval(timer, 1000);
  temps = 30;
}

function stopTimer() {
  clearInterval(intervalTimer);
}

function removeDelay() {
  timers.forEach((timer) => {
    clearTimeout(timer);
  });
}

function shuffleQuestions(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}