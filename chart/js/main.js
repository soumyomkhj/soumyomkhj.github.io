//preloader
$(window).on('load', function() {
  $('#status').fadeOut();
  $('#preloader').delay(800).fadeOut('slow');
  $('.hero-anim').delay(400).addClass("text-clip");
})

dark =1;


$(".img").click(function (e) { 
  // window.location.replace("/claytime.html");
  $('#status').fadeIn();
  $('#preloader').delay(500).fadeIn('slow');
});



// dark mode
$( "#dark" ).click(function() {
  dark=-dark;
  $("html").toggleClass("invert");
  $("img").toggleClass("invert");
  $(".img").toggleClass("invert");
  $("iframe").toggleClass("invert");
  $(".image-hover").toggleClass("invert");
  $(".f-item").toggleClass("invert");
  $("#dark").toggleClass("darkicon");
  $(".inter-d").toggleClass("invert");
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
      "z-index": "0"   
    });
  }, function () {
    // out
    $(".follower").css({
      "width": "20px",
      "height": "20px",
      "opacity":"100%",       
      "z-index": "100"   
    });
  }
);


// cursor
$(document).on('mousemove', (event) => {
  // $('img').css({
  //   transform: 'transform: rotate3d(1, 1, 1, 45deg);',
  // });
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
  max=7;
  diff=diff*.2;
  if (diff>max) {diff=max;}
  if (diff<-max) {diff=-max;}
  // console.log(diff);
  // $(".barmarker").css('top', 200*curScr/totH+'px');
  $(".container").css('transform', 'skewY(' + diff + 'deg)');
  diff=diff*.1;
  $(".h1").css({
    "text-shadow": "0px "+50*diff+"px 0px rgb(18, 40, 46)",
  });
  // if (diff>0) diff=1;
  // else if (diff<0) diff=-1;
  // else  diff=0;
  diff*=5;
  // $(".img").css({
  //   "box-shadow": .8*diff+"em "+diff+"em 0px #316c7a",
  // });
  timeout=setTimeout(function(){
    $(".container").css('transform', 'skewY(0deg)');
    $(".h1").css({
      "text-shadow": "0px "+"0em 0px rgb(18, 40, 46)",
    });
    $(".img").css({
      "box-shadow": "0em 0em 0px #316c7a",
    });
  },idleTimer);
});





$(".sidebar_child").click(function() {
  var target = $("section").eq($(this).index(".sidebar_child"));
  $(".container").scrollTo(target, 800, {easing:'swing'});
});

$(".scroll").click(function() {
  $(".container").scrollTo($('.about').parent(), 800, {easing:'swing'});
});
$(".about").click(function() {
  $(".container").scrollTo($('.project').parent(), 800, {easing:'swing'});
});

$(".scroll").hover(function () {
    // over
    $(this).css('opacity', '0');
    $(".follower").html("<p>scroll</p>");
    $(".follower").css({
      "width": "100px",
      "height": "100px",        
      "opacity":"100%",       
    });
  }, function () {
    // out
    $(this).css('opacity', '100%');
    $(".follower").html("");
    $(".follower").css({
      "width": "20px",
      "height": "20px",
      "opacity":"100%",       
    });
  }
);

$(".img").hover(function () {
  // over
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>VIEW</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",        
    "opacity":"100%",       
  });
}, function () {
  // out
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"100%",       
  });
}
);


//top nav
$(".hello").click(function() {
  $(".container").scrollTo($('.hero').parent(), 800, {easing:'swing'});
});
$(".hello").hover(function () {
  // over
  $(".project > button").css("opacity", "0");
  $(".follower").html('<p class="hello-anim"></p>');
  $(".follower").css({
    "width": "100px",
    "height": "100px",        
    "opacity":"100%",       
  });
}, function () {
  // out
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"100%",       
  });
}
);

$(".home").click(function (e) { 
  // window.location.replace("/index.html");
  $('#status').fadeIn();
  $('#preloader').delay(400).fadeIn('slow');
  
});

$(".project").click(function (e) { 
  // window.location.replace("/index.html");
  $('#status').fadeIn();
  $('#preloader').delay(400).fadeIn('slow');
  
});



$(".home").hover(function () {
  // over
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>BACK</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",        
    "opacity":"100%",       
  });
}, function () {
  // out
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"100%",       
  });
}
);

$(".next").hover(function () {
  // over
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>next</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",        
    "opacity":"100%",       
  });
}, function () {
  // out
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"100%",       
  });
}
);

$(".prev").hover(function () {
  // over
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>previous</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",        
    "opacity":"100%",       
  });
}, function () {
  // out
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"100%",       
  });
}
);

$(".about").hover(function () {
  // over
  $(".project > button").css("opacity", "0");
  if (dark==-1) {
    $(".follower").html("<img class=\"image-hover\" src=\"img/favicon.png\">");
  }
  else  $(".follower").html("<img class=\"image-hover invert\" src=\"img/favicon.png\">");
  $(".follower").css({
    "width": "150px",
    "height": "150px",        
    "opacity":"100%",       
  });
}, function () {
  // out
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"100%",       
  });
}
);