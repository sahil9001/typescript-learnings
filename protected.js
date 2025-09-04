"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(email, name) {
        this.email = email;
        this.name = name;
        // Cannot access outside the class
        // private _courseCount = 1;
        // Change to protected (available to this class + anyone who inherits this)
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
var SubUser = /** @class */ (function (_super) {
    __extends(SubUser, _super);
    function SubUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Acquires all the public properties
        _this.isFamily = true;
        return _this;
        // Property '_courseCount' is private and only accessible within class 'User'.ts if _courseCount is private
        // changeCourseCount() {
        //     this._courseCount = 4;
        // }
    }
    return SubUser;
}(User));
