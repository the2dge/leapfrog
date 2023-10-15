const mappingTable = {
    'ONE': 1, 'TWO': 2, 'THREE': 3, 'FOUR': 4,
    'FIVE': 5, 'SIX': 6, 'SEVEN': 7, 'EIGHT': 8,
    'NINE': 9, 'TEN': 10
};
let draggedFrog = null;

function frogEnter() {
    draggedFrog = this;
    this.classList.add("dragstart");
}

function frogLeave() {
    draggedFrog = null;
    this.classList.remove("dragstart");
}

function dragEnter(event) {
    event.preventDefault();
    this.classList.add("droppable-hover");
}

function dragLeave(event) {
    this.classList.remove("droppable-hover");
}

function dropBox(event) {
    event.preventDefault();
    if (draggedFrog) {
        const frogNumberWord = draggedFrog.querySelector('.displayWord').textContent;
        const lilypadNumber = this.querySelector('.displayWord').textContent;
        if (mappingTable[frogNumberWord] == lilypadNumber) {
            updateScore(10);
            // your other logic for correct match
        }
        this.appendChild(draggedFrog);  // Append the dragged frog to the lilypad
    }
    this.classList.remove("droppable-hover");
}

// Helper function to update the score
function updateScore(amount) {
    const scoreboard = document.querySelector('.scoreboard span');
    const currentScore = parseInt(scoreboard.textContent, 10);
    scoreboard.textContent = currentScore + amount;
}

// Add event listeners for mouse interaction
const frogs = document.querySelectorAll(".frog");
const lilypads = document.querySelectorAll(".lilypad");

frogs.forEach(frog => {
    frog.addEventListener("dragstart", frogEnter);
    frog.addEventListener("dragend", frogLeave);
});

lilypads.forEach(lilypad => {
    lilypad.addEventListener("dragenter", dragEnter);
    lilypad.addEventListener("dragleave", dragLeave);
    lilypad.addEventListener("dragover", event => event.preventDefault());
    lilypad.addEventListener("drop", dropBox);
});

// Add event listeners for touch interaction
frogs.forEach(frog => {
    frog.addEventListener("touchstart", frogEnter);
    frog.addEventListener("touchend", frogLeave);
});

lilypads.forEach(lilypad => {
    lilypad.addEventListener("touchmove", event => event.preventDefault(), { passive: false });
    lilypad.addEventListener("touchend", dropBox);
});



