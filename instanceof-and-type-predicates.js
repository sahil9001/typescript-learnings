// instanceof narrowing
// JavaScript has an operator for checking whether or not a value is an “instance” of another value. More specifically, in JavaScript x instanceof Foo checks whether the prototype chain of x contains Foo.prototype. While we won’t dive deep here, and you’ll see more of this when we get into classes, they can still be useful for most values that can be constructed with new. As you might have guessed, instanceof is also a type guard, and TypeScript narrows in branches guarded by instanceofs.
// Instanceof checks for the class
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
function isFish(pet) {
    return pet.swim !== undefined;
}
function getFood(pet) {
    if (isFish(pet)) {
        // Still showing Fish | Bird (which is wrong)
        pet;
        return "fish food";
    }
    else {
        pet;
        return "bird food";
    }
}
function isFish1(pet) {
    return pet.swim !== undefined;
}
function getFood1(pet) {
    if (isFish1(pet)) {
        // Shows Fish because typecasted already
        pet;
        return "fish food";
    }
    else {
        pet;
        return "bird food";
    }
}
