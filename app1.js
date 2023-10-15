const frogs = document.querySelectorAll(".frog");
const lilypads = document.querySelectorAll(".lilypad");
const sound = new Audio("https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3");
const mappingTable = {
    'ONE': 1, 'TWO': 2, 'THREE': 3, 'FOUR': 4,
    'FIVE': 5, 'SIX': 6, 'SEVEN': 7, 'EIGHT': 8,
    'NINE': 9, 'TEN': 10
};

let draggedFrog = null;  // This will hold the reference to the dragged frog

function frogEnter() {
  this.classList.add("dragstart");
  this.classList.add("hide");
  draggedFrog = this;  // Save the reference to the dragged frog
}

function frogLeave() {
  this.classList.remove("dragstart", "hide");
  draggedFrog = null;  // Reset the reference to the dragged frog
}

function dragEnter(event) {
  event.preventDefault();
}

function dragOver(event) {
  event.preventDefault();
}
/*
function dropBox() {
  if (draggedFrog) {
    this.append(draggedFrog);  // Append the dragged frog to the lilypad
    sound.play();
  }
} */
function dropBox() {
    if (draggedFrog) {
        const frogNumberWord = draggedFrog.querySelector('.displayWord').textContent;
        const lilypadNumber = this.querySelector('.displayWord').textContent;
        
        this.append(draggedFrog);  // Append the dragged frog to the lilypad regardless of the match
        
        if (mappingTable[frogNumberWord] == lilypadNumber) {
            updateScore(10);  // Update the score with 10 marks for correct match
            sound.play();
        }
    }
}



// Add event listeners to each frog
frogs.forEach(frog => {
  frog.addEventListener("dragstart", frogEnter);
  frog.addEventListener("dragend", frogLeave);
});

// Add event listeners to each lilypad
lilypads.forEach(lilypad => {
  lilypad.addEventListener("dragenter", dragEnter);
  lilypad.addEventListener("dragover", dragOver);
  lilypad.addEventListener("drop", dropBox);
});


// Helper function to check for a match
function isMatch(frogText, lilypadText) {
  const frogNumber = textToNumber(frogText);
  return frogNumber && frogNumber.toString() === lilypadText;
}

// Helper function to convert text to a number
function textToNumber(text) {
  const textToNumberMap = {
    'ONE': 1, 'TWO': 2, 'THREE': 3, 'FOUR': 4,
    'FIVE': 5, 'SIX': 6, 'SEVEN': 7, 'EIGHT': 8,
    'NINE': 9, 'TEN': 10
  };
  return textToNumberMap[text];
}

// Function to update the score
function updateScore(amount) {
  const scoreboard = document.querySelector('.scoreboard span');
  const currentScore = parseInt(scoreboard.textContent, 10);
  scoreboard.textContent = currentScore + amount;
}

function animateBalloon() {
    const balloon = document.querySelector('.balloon');
    balloon.style.display = 'block';  // Make the balloon visible
    balloon.style.transition = 'transform 2s';
    balloon.style.transform = 'translateX(-50%) translateY(-100%)';  // This will move the balloon to the top and out of the screen

    
    balloon.addEventListener('transitionend', () => {
        balloon.style.display = 'none';
        balloon.style.transform = 'translateX(-50%) translateY(0)';  // Reset the transform to bring the balloon back to its original position
    });
}


