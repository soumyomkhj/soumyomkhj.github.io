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
var topScr = $(this).scrollTop();
$(".container").scroll(function () { 
  var curScr = $(this).scrollTop();
  var diff= topScr-curScr;
  topScr=curScr;
  var max=25;
  if (diff>max) {
    diff=max;
  }
  if (diff<-max) {
    diff=-max;
  }
  if (diff==1||diff==-1) {
    diff=0;
  }
  //console.log(diff);
  $(".container").css('transform', 'skewY(' + diff + 'deg)');
  diff=diff*.1;
  $(".h1").css({
    "text-shadow": "0px "+diff+"em 0px rgb(18, 40, 46)",
  });
});