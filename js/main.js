//preloader
$(window).on('load', function() {
  $('#status').fadeOut();
  $('#preloader').delay(800).fadeOut('slow');
  $('.hero-anim').delay(400).addClass("text-clip");
})

dark =1;
//content loader
var list = [
  {class: 'clay-time', title: 'Clay Time',tag1: 'Tangible Interaction', tag2: 'Image Recognition', tag3: 'Python'},
  {class: 'youtube-coach', title: 'Youtube Coach',tag1: 'Instructional Design', tag2: 'UX', tag3: 'UI'},
  {class: 'create-share', title: 'Create \'n\' Share',tag1: 'Interaction Design', tag2: 'Creative Assesment', tag3: 'UX'},
  {class: 'exalt-body', title: 'Exalt Body',tag1: 'Design Fiction', tag2: 'Short Film', tag3: 'Interaction Design'},
  {class: 'bonfire', title: 'Bonfire!',tag1: 'Interaction Design', tag2: 'Media & Sensory', tag3: 'UX'},
  // {class: 'newzera', title: 'Newzera Summer Intern',tag1: 'UI', tag2: 'Prototype', tag3: 'UX'},
  {class: 'univinks', title: 'Univinks UX & Branding',tag1: 'UX', tag2: 'Branding', tag3: 'UI'},
  // {class: 'mobile-atm', title: 'Mobile Atm',tag1: 'Product Design', tag2: '3D', tag3: 'UX'},
  {class: 'photo', title: 'Photography',tag1: 'Hobby', tag2: 'Fine Arts', tag3: 'Travel'},
  // {class: 'kemorebi', title: 'Kemorebi',tag1: 'Poster', tag2: 'UI', tag3: 'Acid Art'},
];

for (let i = 0; i < list.length; i++) {
  index=list.length-i-1;
  $(".container>section:nth-child(2)").after('<section class="portfolio" id="'+ list[index].class +'" onclick="location.href=\''+ list[index].class +'.html\';"><div class="project"> <div class="img '+ list[index].class +'" alt="Image"></div><h1 class="h1 title">'+ list[index].title +'</h1><div class="tags-container"><div class="tag">'+ list[index].tag1 +'</div><div class="tag">'+ list[index].tag2 +'</div><div class="tag">'+ list[index].tag3 +'</div></div><button>VIEW</button></div></section>');
}

$(".img").click(function (e) { 
  // window.location.replace("/claytime.html");
  $('#status').fadeIn();
  $('#preloader').delay(500).fadeIn('slow');
});


//sidebar
sect_c = list.length+3  ;
// console.log(sect_c);
for (let i = 0; i < sect_c; i++) {
  $('.sidebar').append('<div class="sidebar_child"></div>');
}
$('.sidebar_child').css('height', (20/sect_c)+'vh');
n=0;
$(".sidebar_child").eq(n).addClass("bufferd_bar");
$(".container").scroll(function(){
  totH=$("section:eq(1)").height();
  curScr = $(this).scrollTop();
  n= Math.round(curScr/totH);
  // console.log(curScr);
  // console.log(totH);
  // console.log(n);
  // console.log("next");
  $(".sidebar_child").eq(n).addClass("bufferd_bar");
  for (let index = 0; index < sect_c; index++) {
    if (index!=n) {
      $(".sidebar_child").eq(index).removeClass("bufferd_bar"); 
    }
  }
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
      "opacity":"30%",       
      "z-index": "100"   
    });
  }
);

$( ".hover" )

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
    "opacity":"30%",       
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
    "opacity":"30%",       
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
    "opacity":"30%",       
  });
}
);