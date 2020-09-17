// * This file is an ES6 module.  We choose what we export from this file!

// * In this file we declare variables for export!
let bestCheese = "cheddar";
let worstCheese = "Pied-de-Vent";

function getDogYears (humanYears) {
    return humanYears * 7;
}

// * we are exporting an object from our file that contains only what we want it too!
export { bestCheese, worstCheese, getDogYears };