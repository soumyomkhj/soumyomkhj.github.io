//preloader
$(window).on('load', function() {
  $('#status').fadeOut();
  $('#preloader').delay(800).fadeOut('slow');
  $('.hero-anim').delay(400).addClass("text-clip");
})


//content loader
var list = [
  { image: 'clay-time.png', class: 'clay-time', title: 'Clay Time',tag1: 'Tangible Interaction', tag2: 'Image Recognition', tag3: 'Python'},
  { image: 'youtube-coach.png', class: 'youtube-coach', title: 'Youtube Coach',tag1: 'Instructional Design', tag2: 'UX', tag3: 'UI'},
  { image: 'youtube-coach.png', class: 'youtube-coach', title: 'Youtube Coach',tag1: 'Instructional Design', tag2: 'UX', tag3: 'UI'}
];

for (let index = 0; index < list.length; index++) {
  console.log();
  $(".container").append('<section class="portfolio" id="'+ list[index].class +'" onclick="location.href=\''+ list[index].class +'.html\';"><div class="project"> <div class="img '+ list[index].class +'" alt="Image"></div><h1 class="h1 title">'+ list[index].title +'</h1><div class="tags-container"><div class="tag">'+ list[index].tag1 +'</div><div class="tag">'+ list[index].tag2 +'</div><div class="tag">'+ list[index].tag3 +'</div></div><button>VIEW</button></div></section>');
}

$(".img").click(function (e) { 
  // window.location.replace("/claytime.html");
  $('#status').fadeIn();
  $('#preloader').delay(400).fadeIn('slow');
});


//sidebar
sect_c = list.length+1  ;
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

// dark mode
$( "#dark" ).click(function() {
  $("html").toggleClass("invert");
  $("img").toggleClass("invert");
  $(".img").toggleClass("invert");
  $("iframe").toggleClass("invert");
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
      "z-index": "0"   
    });
  }, function () {
    // out
    $(".follower").css({
      "width": "20px",
      "height": "20px",
      "opacity":"30%",       
      "z-index": "100"   
    });
  }
);

$( ".hover" )

// cursor
$(document).on('mousemove', (event) => {
  $('img').css({
    transform: 'transform: rotate3d(1, 1, 1, 45deg);',
  });
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
  max=20;
  diff=diff*.2;
  if (diff>max) {diff=max;}
  if (diff<-max) {diff=-max;}
  // $(".barmarker").css('top', 200*curScr/totH+'px');
  // console.log(diff);
  $(".container").css('transform', 'skewY(' + diff + 'deg)');
  diff=diff*.1;
  $(".h1").css({
    "text-shadow": "0px "+2*diff+"em 0px rgb(18, 40, 46)",
  });
  diff=diff*2;
  $(".img").css({
    "box-shadow": .8*diff+"em "+diff+"em 0px #316c7a",
  });
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
      "opacity":"30%",       
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
    "opacity":"30%",       
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
    "opacity":"30%",       
  });
}
);