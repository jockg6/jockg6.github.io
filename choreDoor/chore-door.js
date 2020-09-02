/**********************************************************
global varibles
**********************************************************/
//variables that access different parts of the DOM (document object model)
let doorImage1 = document.querySelector('#door1');
let doorImage2 = document.querySelector('#door2');
let doorImage3 = document.querySelector('#door3');
let startButton = document.querySelector('#start');  // variable for gameOver function

// closed_door / behind_door image paths
let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';  // variable for isClicked function

// variables for randomChoreDoorGenerator function
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;


let currentlyPlaying = true;

/**********************************************************
functions
**********************************************************/
// function to determine if chore-bot is behind selected door
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;  // chore-bot is behind this door
  } else {
    return false;  // chore-bot is not behind this door
  }
};

// function to allow same door to only be clicked once per game
const isClicked = (door) => {
  if (door === closedDoorPath) {
    return false;  // door hasn't been opened yet
  } else {
    return true;  // door has been opened
  }
};

// function to decrease number of closed doors and check if the game is over (all doors opened)
const playDoor = (door) => {
  numClosedDoors--;  // decrement the number of closed doors
  if (numClosedDoors === 0) {
    gameOver('win');  // call the game over function with an argument of 'win' when all doors have been opened, and chore-bot wasn't found until last door
  } else if (isBot(door)) {
    gameOver();  // call the game over function with no argument if chore-bot is found before all doors have been opened (i.e. player has lost)
  }
};

// function to randomly generate which door has the chore-bot behind it
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;    // chore-bot is behind door 1 !!!!
      openDoor2 = beachDoorPath;  // beach is behind door 2
      openDoor3 = spaceDoorPath;  // space is behind door 3
      break;
    case 1:
      openDoor1 = spaceDoorPath;  // space is behind door 1
      openDoor2 = botDoorPath;    // chore-bot is behind door 2 !!!!
      openDoor3 = beachDoorPath;  // beach is behind door 3
      break;
    case 2:
      openDoor1 = beachDoorPath;  // beach is behind door 1
      openDoor2 = spaceDoorPath;  // space is behind door 2
      openDoor3 = botDoorPath;    // chore-bot is behind door 3 !!!!
      break;
    default:
      console.log('ERROR');  // function shouldn't get in here
      break;
  }
};

// function to change the image of door 1 on mouse click event
doorImage1.onclick = () => {
  // test function working by making body background color red
  //document.body.style.backgroundColor = 'red';
  
  // only run code if player still playing AND door has NOT been opened yet
  if (currentlyPlaying && !isClicked(doorImage1.src)) {
    // change src of the img element (i.e. change the picture displayed)
    doorImage1.src = openDoor1;
  
    // call the play door function now that a door has been opened
    playDoor(doorImage1);
  }
};

// function to change the image of door 2 on mouse click event
doorImage2.onclick = () => {
  // only run code if player still playing AND door has NOT been opened yet
  if (currentlyPlaying && !isClicked(doorImage2.src)) {
    // change src of the img element (i.e. change the picture displayed)
    doorImage2.src = openDoor2;
  
    // call the play door function now that a door has been opened
    playDoor(doorImage2);
  }
};

// function to change the image of door 3 on mouse click event
doorImage3.onclick = () => {
  // only run code if player still playing AND door has NOT been opened yet
  if (currentlyPlaying && !isClicked(doorImage3.src)) {
    // change src of the img element (i.e. change the picture displayed)
    doorImage3.src = openDoor3;
  
    // call the play door function now that a door has been opened
    playDoor(doorImage3);
  }
};

// function to start a new round (reset global variables)
const startRound = () => {
  // initialise values, i.e. set doors closed etc
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  currentlyPlaying = true;
  
  // determine which door chore-bot is behind
  randomChoreDoorGenerator();
};

// function to start a new round on mouse click event of the start button
startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
};

// function to run when game is over
const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
  } else {
    startButton.innerHTML = 'Game over! Play again';
  }
  currentlyPlaying = false;  // player is no longer playing once game over is run
};


// start a new round of the game when page is first loaded 
startRound();
