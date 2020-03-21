const buttonColours = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).on('keydown' || 'click touch', (function () {
  if (!started) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
    $("#level-title").text("Lets go!");
    started = true;
  }
}));

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour)
    .fadeToggle(50)
    .fadeToggle(50);
  let sound = new Audio("sounds/" + randomChosenColour + ".mp3");
  sound.play();
  gamePattern.push(randomChosenColour);
}

function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("right");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press Any Key to Restart!");
    startOver();
    console.log("wrong");
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

///////////////////////////////// THE GAME /////////////////////////////////////////