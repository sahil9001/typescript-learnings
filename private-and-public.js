"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
// In production we use this, without assigning and just using empty constructor
var User = /** @class */ (function () {
    function User(email, name) {
        this.email = email;
        this.name = name;
        this.readonlycity = "Delhi";
    }
    return User;
}());
