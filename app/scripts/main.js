(function () {
  var box = $('.slide-box'),
    list = $('.list'),
    dots = $('.dots').find('span'),
    prev = $('#prev'),
    next = $('#next'),
    index = 0,
    animated = false,
    timer;

  function showDot() {
    dots.removeClass('on');
    dots.eq(index).addClass('on');
  }

  function animate(offset) {
    var time = 300, //位移总时间
      interval = 10, //位移间隔时间
      speed = offset / (time / interval), //每次位移量
      newleft = parseInt(list.css('left'), 10) + offset;

    animated = true;

    function go() {
      var curleft = parseInt(list.css('left'), 10);
      if ((speed < 0 && curleft > newleft) || (speed > 0 && curleft < newleft)) {
        list.css('left', curleft + speed + 'px');
        setTimeout(go, interval);
      } else {
        animated = false;
        if (newleft > -600) {
          newleft = -3000;
        } else if (newleft < -3000) {
          newleft = -600;
        }
        list.css('left', newleft + 'px');
      }
    }
    go();
  }

  function play() {
    timer = setInterval(function () {
      next.click();
    }, 3000);
  }

  function stop() {
    clearInterval(timer);
  }

  next.click(function () {
    index += 1;
    if (index > 4) {
      index = 0;
    }
    showDot();
    if (!animated) {
      animate(-600);
    }
  });

  prev.click(function () {
    index -= 1;
    if (index < 0) {
      index = 4;
    }
    showDot();
    if (!animated) {
      animate(600);
    }
  });

  dots.click(function (event) {
    var target = event.target;
    if (target.className === 'on') {
      return;
    }
    var indexClicked = parseInt(target.getAttribute('index'), 10),
      offset = -600 * (indexClicked - index);

    if (!animated) {
      animate(offset);
    }
    index = indexClicked;
    showDot();
  });

  play();
  box.mouseenter(stop);
  box.mouseleave(play);
})();
