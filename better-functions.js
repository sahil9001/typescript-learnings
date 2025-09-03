"use strict";
// Better ways to write functions
// 1. Always use return type from the functions
Object.defineProperty(exports, "__esModule", { value: true });
// A function with 2 return types (can be a use case)
// function getValue(myVal: number) {
//     if (myVal > 5) {
//         return true;
//     }
//     return "200 OK";
// }
// Define the return type
var getHello = function (s) {
    return "";
};
var heros = ["thor", "spiderman", "ironman"];
// On hovering over `hero` it shows inferred string type
// But we need to specify the return type for the string
heros.map(function (hero) {
    return "hero is ".concat(hero);
});
function consoleError(errmsg) {
    console.log(errmsg);
    // Invalid
    // return 1;
}
// Void is return nothing, but never is never return
// means that function throws an exception or terminates execution of the program
function handleError(errmsg) {
    throw new Error(errmsg);
}
