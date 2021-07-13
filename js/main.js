//preloader
$(window).on('load', function() {
  $('#status').fadeOut();
  $('#preloader').delay(400).fadeOut('slow');
  $('.hero-anim').addClass("text-clip");
})

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
  $('.follower_border').css({
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
  diff=diff*.5;
  if (diff>max) {diff=max;}
  if (diff<-max) {diff=-max;}
  // $(".barmarker").css('top', 200*curScr/totH+'px');
  // console.log(diff);
  $(".container").css('transform', 'skewY(' + diff + 'deg)');
  diff=diff*.2;
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



//sidebar
sect_c = $('section').length;
// console.log(sect_c);
totH=$(".container").height();
for (let i = 0; i < sect_c; i++) {
  $('.sidebar').append('<div class="sidebar_child"></div>');
}
$('.sidebar_child').css('height', (20/sect_c)+'vh');
n=0;
$(".sidebar_child").eq(n).addClass("bufferd_bar");
$(".container").scroll(function(){
  curScr = $(this).scrollTop();
  n= Math.round(curScr/totH);
  // console.log(n);
  $(".sidebar_child").eq(n).addClass("bufferd_bar");
  for (let index = 0; index < sect_c; index++) {
    if (index!=n) {
      $(".sidebar_child").eq(index).removeClass("bufferd_bar"); 
    }
  }
});

$(".sidebar_child").click(function() {
  var target = $("section").eq($(this).index(".sidebar_child"));
  $(".container").scrollTo(target, 800, {easing:'swing'});
});