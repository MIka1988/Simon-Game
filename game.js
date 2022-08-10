var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(".button").on("click",(function() {
  if (!gameStarted) {
    setTimeout(function(){
      $("#level-title").text("Level " + level);
      nextSequence();
      gameStarted = true;
    },1000);
  }

}));



$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $(".inner").text("Еще раз");
    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  $(".inner").text("Играть");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);

}



function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);

}
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
