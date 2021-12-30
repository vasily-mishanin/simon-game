const buttonColours = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).on("keydown touchstart", function () {
  if (!started) {
    setTimeout(() => {
      $(".hint").addClass("hidden");
    }, 1000)
    setTimeout(() => {
      nextSequence();
    }, 2000);
    $("#level-title").text("Lets go!");
    started = true;
  }
});

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
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour)
    .fadeToggle(50)
    .fadeToggle(50);
    playSound(randomChosenColour);
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
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 300);
    $("#level-title").text("Game Over! Press Any Key to Restart!");
    $(".hint").removeClass("hidden")
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