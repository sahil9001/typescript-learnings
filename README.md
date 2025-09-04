# TypeScript Interview Questions & Answers

This repository contains comprehensive TypeScript concepts with tough interview questions and detailed answers. Each question is designed to test deep understanding of TypeScript features, type system, and best practices.

## Table of Contents

1. [Basic Types & Type Annotations](#basic-types--type-annotations)
2. [Functions & Return Types](#functions--return-types)
3. [Interfaces vs Type Aliases](#interfaces-vs-type-aliases)
4. [Generics](#generics)
5. [Classes & Access Modifiers](#classes--access-modifiers)
6. [Abstract Classes](#abstract-classes)
7. [Type Narrowing & Type Guards](#type-narrowing--type-guards)
8. [Union Types & Literal Types](#union-types--literal-types)
9. [Tuples](#tuples)
10. [Advanced TypeScript Concepts](#advanced-typescript-concepts)

---

## Basic Types & Type Annotations

### Q1: What's the difference between `any`, `unknown`, and `never` types? When would you use each?

**Answer:**
- **`any`**: Disables type checking completely. Any value can be assigned to it, and you can access any property or method without type checking. Should be avoided in production code.
- **`unknown`**: Type-safe counterpart to `any`. You must perform type checking before using the value.
- **`never`**: Represents values that never occur. Used for functions that never return (throw errors, infinite loops).

```typescript
// any - avoid this
let hero: any = "thor";
hero = 123; // No error

// unknown - type-safe
let userInput: unknown = getUserInput();
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // Now safe
}

// never - for functions that never return
function handleError(errmsg: string): never {
  throw new Error(errmsg);
}
```

### Q2: Why should you avoid using `any` type and what are the alternatives?

**Answer:**
`any` defeats the purpose of TypeScript by disabling type checking. Alternatives include:

1. **Use specific types**: `string`, `number`, `boolean`
2. **Use `unknown`**: For truly unknown values that need type checking
3. **Use union types**: `string | number` for multiple possible types
4. **Use generics**: For reusable type-safe code

```typescript
// Bad
function processData(data: any) {
  return data.someProperty; // No type safety
}

// Good
function processData<T>(data: T): T {
  return data; // Type-safe
}

// Or with specific types
function processUser(user: { name: string; age: number }) {
  return user.name.toUpperCase();
}
```

---

## Functions & Return Types

### Q3: What's the difference between `void` and `never` return types? Provide examples.

**Answer:**
- **`void`**: Function returns nothing (undefined). Used for functions that perform side effects.
- **`never`**: Function never returns (throws error, infinite loop, or terminates execution).

```typescript
// void - returns undefined
function consoleError(errmsg: string): void {
  console.log(errmsg);
  // Implicitly returns undefined
}

// never - never returns
function handleError(errmsg: string): never {
  throw new Error(errmsg);
  // Execution stops here, never returns
}

function infiniteLoop(): never {
  while (true) {
    // Never exits
  }
}
```

### Q4: How do you handle functions that can return multiple types? Show best practices.

**Answer:**
Use union types and type guards for functions that can return different types:

```typescript
// Function with multiple return types
function getValue(myVal: number): boolean | string {
  if (myVal > 5) {
    return true;
  }
  return "200 OK";
}

// Better approach with type guards
function processValue(value: boolean | string): void {
  if (typeof value === "boolean") {
    console.log(`Boolean: ${value}`);
  } else {
    console.log(`String: ${value.toUpperCase()}`);
  }
}

// Always specify return types for clarity
const getHello = (s: string): string => {
  return `Hello ${s}`;
};
```

---

## Interfaces vs Type Aliases

### Q5: What are the key differences between interfaces and type aliases? When would you choose one over the other?

**Answer:**

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Declaration merging | ✅ Supported | ❌ Not supported |
| Extensibility | ✅ Can extend | ❌ Cannot extend |
| Computed properties | ❌ Not supported | ✅ Supported |
| Union types | ❌ Not supported | ✅ Supported |
| Primitive types | ❌ Not supported | ✅ Supported |

```typescript
// Interface - can be extended and merged
interface User {
  name: string;
  email: string;
}

// Declaration merging
interface User {
  age: number; // Merged with above
}

// Extension
interface Admin extends User {
  role: string;
}

// Type alias - more flexible
type Status = "pending" | "approved" | "rejected";
type UserWithStatus = User & { status: Status };

// Computed properties (only with type)
type Keys = "name" | "email";
type UserRecord = {
  [K in Keys]: string;
};
```

**Choose Interface when:**
- Defining object shapes that might be extended
- Working with classes
- Need declaration merging

**Choose Type Alias when:**
- Creating union types
- Need computed properties
- Working with primitives
- Creating complex type transformations

### Q6: Explain interface reopening and its practical use cases.

**Answer:**
Interface reopening allows you to add new properties to an existing interface declaration:

```typescript
interface User {
  readonly dbId: number;
  email: string;
  userId: number;
  startTrail(): string;
}

// Later in the code, you can add more properties
interface User {
  githubToken: string;
  isPremium?: boolean;
}

// Now User has all properties from both declarations
const user: User = {
  dbId: 123,
  email: "user@example.com",
  userId: 456,
  githubToken: "abc123",
  startTrail: () => "trail started"
};
```

**Use cases:**
- Adding properties to third-party library interfaces
- Extending interfaces across different modules
- Gradual interface enhancement

---

## Generics

### Q7: Explain generic constraints and provide a complex example with multiple constraints.

**Answer:**
Generic constraints limit the types that can be used with generics using the `extends` keyword:

```typescript
interface Database {
  connection: string;
  username: string;
  password: string;
}

interface Loggable {
  log(): void;
}

// Multiple constraints
function processData<T extends Database & Loggable>(data: T): T {
  data.log(); // Can call log() because of Loggable constraint
  console.log(data.connection); // Can access connection because of Database constraint
  return data;
}

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name"); // Type: string
const age = getProperty(user, "age"); // Type: number
```

### Q8: How do you create a generic class that can work with different types while maintaining type safety?

**Answer:**

```typescript
interface Product {
  name: string;
  price: number;
}

interface Course {
  title: string;
  author: string;
  duration: number;
}

// Generic class for any sellable item
class Sellable<T> {
  private cart: T[] = [];

  addToCart(item: T): void {
    this.cart.push(item);
  }

  removeFromCart(index: number): T | undefined {
    return this.cart.splice(index, 1)[0];
  }

  getCart(): T[] {
    return [...this.cart]; // Return copy to prevent external modification
  }

  getTotalItems(): number {
    return this.cart.length;
  }
}

// Usage with different types
const productStore = new Sellable<Product>();
const courseStore = new Sellable<Course>();

productStore.addToCart({ name: "Laptop", price: 999 });
courseStore.addToCart({ title: "TypeScript Course", author: "John", duration: 10 });
```

### Q9: What's the difference between generic functions and generic arrow functions? Show the syntax.

**Answer:**

```typescript
// Generic function declaration
function identity<T>(val: T): T {
  return val;
}

// Generic arrow function - note the comma after T
const getMoreSearchProducts = <T,>(products: T[]): T | undefined => {
  const myIndex = 4;
  return products[myIndex];
};

// Alternative syntax for arrow functions
const processItems = <T extends { id: number }>(items: T[]): T[] => {
  return items.filter(item => item.id > 0);
};

// Why the comma? It prevents confusion with JSX
// Without comma: <T> could be interpreted as JSX tag
// With comma: <T,> clearly indicates generic type parameter
```

---

## Classes & Access Modifiers

### Q10: Explain the difference between `private`, `protected`, and `public` access modifiers with inheritance examples.

**Answer:**

```typescript
class User {
  public email: string;        // Accessible everywhere
  private _courseCount = 1;    // Only within this class
  protected _userId: number;   // This class + subclasses
  readonly city: string = "Delhi";

  constructor(email: string, userId: number) {
    this.email = email;
    this._userId = userId;
  }

  // Getters and setters
  get courseCount(): number {
    return this._courseCount;
  }

  set courseCount(count: number) {
    if (count <= 1) {
      throw new Error("Course count should be more than 1");
    }
    this._courseCount = count;
  }

  private deleteToken(): void {
    console.log("Token deleted");
  }
}

class SubUser extends User {
  isFamily: boolean = true;

  // Can access protected members
  changeUserId(newId: number): void {
    this._userId = newId; // ✅ Allowed - protected
  }

  // Cannot access private members
  // changeCourseCount(): void {
  //   this._courseCount = 4; // ❌ Error - private
  //   this.deleteToken();    // ❌ Error - private
  // }
}

// Usage
const user = new User("user@example.com", 123);
console.log(user.email);        // ✅ Public
console.log(user.courseCount);  // ✅ Through getter
// console.log(user._courseCount); // ❌ Private
// console.log(user._userId);      // ❌ Protected
```

### Q11: How do getters and setters work in TypeScript? What are the restrictions?

**Answer:**

```typescript
class User {
  private _courseCount = 1;
  private _email: string;

  constructor(email: string) {
    this._email = email;
  }

  // Getter - no parameters, must return a value
  get courseCount(): number {
    return this._courseCount;
  }

  // Setter - exactly one parameter, no return type annotation
  set courseCount(count: number) {
    if (count <= 1) {
      throw new Error("Course count should be more than 1");
    }
    this._courseCount = count;
  }

  // Computed getter
  get getAppleEmail(): string {
    return `apple${this._email}`;
  }
}

// Usage
const user = new User("user@example.com");
console.log(user.courseCount);     // Calls getter
user.courseCount = 5;              // Calls setter
console.log(user.getAppleEmail);   // "appleuser@example.com"
```

**Restrictions:**
- Setters cannot have a return type annotation (implicitly `void`)
- Getters must return a value
- Setters must have exactly one parameter
- Cannot have both getter and setter with the same name but different types

---

## Abstract Classes

### Q12: What are abstract classes and how do they differ from regular classes and interfaces?

**Answer:**

```typescript
// Regular class - can be instantiated
class TakePhoto {
  constructor(
    public cameraMode: string,
    public filter: string
  ) {}
}

// Abstract class - cannot be instantiated directly
abstract class TakePhotoAbstract {
  constructor(
    public cameraMode: string,
    public filter: string
  ) {}

  // Abstract method - must be implemented by subclasses
  abstract getSepia(): void;

  // Concrete method - can have implementation
  getReelTime(): number {
    return 8;
  }
}

// Interface - only method signatures, no implementation
interface PhotoInterface {
  getSepia(): void;
  getReelTime(): number;
}

// Implementation
class Instagram extends TakePhotoAbstract {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burst: number
  ) {
    super(cameraMode, filter);
  }

  // Must implement abstract method
  getSepia(): void {
    console.log("Applying sepia filter");
  }

  // Can override concrete methods
  getReelTime(): number {
    return super.getReelTime() + 2;
  }
}

// Usage
// const photo = new TakePhotoAbstract("test", "test"); // ❌ Error
const instagram = new Instagram("portrait", "vintage", 3); // ✅ Valid
```

**Key differences:**
- **Abstract classes**: Can have both abstract and concrete methods, cannot be instantiated
- **Regular classes**: Can be instantiated, all methods must be implemented
- **Interfaces**: Only method signatures, no implementation, can be implemented by classes

---

## Type Narrowing & Type Guards

### Q13: Explain `instanceof` type narrowing and type predicates. When would you use each?

**Answer:**

```typescript
// instanceof narrowing
function logValue(x: Date | string) {
  if (x instanceof Date) {
    // TypeScript knows x is Date here
    console.log(x.toUTCString());
  } else {
    // TypeScript knows x is string here
    console.log(x.toUpperCase());
  }
}

// Type predicates - custom type guards
type Fish = {
  swim: () => void;
};

type Bird = {
  fly: () => void;
};

// Without type predicate - TypeScript doesn't narrow the type
function isFish(pet: Fish | Bird): boolean {
  return (pet as Fish).swim !== undefined;
}

function getFood(pet: Fish | Bird) {
  if (isFish(pet)) {
    // pet is still Fish | Bird here
    pet; // Type: Fish | Bird
    return "fish food";
  }
}

// With type predicate - TypeScript narrows the type
function isFishWithPredicate(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function getFoodWithPredicate(pet: Fish | Bird) {
  if (isFishWithPredicate(pet)) {
    // pet is now Fish here
    pet; // Type: Fish
    return "fish food";
  } else {
    // pet is Bird here
    pet; // Type: Bird
    return "bird food";
  }
}
```

**When to use:**
- **`instanceof`**: For built-in types (Date, Array, custom classes)
- **Type predicates**: For custom type guards with complex logic

### Q14: How do you handle type narrowing with `typeof` and truthiness checks? Show common pitfalls.

**Answer:**

```typescript
// typeof narrowing
function detectType(val: number | string) {
  if (typeof val === "string") {
    return val.toLowerCase(); // val is string
  }
  return val + 3; // val is number
}

// Truthiness narrowing
function provideId(id: string | null) {
  if (!id) {
    console.log("Please provide id");
    return;
  }
  id.toLowerCase(); // id is string (not null)
}

// Common pitfall - empty string is falsy
function printAll(strs: string | string[] | null) {
  // ❌ BAD - empty string is falsy but valid
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
  // This won't handle empty string case
}

// ✅ GOOD - explicit null check
function printAllCorrect(strs: string | string[] | null) {
  if (strs === null) {
    console.log("No strings provided");
    return;
  }
  
  if (typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else {
    console.log(strs); // Handles both string and empty string
  }
}
```

---

## Union Types & Literal Types

### Q15: What are literal types and how do they work with union types? Provide practical examples.

**Answer:**

```typescript
// Literal types - exact values
let pi: 3.14 = 3.14;
// pi = 3.15; // ❌ Error - only 3.14 is allowed

// Union of literal types
let seatAllotment: "aisle" | "middle" | "window";
seatAllotment = "aisle"; // ✅ Valid
// seatAllotment = "crew"; // ❌ Error

// Practical example - API responses
type ApiResponse = 
  | { status: "success"; data: any }
  | { status: "error"; message: string }
  | { status: "loading" };

function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case "success":
      console.log(response.data); // TypeScript knows data exists
      break;
    case "error":
      console.log(response.message); // TypeScript knows message exists
      break;
    case "loading":
      console.log("Loading...");
      break;
  }
}

// HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function makeRequest(method: HttpMethod, url: string) {
  // method is constrained to specific values
  return fetch(url, { method });
}
```

### Q16: How do you handle union types in arrays and what are the implications?

**Answer:**

```typescript
// Array with union types
const mixedArray: (string | number)[] = ["hello", 42, "world", 100];

// Type narrowing in array operations
function processArray(arr: (string | number)[]) {
  return arr.map(item => {
    if (typeof item === "string") {
      return item.toUpperCase(); // item is string
    } else {
      return item.toFixed(2); // item is number
    }
  });
}

// Discriminated unions - better approach
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string[] };
type ErrorState = { status: "error"; error: string };

type State = LoadingState | SuccessState | ErrorState;

function handleState(state: State) {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return state.data.join(", "); // TypeScript knows data exists
    case "error":
      return state.error; // TypeScript knows error exists
  }
}
```

---

## Tuples

### Q17: What are tuples and how do they differ from arrays? Show practical use cases.

**Answer:**

```typescript
// Array - flexible length and types
const userArray: (string | number)[] = ['hc', 1, 'extra', 2, 3];

// Tuple - fixed length and specific types
const userTuple: [string, number, boolean] = ['hc', 1, true];

// Practical use cases
// RGB color values
let rgb: [number, number, number] = [255, 123, 121];

// API response with status and data
type ApiResult<T> = [boolean, T | null, string?];
const result: ApiResult<string> = [true, "success", "optional message"];

// Destructuring with tuples
const [success, data, message] = result;
if (success && data) {
  console.log(data);
}

// Function returning multiple values
function getCoordinates(): [number, number] {
  return [10.5, 20.3];
}

const [x, y] = getCoordinates();

// CSV row
type CSVRow = [string, number, boolean, Date];
const csvData: CSVRow[] = [
  ["John", 25, true, new Date()],
  ["Jane", 30, false, new Date()]
];
```

**Key differences:**
- **Arrays**: Variable length, same type for all elements
- **Tuples**: Fixed length, specific types for each position

---

## Advanced TypeScript Concepts

### Q18: Explain the "bad behavior" with object parameter passing and how to fix it.

**Answer:**

```typescript
// Function expecting specific parameters
function createUser({ name, isActive }: { name: string; isActive: boolean }) {
  console.log(name, isActive);
}

// Direct object literal - strict checking
createUser({
  name: "sahil",
  isActive: false,
  // email: "sahil@test.com" // ❌ Error - extra property
});

// Bad behavior - object variable bypasses strict checking
let newUser = { name: "sahil", isActive: false, email: "sahil@test.com" };
createUser(newUser); // ✅ Passes but shouldn't - has extra email property

// Solutions:

// 1. Use exact object types
function createUserExact({ name, isActive }: { name: string; isActive: boolean }) {
  // Implementation
}

// 2. Use interfaces for better type safety
interface CreateUserParams {
  name: string;
  isActive: boolean;
}

function createUserInterface(params: CreateUserParams) {
  console.log(params.name, params.isActive);
}

// 3. Use readonly to prevent modification
interface ReadonlyUser {
  readonly name: string;
  readonly isActive: boolean;
}

// 4. Use utility types for strict checking
type StrictCreateUser = {
  name: string;
  isActive: boolean;
} & Record<string, never>; // Prevents extra properties
```

### Q19: How do you handle optional properties and readonly modifiers in complex types?

**Answer:**

```typescript
type User = {
  readonly _id: string;        // Cannot be modified after creation
  name: string;
  email: string;
  isActive: boolean;
  creditCard?: string;         // Optional property
  preferences?: {
    theme: "light" | "dark";
    notifications: boolean;
  };
};

// Usage
let myUser: User = {
  _id: "1234",
  name: "test",
  email: "test@t.com",
  isActive: false
  // creditCard and preferences are optional
};

// Modifications
myUser.email = "test@tt.com";     // ✅ Allowed
// myUser._id = "12342";          // ❌ Error - readonly

// Optional chaining for optional properties
if (myUser.creditCard) {
  console.log(myUser.creditCard.length);
}

// Safe access with optional chaining
console.log(myUser.preferences?.theme);

// Type intersection for combining types
type CardNumber = {
  cardnumber: string;
};

type CardDate = {
  cardDate: string;
};

type CardDetails = CardNumber & CardDate & {
  cvv?: number; // Optional CVV
};

function createCardDetails(carddetails: CardDetails) {
  // Implementation
}

createCardDetails({
  cardDate: '12/25',
  cardnumber: '1234567890'
  // cvv is optional
});
```

### Q20: Create a complex type system for a real-world application (e.g., e-commerce). Show type safety, generics, and advanced patterns.

**Answer:**

```typescript
// Base types
type ID = string;
type Timestamp = Date;
type Currency = "USD" | "EUR" | "GBP";

// Generic API response
type ApiResponse<T> = {
  success: true;
  data: T;
  timestamp: Timestamp;
} | {
  success: false;
  error: string;
  code: number;
  timestamp: Timestamp;
};

// Product system
interface BaseProduct {
  readonly id: ID;
  name: string;
  price: number;
  currency: Currency;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface DigitalProduct extends BaseProduct {
  type: "digital";
  downloadUrl: string;
  fileSize: number;
}

interface PhysicalProduct extends BaseProduct {
  type: "physical";
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  stock: number;
}

type Product = DigitalProduct | PhysicalProduct;

// User system with discriminated union
type UserRole = "customer" | "admin" | "moderator";

interface BaseUser {
  readonly id: ID;
  email: string;
  role: UserRole;
  createdAt: Timestamp;
}

interface Customer extends BaseUser {
  role: "customer";
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
  preferences: {
    currency: Currency;
    notifications: boolean;
  };
}

interface Admin extends BaseUser {
  role: "admin";
  permissions: string[];
  lastLogin?: Timestamp;
}

type User = Customer | Admin;

// Order system
interface OrderItem {
  productId: ID;
  quantity: number;
  unitPrice: number;
}

interface Order {
  readonly id: ID;
  userId: ID;
  items: OrderItem[];
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  currency: Currency;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Generic repository pattern
interface Repository<T, K = ID> {
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: K, updates: Partial<T>): Promise<T>;
  delete(id: K): Promise<boolean>;
}

// Type-safe service layer
class ProductService {
  constructor(private productRepo: Repository<Product>) {}

  async getProduct(id: ID): Promise<ApiResponse<Product>> {
    try {
      const product = await this.productRepo.findById(id);
      if (!product) {
        return {
          success: false,
          error: "Product not found",
          code: 404,
          timestamp: new Date()
        };
      }
      return {
        success: true,
        data: product,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: "Internal server error",
        code: 500,
        timestamp: new Date()
      };
    }
  }

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    try {
      const product = await this.productRepo.create(productData);
      return {
        success: true,
        data: product,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create product",
        code: 500,
        timestamp: new Date()
      };
    }
  }
}

// Type guards for runtime type checking
function isDigitalProduct(product: Product): product is DigitalProduct {
  return product.type === "digital";
}

function isPhysicalProduct(product: Product): product is PhysicalProduct {
  return product.type === "physical";
}

function isAdmin(user: User): user is Admin {
  return user.role === "admin";
}

// Usage example
async function handleProductRequest(productId: ID, user: User) {
  const productService = new ProductService(/* repository */);
  const response = await productService.getProduct(productId);
  
  if (response.success) {
    const product = response.data;
    
    // Type narrowing based on product type
    if (isDigitalProduct(product)) {
      console.log(`Download URL: ${product.downloadUrl}`);
      console.log(`File size: ${product.fileSize} bytes`);
    } else if (isPhysicalProduct(product)) {
      console.log(`Stock: ${product.stock}`);
      console.log(`Weight: ${product.weight} kg`);
    }
    
    // Check user permissions
    if (isAdmin(user)) {
      console.log(`Admin permissions: ${user.permissions.join(", ")}`);
    }
  } else {
    console.error(`Error: ${response.error} (Code: ${response.code})`);
  }
}
```

This comprehensive type system demonstrates:
- **Discriminated unions** for type-safe branching
- **Generic types** for reusable components
- **Type guards** for runtime type checking
- **Readonly properties** for immutability
- **Optional properties** for flexible data structures
- **Complex inheritance** and composition patterns
- **API response patterns** with proper error handling

---

## Conclusion

These questions cover the most challenging aspects of TypeScript that are commonly asked in senior-level interviews. The key is to understand not just the syntax, but the underlying concepts, trade-offs, and best practices. Practice implementing these patterns in real projects to solidify your understanding.

Remember:
- Always prefer type safety over convenience
- Use the most specific types possible
- Leverage TypeScript's type system to catch errors at compile time
- Understand the difference between compile-time and runtime behavior
- Practice with complex, real-world scenarios
