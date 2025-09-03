// Any keyword -> used to get away from type checks

// no idea what you will put in this
let hero;

function getHero() {
    return "thor";
    // can use "return true" too
}
// automatic inference
hero = getHero();

// Setting in the typescript config to avoid using 'any'