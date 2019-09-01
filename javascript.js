var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

document.getElementById("startReset").onclick = function () {
  if (playing == true) {

    location.reload();
  } else {

    playing = true;
    score = 0;

    document.getElementById("scoreValue").innerHTML = score;

    show("timeRemaining");

    timeRemaining = 60;

    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

    hide("gameOver");

    document.getElementById("startReset").innerHTML = "Reset Game";

    startCountdown();

    generateQA();

  }
}

for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    if (playing == true) {
      if (this.innerHTML == correctAnswer) {
        score++;

        document.getElementById("scoreValue").innerHTML = score;

        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        generateQA();

      } else {
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  }

}

function startCountdown() {
  action = setInterval(function () {
    timeRemaining -= 1;

    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
    if (timeRemaining == 0) {
      stopCountdown();

      show("gameOver");

      document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";

      hide("timeRemaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startReset").innerHTML = "Start Game";


    }

  }, 1000);
}

function stopCountdown() {
  clearInterval(action);
}

function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

function show(Id) {
  document.getElementById(Id).style.display = "block";
}

function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;

  document.getElementById("question").innerHTML = x + "x" + y;
  var correctPosition = 1 + Math.round(3 * Math.random());

  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

  var answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1)

      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}