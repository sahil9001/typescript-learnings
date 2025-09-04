// If not sure if either its one or other type
// not sure if it can be string or number
let score: number | string = 33;
score = "a nice string";


type User = {
    name: string;
    id: number;
}

type Admin = {
    username: string;
    id: number;
}

// Can use both types
let sahil: User | Admin = { name: "sahil", id: 213 };

sahil = { username: "sahil1", id: 244 }

function getDBId(id: number | string) {
    console.log(`DB id is: ${id}`);
}

getDBId(3);
getDBId("4");

// Property 'toLowerCase' does not exist on type 'string | number'.
//   Property 'toLowerCase' does not exist on type 'number'
function getDbId(id: number | string) {
    // id.toLowerCase();
    if (typeof id === "string") {
        id.toLowerCase();
    } else if (typeof id === "number") {
        id.toExponential(2);
    }
    return id;
}

// Not allowed
// const data: number[] = [1,2,"3"]

// To have both the types string and number
const data3: (string | number)[] = ["1", 2, 3]

let pi: 3.14 = 3.14
// Not allowed
// pi = 3.15


let seatAllotment: "aisle" | "middle" | "window";

seatAllotment = "aisle";

// Not allowed
// seatAllotment = "crew";
