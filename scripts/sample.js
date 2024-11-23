// generate random sample without replacement
export function sample(a, n) {
    if (n <= 0 || n > a.length) {
        throw new RangeError("Invalid sample size.")
    }

    // copy array
    a = Array.from(a);

    let sample = [];

    for(let i = 0; i < n; i++) {
        // generate random (existing) index
        let r = Math.floor(Math.random() * a.length);

        // remove randomly chosen item from choice list
        let choice = a.splice(r, 1)[0];

        // add removed item to sample
        sample.push(choice);
    }

    return sample
}