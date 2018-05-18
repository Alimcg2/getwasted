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

  // Highlight reduce feature when it's selected
  $('#reduce').on('click', function (e) {
    $("#screen").attr("src", "img/screens/1.png");

    $('#reduce').addClass("selected");
    $('#connect').removeClass("selected");
    $('#explore').removeClass("selected");
    $('#equip').removeClass("selected");
  });

  // Highlight explore feature when it's selected
  $('#explore').on('click', function (e) {
    $("#screen").attr("src", "img/screens/2.png");

    $('#explore').addClass("selected");
    $('#equip').removeClass("selected");
    $('#connect').removeClass("selected");
    $('#reduce').removeClass("selected");
  });

  // Highlight equip feature when it's selected
  $('#equip').on('click', function (e) {
    $("#screen").attr("src", "img/screens/3.png");

    $('#equip').addClass("selected");
    $('#explore').removeClass("selected");
    $('#connect').removeClass("selected");
    $('#reduce').removeClass("selected");
  });

  // Highlight connect feature when it's selected
  $('#connect').on('click', function (e) {
    $("#screen").attr("src", "img/screens/4.png");

    $('#connect').addClass("selected");
    $('#explore').removeClass("selected");
    $('#equip').removeClass("selected");
    $('#reduce').removeClass("selected");
  });

})(jQuery);
