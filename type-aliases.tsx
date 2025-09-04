
// Type alias
type User = {
    name: string;
    email: string;
    isActive: boolean;
}

// Type aliases and interface are almost same
function createUser(user: User): User {
    return user;
}

createUser({ name: "test", email: "test", isActive: true });

export { }