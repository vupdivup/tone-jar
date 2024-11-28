import { generateKeys, generateProgression } from "./generate.js";
import { createOutputBlock } from "./output-block.js";

let currentPage = document.body.dataset.page;

configureListeners();

// parse inputs and generate block
function go() {
    let output;

    // parse n to determine number of cells for each output
    let nStr = document.getElementById("n").value;
    let n = parseInt(nStr);

    // alert if n input is invalid
    if (!n) {
        alertOnInvalidInput();
        return;
    }

    try {
        // parse parameter inputs and generate output based on current page
        switch (currentPage) {
            case "keys":
                let mode = document.querySelector("input[name='mode']:checked").value;
    
                output = generateKeys(n, mode);
                break;
    
            case "progressions":
                let includeSeven = document.getElementById("include-seven").checked;
    
                output = generateProgression(n, includeSeven);
                break;
        }
    }
    catch (error) {
        alertOnInvalidInput();
        console.log(error)
        return;
    }

    // append output array to DOM as output block
    let outputContainer = document.getElementById("output-container");
    let block = createOutputBlock(output);
    outputContainer.appendChild(block);
}

// clear outputs
function clear() {
    document.getElementById("output-container").innerHTML = "";
}

// alert pop-up in case of invalid input
function alertOnInvalidInput() {
    alert("Invalid user input.");
}

// event handler for hotkey configuration
function handleHotkey(e) {
    // bypass if an input is focused
    if (document.activeElement instanceof HTMLInputElement) return;

    document.activeElement.blur();

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

// startup function to add listeners for all events in use
function configureListeners() {
    // go button click
    let goButton = document.getElementById("go");
    goButton.addEventListener("click", go);

    // clear button click
    let clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clear);

    // hotkey events
    addEventListener("keydown", e => handleHotkey(e));
}