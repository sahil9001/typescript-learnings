"use strict";
// Abstract classes are classes which doesn't implement functions
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
// Interface is implemented (implements)
var TakePhoto = /** @class */ (function () {
    function TakePhoto(cameraMode, filter) {
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    return TakePhoto;
}());
// Completely valid
var sahil = new TakePhoto("test", "Test");
// But if we have 
var TakePhoto1 = /** @class */ (function () {
    function TakePhoto1(cameraMode, filter) {
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    // This is makes abstract classes unique
    TakePhoto1.prototype.getReelTime = function () {
        // Some complex calc
        return 8;
    };
    return TakePhoto1;
}());
// Not valid, cannot create class from abstract classes
// const sahil = new TakePhoto1("test", "Test");
var Instagram = /** @class */ (function (_super) {
    __extends(Instagram, _super);
    function Instagram(cameraMode, filter, burst) {
        var _this = _super.call(this, cameraMode, filter) || this;
        _this.cameraMode = cameraMode;
        _this.filter = filter;
        _this.burst = burst;
        return _this;
    }
    // Define & implement getSepia
    Instagram.prototype.getSepia = function () {
    };
    return Instagram;
}(TakePhoto));
