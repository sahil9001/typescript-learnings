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

// Set a generic and return
identityFour<Bottle>({
    brand: "coca-cola",
    type: 2
})

export { }