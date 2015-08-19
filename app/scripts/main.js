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

  // 8 pairs
  var level = 8,
      i,
      obj = [];

  for(i = 0; i < level; i++) {
    obj.push(i);
  }

      cardSize = 100/Math.sqrt(shu.length);
  var mix = shuffle($.merge(obj, obj)),

  for(i = 0; i < mix.length; i++) {
    $('<div class="card" style="width:'+cardSize+'%; height:'+cardSize+'%;">' +
        '<div class="flipper">' +
          '<div class="front"></div>' +
          '<div class="back">' +
            '<i class="glyphicon glyphicon-plus"></i>' +
          '</div>' +
        '</div>' +
      '</div>')
    .appendTo('#card-container');
  }

});
