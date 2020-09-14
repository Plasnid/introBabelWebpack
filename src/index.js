import { bestCheese, worstCheese } from './otherFile.js'
console.log("borkings to all and to all a good bork!");
let titleFun = `${bestCheese} ${worstCheese} are two different cheeses of interesting origin!.`;
console.log(titleFun);

let theTitler = document.querySelector("h1");
theTitler.innerText = titleFun;