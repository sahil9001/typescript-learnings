// very similar to types

// A contract for the implementer
interface User {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: string;
    // startTrail: () => string;
    startTrail(): string;
    getCoupon(couponname: string): number
}


const sahil: User = {
    dbId: 123,
    email: "sahil@s.com",
    userId: 1234,
    startTrail: () => {
        return "trail started"
    },
    // Not taking any string and still works!!!
    getCoupon: () => {
        return 10
    },
    githubToken: "abc",
}


// Reopening a interface, existing + new property
interface User {
    githubToken: string
}

// Inheritance 
interface Admin extends User {
    role: "admin" | "ta" | "learner"
}

// Difference between type alias and interface
// Interface can be extended while type cannot

export { }