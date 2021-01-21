import findArg from './index.js'

function myFunc(arg) {
    return arg**2
}

const targetResult = 9

const argument = findArg(myFunc, targetResult, {isPerfLog : true})

console.log(argument) // 3 ± 0.001
