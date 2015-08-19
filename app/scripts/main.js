// jshint devel:true
console.log('\'Allo \'Allo!');


/**
 * TODO - Start with the basics
 *
 * - Generate cards with symbols
 * - Randomise positions of cards
 * - Animation when clicked and only have a max of 2 flipped at one time
 */

$(function(){

  'use strict';

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }
});
