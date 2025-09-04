// If not sure if either its one or other type
// not sure if it can be string or number
var score = 33;
score = "a nice string";
// Can use both types
var sahil = { name: "sahil", id: 213 };
sahil = { username: "sahil1", id: 244 };
function getDBId(id) {
    console.log("DB id is: ".concat(id));
}
getDBId(3);
getDBId("4");
// Property 'toLowerCase' does not exist on type 'string | number'.
//   Property 'toLowerCase' does not exist on type 'number'
function getDbId(id) {
    // id.toLowerCase();
    if (typeof id === "string") {
        id.toLowerCase();
    }
    else if (typeof id === "number") {
        id.toExponential(2);
    }
    return id;
}
// Not allowed
// const data: number[] = [1,2,"3"]
// To have both the types string and number
var data3 = ["1", 2, 3];
var pi = 3.14;
// Not allowed
// pi = 3.15
var seatAllotment;
seatAllotment = "aisle";
// Not allowed
// seatAllotment = "crew";
