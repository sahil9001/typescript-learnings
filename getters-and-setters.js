"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(email, name) {
        this.email = email;
        this.name = name;
        this._courseCount = 1;
        this.city = "Delhi";
    }
    Object.defineProperty(User.prototype, "getAppleEmail", {
        // Annotate with 'get' keyword for getter
        get: function () {
            return "apple".concat(this.email);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "courseCount", {
        get: function () {
            return this._courseCount;
        },
        // Setters can't have a void type, so remove any return type
        set: function (courseNum) {
            if (courseNum <= 1) {
                throw new Error("Course count should be more than 1");
            }
            this._courseCount = courseNum;
        },
        enumerable: false,
        configurable: true
    });
    // Private methods
    User.prototype.deleteToken = function () {
        console.log("Token deleted");
    };
    return User;
}());
