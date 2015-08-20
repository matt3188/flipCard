/* jshint devel:true, FastClick:false */

/**
 * TODO - Start with the basics
 *
 * - Create intro scene
 * - Add differnet difficulties
 * - Keep track of score
 * - Add timer
 */

FastClick.attach(document.body);

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

  var mix = shuffle($.merge(obj, obj)),
      cardSize = 100/Math.sqrt(mix.length);

  for(i = 0; i < mix.length; i++) {

    var icon = mix[i];
    if(icon < 10) {
      icon = '0' + icon;
    }

    $('<div class="card" style="width:'+cardSize+'%; height:'+cardSize+'%;">' +
        '<div class="flipper">' +
          '<div class="front"></div>' +
          '<div class="back">' +
            '<i class="icon icon-' + icon + '" data-icon="' + icon + '"></i>' +
          '</div>' +
        '</div>' +
      '</div>')
    .appendTo('#card-container');
  }

  var activeClass = 'flipped',
      $cardContainer = $('#card-container'),
      $card = $('.card'),
      isAnimating = false;

  $card.on('click', function(e) {
    e.preventDefault();

    if(isAnimating) return false;

    $(this).addClass(activeClass);

    var data = $(this).find('.icon').attr('data-icon');

    if($cardContainer.find('.card.flipped').length > 1) {
      isAnimating = true;
      setTimeout(function() {

        var thisCard = $('.card.flipped .icon[data-icon='+data+']');

        if(thisCard.length > 1) {
          isAnimating = false;
          thisCard.parents('.card').toggleClass('found').on(transitionEvent, function() {
            $(this).removeClass('flipped');
          });
        } else {
          isAnimating = false;
          $card.removeClass('flipped');
        }

      }, 500);
    }
  });

  function whichTransitionEvent(){
    var t,
        el = document.createElement('fakeelement');

    var transitions = {
      'transition'      : 'transitionend',
      'OTransition'     : 'oTransitionEnd',
      'MozTransition'   : 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  }
  var transitionEvent = whichTransitionEvent();

});
