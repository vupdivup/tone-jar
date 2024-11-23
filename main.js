import { createOutputBlock } from "./scripts/output-block.js";
import { switchView, currentView } from "./scripts/views.js";
import { prepareKeys, prepareProgression } from "./scripts/prepare.js"

let goButton = document.getElementById("go");
goButton.addEventListener("click", go);

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

switchView("keys");

function go() {
    let output;

    switch (currentView) {
        case "keys": output = prepareKeys(); break;
        case "progression": output = prepareProgression(); break;
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

function alertOnInvalidInput() {
    alert("Invalid user input.");
}