// Abstract classes are classes which doesn't implement functions

// Interface is implemented (implements)

class TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string
    ) { }
}
// Completely valid
const sahil = new TakePhoto("test", "Test");

// But if we have 
abstract class TakePhoto1 {
    constructor(
        public cameraMode: string,
        public filter: string
    ) { }
    abstract getSepia(): void
    // This is makes abstract classes unique
    getReelTime(): number {
        // Some complex calc
        return 8;
    }
}
// Not valid, cannot create class from abstract classes
// const sahil = new TakePhoto1("test", "Test");
class Instagram extends TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number
    ) {
        super(cameraMode, filter)
    }
    // Define & implement getSepia
    getSepia(): void {

    }
}

// 1. Can't create objects from abstract classes
// 2. Can created defined + abstract methods too.

export { }