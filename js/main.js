// dark mode
$( "#dark" ).click(function() {
  $("html").toggleClass("invert");
  $("img").toggleClass("invert");
  $(".f-item").toggleClass("invert");
  $("#dark").toggleClass("darkicon");
  $(".follower").css({
    "width": "100px",
    "height": "100px",        
  });
});

// mouse hover Animation
$(".hover").hover(function () {
    // over
    $(".follower").css({
      "width": "100px",
      "height": "100px",        
      "opacity":"100%",       
    });
  }, function () {
    // out
    $(".follower").css({
      "width": "20px",
      "height": "20px",
      "opacity":"30%",       
    });
  }
);

$( ".hover" )

// cursor
$(document).on('mousemove', (event) => {
  $('.follower').css({
    left: event.clientX,
    top: event.clientY,
  });
});


// Scroll animation
idleTimer=100;
topScr = $(this).scrollTop();
timeout = 0;
$(".container").scroll(function () { 
  clearTimeout(timeout);
  curScr = $(this).scrollTop();
  diff= topScr-curScr;
  topScr=curScr;
  max=25;
  if (diff>max) {
    diff=max;
  }
  if (diff<-max) {
    diff=-max;
  }
  if (diff==1||diff==-1) {
    diff=0;
  }
  // console.log(diff);
  $(".container").css('transform', 'skewY(' + diff + 'deg)');
  diff=diff*.1;
  $(".h1").css({
    "text-shadow": "0px "+diff+"em 0px rgb(18, 40, 46)",
  });
  timeout=setTimeout(function(){
    $(".container").css('transform', 'skewY(0deg)');
    $(".h1").css({
      "text-shadow": "0px "+"0em 0px rgb(18, 40, 46)",
    });
  },idleTimer);
});