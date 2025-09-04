// keyword : readonly
// If using a db to save data, you would want nobody to modify it, so use readonly
type User = {
    readonly _id: string;
    name: string;
    email: string;
    isActive: boolean;
    // Optional field, don't have to specify
    creditCard?: string;
}

// user
let myUser: User = {
    _id: "1234",
    name: "test",
    email: "test@t.com",
    isActive: false
}

// Change is allowed
myUser.email = "test@tt.com"

// Change is not allowed
// myUser._id = "12342"

type cardNumber = {
    cardnumber: string;
}

type cardDate = {
    cardDate: string;
}

// Combine both types together
type cardDetails = cardNumber & cardDate

function createCardDetails(carddetails: cardDetails) {

}

createCardDetails({
    cardDate: 'test',
    cardnumber: 'number'
})

export { }