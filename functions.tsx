// What should be mindset for functions in TS?
// 

function addTwo(num) {
    return num + 2;
}

// The problem: when we hover, it says num : any
//  User can pass any type, even string, which is wrong
addTwo(5);
// This works but shouldn't
addTwo("5");

// Strict type check
function addTwoNew(num: number) {
    return num + 2;
}

// No type, again val : any
// Use type annotation, hence changed to val: string
function getUpper(val: string) {
    return val.toUpperCase()
}


function signUpUser(name, email, password) {

}

// We can use signUpUser(1,2,3) -> which is wrong

// Stricter type check
const loginUser = function signUpUserTS(name: string, email: string, isPaid: boolean) {

}
// This will fail because doesn't have isPaid
// loginUser("a","a@a.com");

export { }