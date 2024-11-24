import { generateKeys, generateProgression } from "./scripts/generate.js";
import { createOutputBlock } from "./scripts/output-block.js";

let currentView;

configureListeners();

await switchView("keys");

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
        // parse parameter inputs and generate output based on current view
        switch (currentView) {
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

// fetch unique controls of view and append them
async function switchView(view) {
    // get .html of dynamic controls
    let viewFileName = `./views/${view}.html`;

    let r = await fetch(viewFileName);
    let t = await r.text();

    // append
    let target = document.getElementById("dynamic-controls-wrapper")
    target.innerHTML = t;

    currentView = view;

    // dispatch view switch event
    let e = new Event("viewswitch");
    dispatchEvent(e);
}

// alert pop-up in case of invalid input
function alertOnInvalidInput() {
    alert("Invalid user input.");
}

// event handler for hotkey configuration
function handleHotkey(e) {
    switch (e.code) {
        // G: go
        case "KeyG":
            go();
            document.getElementById("go").focus();
            break;
        // C: clear
        case "KeyC":
            clear();
            document.getElementById("clear").focus();
            break;
    }
}

// highlight or reset nav button based on current view
function highlightNavButton() {
    if (this.dataset.view === currentView) {
        this.classList.add("selected-view");
    }
    else this.classList.remove("selected-view");
}

// startup function to add listeners for all events in use
function configureListeners() {
    // go button click
    let goButton = document.getElementById("go");
    goButton.addEventListener("click", go);

    // clear button click
    let clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clear);

    // navigation button view switches
    let navButtons = document.getElementsByClassName("navigation-button");

    let navButtonsArray = Array.from(navButtons);

    navButtonsArray.forEach(nb => {
        // view switch on button click
        nb.addEventListener("click", () => {
            switchView(nb.dataset.view);
        });
        
        // highlight and reset nav buttons on view switch
        addEventListener("viewswitch", highlightNavButton.bind(nb));
    })

    // hotkey events
    addEventListener("keydown", e => handleHotkey(e));
}