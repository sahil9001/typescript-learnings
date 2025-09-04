"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user
var myUser = {
    _id: "1234",
    name: "test",
    email: "test@t.com",
    isActive: false
};
// Change is allowed
myUser.email = "test@tt.com";
function createCardDetails(carddetails) {
}
createCardDetails({
    cardDate: 'test',
    cardnumber: 'number'
});
