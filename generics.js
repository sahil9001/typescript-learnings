"use strict";
// What are generics?
Object.defineProperty(exports, "__esModule", { value: true });
var score = [];
var names = [];
function identityOne(val) {
    return val;
}
// Shouldn't be used much because uses any
function identityTwo(val) {
    return val;
}
// Type is a definition, almost like any, but the <Type> locks the value.
// If you pass a number, it will return number only
function identityThree(val) {
    return val;
}
// Will return a string
identityThree("53");
// Another way to define identityThree
function identityFour(val) {
    return val;
}
// Set a generic and return
identityFour({
    brand: "coca-cola",
    type: 2
});
