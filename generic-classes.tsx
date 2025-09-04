// You can declare a type parameter that is constrained by another type param.

interface Database {
    connection: string;
    username: string;
    password: string;
}


// As U extends Database, it can use Database
function anotherFunction<T, U extends Database>(valOne: T, valTwo: U): object {
    return {
        valOne,
        valTwo
    }
}

// Argument of type 'number' is not assignable to parameter of type 'Database'.ts(2345)
// anotherFunction(3, 5.4)

// We can use class types in generics

interface Quiz {
    name: string;
    type: string;
}

interface Course {
    name: string,
    author: string,
    subject: string,
}

// Generic classes to add to anything
class Sellable<T> {
    public cart: T[] = []

    addToCart(products: T) {
        this.cart.push(products);
    }
}