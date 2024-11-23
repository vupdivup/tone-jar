import { generateKeys, generateProgression } from "./generate.js";

export function prepareKeys() {
    let n = parseN();

    let mode = document.querySelector("input[name='mode']:checked").value;

    return generateKeys(n, mode);
}

export function prepareProgression() {
    let n = parseN();

    let includeSeven = document.getElementById("include-seven").checked;

    return generateProgression(n, includeSeven);
}

// query and validate 'n' text input value to determine number of cells to print for each block
function parseN() {
    let nStr = document.getElementById("n").value;
    let n = parseInt(nStr);

    if (isNaN(n)) {
        alertOnInvalidInput();
        return;
    }

    return n;
}