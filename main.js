import { createOutputBlock } from "./scripts/output-block.js";
import { switchView, currentView } from "./scripts/views.js";
import { prepareKeys, prepareProgression } from "./scripts/prepare.js"

let goButton = document.getElementById("go");
goButton.addEventListener("click", go);

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

let navButtons = document.getElementsByClassName("navigation-button");

let navButtonsArray = Array.from(navButtons);

addEventListener("keydown", e => handleHotkey(e));

navButtonsArray.forEach(nb => {
    nb.addEventListener("click", () => {
        switchView(nb.dataset.view);
    });

    window.addEventListener("switchview", highlightNavButton.bind(nb));
})

function highlightNavButton() {
    if (this.dataset.view === currentView) {
        this.classList.add("selected-view");
    }
    else this.classList.remove("selected-view");
}

switchView("keys");

function go() {
    let output;

    switch (currentView) {
        case "keys": output = prepareKeys(); break;
        case "progressions": output = prepareProgression(); break;
    }

    displayOutput(output);
}

// display array by printing output blocks
function displayOutput(output) {
    let outputContainer = document.getElementById("output-container");

    let block = createOutputBlock(output);
    outputContainer.appendChild(block);
}

// clear outputs
function clear() {
    document.getElementById("output-container").innerHTML = "";
}

// event handler for hotkey configuration
function handleHotkey(e) {
    switch (e.code) {
        // G: go
        case "KeyG":
            go();
            break;
        // C: clear
        case "KeyC":
            clear();
            break;
    }
}

// TODO: fix this
function alertOnInvalidInput() {
    alert("Invalid user input.");
}