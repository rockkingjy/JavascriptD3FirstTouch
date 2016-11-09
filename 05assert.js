'use strict';

//copy this
var assert = function(something, message) {
    if (!something) {
        console.error('Error: ' + message);
    }
}; //stop here

assert(1 + 1 === 2, 'addition should work');


/**
 * tells if a * x^2 + b * x + c = 0 has a solution
 * @param a
 * @param b
 * @param c
 */
var polynomialHasSolution = function(a, b, c) {
    var delta = b * b - 4 * a * c ;
    return delta >= 0;
};

assert(polynomialHasSolution(1, -2, 3) === false,
    'This one has no solution');

assert(polynomialHasSolution(1, 2, -3) === true,
    'This one has a solution');

assert(polynomialHasSolution(1, 20, -3) === true,
    'This one has a solution');