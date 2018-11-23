var onReady = function() {

  //settings
  var slider = document.querySelector('.slider');
  var state = document.querySelector('.state');

  var progress = slider.value / 100;
  var empty_arc = '#ffffff';
  var full_arc = '#ff0220';
  var transparent = 'transparent';

  var width = '10px';

  var cover1 = document.querySelector('.cover-1');
  var cover2 = document.querySelector('.cover-2');

  //init
  function init() {
    cover1.style.border = width + ' ' + full_arc + ' solid';
    cover1.style.borderTopColor = transparent;
    cover1.style.borderRightColor = transparent;
    cover1.style.transform = 'none';

    var cover1Style = window.getComputedStyle(cover1);

    cover2.style.border = width + ' ' + full_arc + ' solid';
    cover2.style.borderBottomColor = transparent;
    cover2.style.borderLeftColor = transparent;
    cover2.style.marginTop = '-' + width;
    cover2.style.marginLeft = '-' + width;
    cover2.style.width = parseFloat(cover1Style.width) + 'px';
    cover2.style.height = parseFloat(cover1Style.height) + 'px';
    cover2.style.transform = 'none';

    state.innerHTML = progress * 100 + '%';
  }

  function draw() {
    init();

    if (progress > 0.5) {
      cover2.style.borderTopColor = full_arc;
      cover2.style.borderRightColor = full_arc;

    } else {

      var style = window.getComputedStyle(cover2);
      //set cover 1 as higher
      //set color to background
      cover2.style.borderBottomColor = empty_arc;
      cover2.style.borderLeftColor = empty_arc;
      cover2.style.borderTopColor = transparent;
      cover2.style.borderRightColor = transparent;

      function inc(attr, i) {
        cover2.style[attr] = parseFloat(style[attr]) + i + 'px';
      }

      //clear stick out
      inc('width', -2);
      inc('height', -2);
      inc('marginTop', -1);
      inc('marginLeft', -1);
      inc('borderWidth', 2);

    }

    var p = (1 - progress) * 360;
    cover1.style.transform = 'rotate(-' + p + 'deg)';
    cover2.style.transform = 'rotate(' + p + 'deg)';
  };
  draw();

  slider.addEventListener('input', function() {
    progress = slider.value / 100;
    draw();
  });

};

document.addEventListener('DOMContentLoaded', onReady, false);