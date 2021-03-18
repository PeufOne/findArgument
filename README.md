# findarg

En: Find the argument to supply to a function for a target result.

Fr: Trouve l'argument à fournir à une fonction pour un résultat cible.

> Experimental !
> Does not work on chaotic functions !
> 

## Usage

```js
import findarg from 'findarg'

const TARGET_RESULT = 9

let argument = findarg(myFunc, TARGET_RESULT)

console.log(argument) // 3 ± 0.001

function myFunc(arg) {
    return arg**2
}

```

## Arguments

| Name         | Type     | Required | Definition                                  |
| :----------- | :------- | :------- | :------------------------------------------ |
| func         | Function | yes      | Function concerned                          |
| targetResult | Number   | yes      | Target result                               |
| options      | Object   | no       | Options to find the target argument faster. |

## Options

| Name          | type   | Default | Definition                                                                                       |
| :------------ | :----- | :------ | :----------------------------------------------------------------------------------------------- |
| keyResult     | String | null    | In the case where the function returns an object, this key allows to extract the targeted value. |
| currentArg    | Number | 1       | Argument whose result is known for the function.                                                 |
| currentResult | Number | 1       | Known result returned by the function with the aforementioned argument.                          |
| currentSlope  | Number | 1       | Slope of the function at the currentArg.                                                         |
| precision     | Number | 0.001   | Precision with which the target must be reached.                                                 |
| maxAttemps    | Number | 100     | Number of tries before abdicating.                                                               |
| isPerfLog     | Bolean | false   | Log the execution time of the resolution.                                                        |

## Return

Argument giving the target result.
If you provided the `keyResult` option, an object is returned :

```js
{
    argument: Number,
    result: {...} //<== Returned by your function
}
```

## How that work

TODO..
