/**
 * @typedef {object} findArgOptions Options to find the target argument faster.
 * @property {string} [keyResult=null] In the case where the function returns an object, this key allows to extract the targeted value.
 * @property {number} [currentArg=1] Argument whose result is known for the function.
 * @property {number} [currentResult=1] Known result returned by the function with the aforementioned argument.
 * @property {number} [currentSlope=1] Slope of the function at the currentArg.
 * @property {number} [precision=0.001] Precision with which the target must be reached.
 * @property {number} [maxAttemps=100] Number of tries before abdicating.
 * @property {boolean} [isPerfLog=false] Log the execution time of the resolution.
 *
 * @return {number|{argument: number, result: object}} Argument giving the target result
 */

const defaultOptions = {
    keyResult: null,
    currentArg: 1,
    currentResult: 1,
    currentSlope: 1,
    precision: 0.001,
    maxAttemps: 100,
    isPerfLog: false
};
  
/**
 * Fr: Trouve la valeur de l'argument fournit à une fonction pour un résultat cible.
 * En: Finds the value of the argument supplied to a function for a target result.
 *
 * L'approche est naïve, on essaye, on constate, on essaye, on constate...
 * Cependant, si la fonction est suffisant lisse et que la pente est connu, le problème peut être résolu en un coup.
 *
 * TODO: prise en charge des fonctions moins lisse
 * TODO: gestion des exeptions
 *
 * @param {function} func Function concerned
 * @param {number} targetResult Target result
 * @param {findArgOptions} [options]
 */
export default function findArg(func, targetResult, options) {
    let {
        keyResult,
        currentArg,
        currentResult,
        currentSlope,
        precision,
        maxAttemps,
        isPerfLog
    } = { ...defaultOptions, ...options };
  
    let tempResult = 0;
    let rest = null;
    let diff = targetResult - currentResult || 1;
    let slope = currentSlope;
    let move = 0;
    let compteur = 0;
  
    if (isPerfLog) console.time("Found argument");
  
    do {
        move = diff / slope || 1;
        currentArg += move;
    
        if (keyResult) ({ [keyResult]: tempResult, ...rest } = func(currentArg));
        else tempResult = func(currentArg);
    
        diff = targetResult - tempResult;
        slope = (tempResult - currentResult) / move;
        currentResult = tempResult;
        compteur++;
    } while (Math.abs(diff) > precision && compteur < maxAttemps);
  
    if (isPerfLog) {
      console.timeEnd("Found argument");
      console.log(
        `Found argument: ${compteur} attemp${compteur > 1 ? "s" : ""}`
      );
    }
  
    if (keyResult)
      return { argument: currentArg, result: { [keyResult]: tempResult, ...rest } };
    else return currentArg;
}
  
