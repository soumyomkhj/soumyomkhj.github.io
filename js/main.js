// Legacy main.js - keeping for backward compatibility
// New modular version is in main-modular.js
// This file can be gradually replaced

//preloader - legacy version (modular version in modules/preloader.js)
let preloaderHidden = false;
function hidePreloader() {
  if (preloaderHidden) return;
  preloaderHidden = true;

  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.transition = 'opacity 0.5s ease-out, visibility 0s linear 0.5s';
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }

  $('.hero-anim').delay(100).addClass("text-clip");
}

// Load critical images first
const criticalImages = ['img/interaction.svg', 'img/nextlevel.png', 'img/elsa.png', 'img/favicon.png'];
const imagePromises = criticalImages.map(src => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(src);
    img.src = src;
    setTimeout(() => resolve(src), 5000);
  });
});

Promise.all(imagePromises).then(() => {
  setTimeout(() => hidePreloader(), 300);
});

// Fallback timeout
setTimeout(() => {
  if (!preloaderHidden) hidePreloader();
}, 6000);

$(window).on('load', function() {
  if (!preloaderHidden) {
    setTimeout(() => hidePreloader(), 300);
  }
});

window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    hidePreloader();
  }
});

dark =1;
//content loader
var list = [
  {class: 'graphy', title: 'Graphy Website Redesign',tag1: 'Redesign', tag2: 'UX Audit', tag3: '2023'},
  {class: 'unacademy', title: 'Unacademy',tag1: 'Product Designer', tag2: '2022', tag3: '2024'},
  {class: 'clay-time', title: 'Clay Time',tag1: 'Tangible Interaction', tag2: 'Image Recognition', tag3: 'Python'},
  {class: 'create-share', title: 'Create \'n\' Share',tag1: 'Interaction Design', tag2: 'User Study', tag3: 'UX'},
  {class: 'youtube-coach', title: 'Youtube Coach',tag1: 'Instructional Design', tag2: 'UX', tag3: 'UI'},
  {class: 'jagat-jamini', title: 'Jagat Jamini',tag1: 'VR', tag2: 'Spatial Audio', tag3: 'Interaction Design'},
  {class: 'bonfire', title: 'Bonfire!',tag1: 'Interaction Design', tag2: 'Media & Sensory', tag3: 'UX'},
  {class: 'exalt-body', title: 'Exalt Body',tag1: 'Design Fiction', tag2: 'Short Film', tag3: 'Interaction Design'},
  {class: 'photo', title: 'Photography',tag1: 'Hobby', tag2: 'Fine Arts', tag3: 'Travel'},
  {class: 'newzera', title: 'Newzera Summer Intern',tag1: 'UI', tag2: 'Prototype', tag3: 'UX'},
  {class: 'univinks', title: 'Univinks UX & Branding',tag1: 'UX', tag2: 'Branding', tag3: 'UI'},
];

for (let i = 0; i < list.length; i++) {
  index=list.length - i - 1;
  $(".container>section:nth-child(3)").after('<section class="portfolio" id="' + list[index].class + '" onclick="location.href=\'' + list[index].class + '.html\';"><div class="project"> <div class="img ' + list[index].class + '" alt="Image"></div><h1 class="h1 title">' + list[index].title + '</h1><div class="tags-container"><div class="tag">' + list[index].tag1 + '</div><div class="tag">' + list[index].tag2 + '</div><div class="tag">' + list[index].tag3 + '</div> </div>  <div class="view"> <h5> TAP TO VIEW </h5> </div> </div></section>');
}
$(".clay-time").prepend("<img src=\"../img/accept.png\" class=\"accept\">");

$(".img, .case-card").click(function (e) {
  $('#status').fadeIn();
  $('#preloader').delay(500).fadeIn('slow');
});

//sidebar
sect_c = list.length+3  ;
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
    $(".follower").css({
      "width": "100px",
      "height": "100px",
      "opacity":"100%",
      "z-index": "0"
    });
  }, function () {
    $(".follower").css({
      "width": "20px",
      "height": "20px",
      "opacity":"60%",
      "z-index": "100"
    });
  }
);

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

$(".sidebar_child").click(function() {
  var target = $("section").eq($(this).index(".sidebar_child"));
  $(".container").scrollTo(target, 800, {easing:'swing'});
});

$(".scroll").click(function() {
  $(".container").scrollTo($('.about').parent(), 800, {easing:'swing'});
});
$(".about").click(function() {
  $(".container").scrollTo($('.case-studies').parent(), 800, {easing:'swing'});
});

$(".scroll").hover(function () {
    $(this).css('opacity', '0');
    $(".follower").html("<p>scroll</p>");
    $(".follower").css({
      "width": "100px",
      "height": "100px",
      "opacity":"100%",
    });
  }, function () {
    $(this).css('opacity', '100%');
    $(".follower").html("");
    $(".follower").css({
      "width": "20px",
      "height": "20px",
      "opacity":"60%",
    });
  }
);

$(".img, .case-card").hover(function () {
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>VIEW</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",
    "opacity":"100%",
  });
}, function () {
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

//top nav
$(".hello").click(function() {
  $(".container").scrollTo($('.hero').parent(), 800, {easing:'swing'});
});
$(".hello").hover(function () {
  $(".project > button").css("opacity", "0");
  $(".follower").html('<p class="hello-anim"></p>');
  $(".follower").css({
    "width": "100px",
    "height": "100px",
    "opacity":"100%",
  });
}, function () {
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

$(".home").click(function (e) {
  $('#status').fadeIn();
  $('#preloader').delay(400).fadeIn('slow');
});

$(".project").click(function (e) {
  $('#status').fadeIn();
  $('#preloader').delay(400).fadeIn('slow');
});

$(".home").hover(function () {
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>BACK</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",
    "opacity":"100%",
  });
}, function () {
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

$(".fullpage").hover(function () {
  $(".follower").html("<p>expand</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",
    "opacity":"100%",
  });
  setTimeout(
    function()
    {
      $(".follower").html("");
      $(".follower").css({
        "width": "20px",
        "height": "20px",
        "opacity":"60%",
      });
    }, 3000);
}, function () {
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

$(".next").hover(function () {
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>next</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",
    "opacity":"100%",
  });
}, function () {
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

$(".prev").hover(function () {
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>previous</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",
    "opacity":"100%",
  });
}, function () {
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

$(".nexts").hover(function () {
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>next</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",
    "opacity":"100%",
  });
}, function () {
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

$(".prevs").hover(function () {
  $(".project > button").css("opacity", "0");
  $(".follower").html("<p>previous</p>");
  $(".follower").css({
    "width": "100px",
    "height": "100px",
    "opacity":"100%",
  });
}, function () {
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

$(".about").hover(function () {
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
  $(".project > button").css("opacity", "100%");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
}
);

$(".fullpage").click(function (e) {
  $(".fullpage").toggleClass("fulldisplay");
  $(".follower").html("");
  $(".follower").css({
    "width": "20px",
    "height": "20px",
    "opacity":"60%",
  });
});

$(".frame").hover(function () {
    $(".follower").css("opacity", "0% !important");
    }, function () {
    $(".follower").css("opacity", "60%");
  }
);

// Education cards navigation
(function() {
  const eduSection = document.querySelector('.edu');
  if (!eduSection) return;
  
  const cards = eduSection.querySelectorAll('.educard');
  const prevBtn = eduSection.querySelector('.edu-prev');
  const nextBtn = eduSection.querySelector('.edu-next');
  let currentIndex = 0;
  
  function showCard(index) {
    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
    updateButtons();
  }
  
  function updateButtons() {
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex === cards.length - 1;
    }
  }
  
  function nextCard() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      showCard(currentIndex);
      eduSection.classList.add('user-controlled');
    }
  }
  
  function prevCard() {
    if (currentIndex > 0) {
      currentIndex--;
      showCard(currentIndex);
      eduSection.classList.add('user-controlled');
    }
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevCard);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', nextCard);
  }
  
  // Initialize
  if (cards.length > 0) {
    showCard(0);
  }
})();
