(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Show explore feature description when it's clicked
  $('#explore').on('click', function (e) {
    $('#explore-descr').removeClass("d-none");
    $('#explore').addClass("selected");

    $('#equip-descr').addClass("d-none");
    $('#equip').removeClass("selected");

    $('#connect-descr').addClass("d-none");
    $('#connect').removeClass("selected");

    $('#reduce-descr').addClass("d-none");
    $('#reduce').removeClass("selected");
  });

  // Show equip feature description when it's clicked
  $('#equip').on('click', function (e) {
    $('#equip-descr').removeClass("d-none");
    $('#equip').addClass("selected");

    $('#explore-descr').addClass("d-none");
    $('#explore').removeClass("selected");

    $('#connect-descr').addClass("d-none");
    $('#connect').removeClass("selected");

    $('#reduce-descr').addClass("d-none");
    $('#reduce').removeClass("selected");
  })

  // Show connect feature description when it's clicked
  $('#connect').on('click', function (e) {
    $('#connect-descr').removeClass("d-none");
    $('#connect').addClass("selected");
    
    $('#explore-descr').addClass("d-none");
    $('#explore').removeClass("selected");

    $('#equip-descr').addClass("d-none");
    $('#equip').removeClass("selected");
    
    $('#reduce-descr').addClass("d-none");
    $('#reduce').removeClass("selected");
  })

  // Show reduce feature description when it's clicked
  $('#reduce').on('click', function (e) {
    $('#reduce-descr').removeClass("d-none");
    $('#reduce').addClass("selected");
    
    $('#connect-descr').addClass("d-none");
    $('#connect').removeClass("selected");
    
    $('#explore-descr').addClass("d-none");
    $('#explore').removeClass("selected");

    $('#equip-descr').addClass("d-none");
    $('#equip').removeClass("selected");
  })

})(jQuery);
