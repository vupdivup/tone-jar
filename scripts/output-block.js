// create block div to display a row of values
export function createOutputBlock(cellValues) {
    let block = document.createElement("div");
    
    block.classList.add("output-block");

    cellValues.forEach(c => {
        // create cell containing display value
        let cell = document.createElement("div");

        cell.textContent = c;
        cell.classList.add("output-cell");

        block.appendChild(cell);
    });

    return block;
}
