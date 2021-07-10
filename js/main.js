$( "#dark" ).click(function() {
    $("html").toggleClass("invert");
    $("img").toggleClass("invert");
    $(".f-item").toggleClass("invert");
    $("#dark").toggleClass("darkicon");
  });
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
  console.log(diff);
  $(".container").css('transform', 'skewY(' + diff + 'deg)');
});