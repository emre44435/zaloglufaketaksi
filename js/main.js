(function($){
  'use strict';

  const $window = $(window);
  const $header = $('.site-header');
  const $floatButtons = $('.float-btn');
  const $year = $('#year');

  $year.text(new Date().getFullYear());

  function headerState(){
    $header.toggleClass('scrolled', $window.scrollTop() > 24);
  }

  function revealOnScroll(){
    const viewBottom = $window.scrollTop() + $window.height() - 60;
    $('.reveal').each(function(){
      const $el = $(this);
      if($el.offset().top < viewBottom){
        $el.addClass('visible');
      }
    });
  }

  function showFloatButtons(){
    $floatButtons.each(function(index){
      const $btn = $(this);
      setTimeout(function(){
        $btn.addClass('show');
      }, 160 * index);
    });
  }

  function animateCounters(){
    $('.stat strong').each(function(){
      const $counter = $(this);
      if($counter.data('done')) return;
      const triggerPoint = $window.scrollTop() + $window.height();
      if($counter.offset().top < triggerPoint){
        $counter.data('done', true);
        $({ value: 0 }).animate({ value: Number($counter.data('count')) }, {
          duration: 1200,
          easing: 'swing',
          step: function(now){
            $counter.text(Math.ceil(now));
          }
        });
      }
    });
  }

  $('a[href^="#"]').on('click', function(event){
    const target = $(this.getAttribute('href'));
    if(target.length){
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: target.offset().top - 82 }, 650);
      $('.navbar-collapse').collapse('hide');
    }
  });

  $('.service-card, .quick-item').on('mousemove', function(e){
    const $card = $(this);
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - .5) * -3;
    const rotateY = ((x / rect.width) - .5) * 3;
    $card.css('transform', `translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }).on('mouseleave', function(){
    $(this).css('transform', '');
  });

  $window.on('scroll', function(){
    headerState();
    revealOnScroll();
    animateCounters();
  });

  $window.on('load', function(){
    headerState();
    revealOnScroll();
    showFloatButtons();
    animateCounters();
  });
})(jQuery);
