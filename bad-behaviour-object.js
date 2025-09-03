"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// An object
var User = {
    name: "sahil",
    email: "sahil@test.com",
    isActive: true
};
// Basics of object passing + typescript
function createUser(_a) {
    var string = _a.name, boolean = _a.isActive;
}
createUser({
    name: "sahil",
    isActive: false
});
// Return an object from object
function createCourse() {
    return { name: "reactjs", price: 399 };
}
// bad behaviour, this breaks
// createUser({
//     name: "sahil",
//     isActive: false,
//     email: "sahil@test.com"
// });
var newUser = { name: "sahil", isActive: false, email: "sahil@test.com" };
// This passes even with email, which shouldn't be allowed
createUser(newUser);
