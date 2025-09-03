// An object
const User = {
    name: "sahil",
    email: "sahil@test.com",
    isActive: true
}

// Basics of object passing + typescript
function createUser({
    name: string,
    isActive: boolean
}) {

}

createUser({
    name: "sahil",
    isActive: false
});

// Return an object from object
function createCourse(): { name: string, price: number } {
    return { name: "reactjs", price: 399 }
}


// bad behaviour, this breaks
// createUser({
//     name: "sahil",
//     isActive: false,
//     email: "sahil@test.com"
// });


let newUser = { name: "sahil", isActive: false, email: "sahil@test.com" };

// This passes even with email, which shouldn't be allowed
createUser(newUser);

export { };