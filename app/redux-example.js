const redux = require('redux')

console.log('Starting redux example')

// Pure function
function add (a, b) {
    return a + b
}

// Impure function
var a = 3
function add (b) {
    // relies on external data
    return a + b
}

// Another impure function
var result
function add (a, b) {
    // updates external values, aka SIDE EFFECT
    result = a + b
}

// Yet another impure function
function add (a, b) {
    // Given same input, not guaranteed same output
    return a + b + new Date().getSeconds()
}

let startingValue = {
    name: 'Andrew',
    age: 25
}

function changeProp (obj) {
    return {
        ...obj,
        name: 'Jen'
    }
}

let res = changeProp(startingValue)
console.log(startingValue)
console.log(res)