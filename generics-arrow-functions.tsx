// What are generics?

const score: Array<number> = [];
const names: Array<string> = [];

function identityOne(val: boolean | number): boolean | number {
    return val
}

// Shouldn't be used much because uses any
function identityTwo(val: any): any {
    return val
}

// Type is a definition, almost like any, but the <Type> locks the value.
// If you pass a number, it will return number only
function identityThree<Type>(val: Type): Type {
    return val;
}

// Will return a string
identityThree("53");

// Another way to define identityThree
function identityFour<T>(val: T): T {
    return val
}

interface Bottle {
    brand: string,
    type: number
}
// Take in array and return 1 of the value in the array
function getSearchProducts<T>(products: Array<T>): T {
    return products[3];
}


// Generic arrow method
const getMoreSearchProducts = <T,>(products: T[]): T | undefined => {
    const myIndex = 4;
    return products[myIndex];
};


export { }