// jshint devel:true

var FastClick;
FastClick.attach(document.body);

$(function() {

  'use strict';

  // Splash screen
  function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);
    function checkReady() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalID);
        callback.call(checkReady);
      }
    }
  }

  function show(id, value) {
    document.getElementById(id).className += value ? ' showme' : ' hideme';
  }

  onReady(function() {
    show('page', true);
    show('loading', false);
  });

  $('.md-trigger').on('click', function() {
    $(this).addClass('active');
    $('.md-modal').addClass('md-show');
  });

  $('.md-close').on('click', function() {
    $('.md-trigger').removeClass('active');
    $('.md-modal').removeClass('md-show');
  });

  $('.btn-beer').on('click', function() {
    $(this).addClass('loading');
    $('.icon-beer').toggleClass('icon-beer icon-arrows-cw');
  });

  screenSelector('show');

  $('.btn-play').on('click', function() {

    var difficulty = '',
        timer = 1000,
        level = $(this).attr('data-level'),
        selectedLevel = parseInt(level);

    // Game difficulty
    if(selectedLevel === 8) {
      difficulty = 'easy';
      timer *= level * 4;
    }
    else if(selectedLevel === 18) {
      difficulty = 'medium';
      timer *= level * 5;
    }
    else if(selectedLevel === 32) {
      difficulty = 'hard';
      timer *= level * 6;
    }

    screenSelector('hide');
    $('#card-container').addClass('on-screen' + ' ' + difficulty);

    var i,
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
        levelComplete = selectedLevel * 2,
        isAnimating = false;

    $card.on('click', function(e) {
      e.preventDefault();

      if(isAnimating) { return false; }

      $(this).addClass(activeClass);

      var data = $(this).find('.icon').attr('data-icon');

      if($cardContainer.find('.card.flipped').length > 1) {
        isAnimating = true;

        setTimeout(function() {
          var thisCard = $('.card.flipped .icon[data-icon='+data+']');
          if(thisCard.length > 1) {
            thisCard.parents('.card').toggleClass('found flipped');
            isAnimating = false;

            // Once all cards have been found
            if($('.card.found').length === levelComplete) {
              screenSelector('show');
            }

          } else {
            isAnimating = false;
            $card.removeClass('flipped');
          }
        }, 400);

      }
    });
    // End of play

    // Add timer
    $('<i class="timer"></i>')
      .prependTo($cardContainer)
      .css({'animation' : 'timer ' + timer + 'ms linear'})
      .one(animationEvent, function() {
        screenSelector('show');
    });
  });

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

  function screenSelector(state) {
    if(state === 'show') {
      $('#card-container').removeClass().one(transitionEvent, function() {
        $('#card-container').empty();
      });
      if($('.start-screen').hasClass('exit-left')) {
        $('.start-screen').removeClass('exit-left');
      }
    } else if(state === 'hide') {
      $('.start-screen').addClass('exit-left');
    }
  }

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
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }
  var transitionEvent = whichTransitionEvent();

  function whichAnimationEvent(){
    var t,
        el = document.createElement('fakeelement');

    var animations = {
      'animation'      : 'animationend',
      'OAnimation'     : 'oAnimationEnd',
      'MozAnimation'   : 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };

    for (t in animations){
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }
  var animationEvent = whichAnimationEvent();

  /**
   * Key events
   */

  $(document).keyup(function(e) {
    if(e.keyCode === 27) {
      screenSelector('show');
    }
  });

});
