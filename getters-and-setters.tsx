class User {

    private _courseCount = 1;

    readonly city: string = "Delhi"
    constructor(
        public email: string,
        public name: string
    ) { }
    // Annotate with 'get' keyword for getter
    get getAppleEmail(): string {
        return `apple${this.email}`;
    }

    get courseCount(): number {
        return this._courseCount;
    }

    // Setters can't have a void type, so remove any return type
    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("Course count should be more than 1");
        }
        this._courseCount = courseNum;
    }

    // Private methods
    private deleteToken() {
        console.log("Token deleted");
    }
}


export { }