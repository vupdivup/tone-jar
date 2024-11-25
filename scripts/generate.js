import { sample } from "/scripts/sample.js";

let data = await fetch("/data/data.json").then(r => r.json());

let keys = data["keys"];
let chords = data["chords"];

// generate a random set of major or minor keys
export function generateKeys(n, mode="major") {
    let pool = keys[mode];
    return sample(pool, n);
}

// generate a random diatonic chord progression starting from the I chord
export function generateProgression(n, include_seven=true) {
    let one = chords[0];
    let seven = chords[6];

    let pool = Array.from(chords);

    // exclude one from sampling to not select it twice
    pool = pool.filter(rn => rn !== one);
    
    if (!include_seven) {
        pool = pool.filter(rn => rn !== seven);
    }

    // set I as the first chord
    let progression = [one];

    // randomly select other chords
    progression.push(...sample(pool, n - 1));
    
    return progression;
}