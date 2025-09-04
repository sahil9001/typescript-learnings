// Classes
// All variables which you haven't marked is public
// class User {
//     public email: string;
//     private name: string;
//     // Another way, no such thing as private in JS
//     #name: string;
//     readonly city: string = "Jaipur"
//     constructor(email: string, name: string) {
//         this.email = email;
//         this.name = name;
//     }
// }

// In production we use this
class User {
    readonlycity: string = "Delhi"
    constructor(
        public email: string,
        public name: string
    ) { }
}

// const sahil = new User()

export { }