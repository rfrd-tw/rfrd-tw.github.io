(function($) {
  "use strict"; // Start of use strict

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });



  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos -0.1 && $("#mainNav").offset().top > 800) {
      document.getElementById("mainNav").style.opacity = "1";
      document.getElementById("nav-ul-hide").style.display = "block";
    } else if ($("#mainNav").offset().top > 800) {
      document.getElementById("mainNav").style.opacity = ".4";
    } else if ($("#mainNav").offset().top < 600) {
      document.getElementById("nav-ul-hide").style.display = "none";
    } else if ($("#mainNav").offset().top > 550) {
      document.getElementById("nav-ul-hide").style.display = "block";
    }

    prevScrollpos = currentScrollPos;
  }

})(jQuery); // End of use strict
