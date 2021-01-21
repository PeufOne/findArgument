import findarg from './index.js'

const TARGET_RESULT = 9

let argument = findarg(myFunc, TARGET_RESULT, {isPerfLog : true})

console.log(argument) // 3 ± 0.001

function myFunc(arg) {
    return arg**2
}