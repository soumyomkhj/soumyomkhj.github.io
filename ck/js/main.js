$(".top").click(function(){
    $(this).toggleClass('hide');
})
$(function() {

    var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });

}); 
window.addEventListener('deviceorientation',function(e){
    const x = Math.round(e.beta);
    const y = Math.round(e.gamma);
    const z = Math.round(e.alpha);

    //Parallax Effect

    document.getElementsByClassName('top')[0].style.transform = `translate3d(-${x}%,-${z}%,-${z}%)`;
});

var p1= $('.p1');
var p2= $('.p2');
var p3= $('.p3');
var p4= $('.p4');

var layer= $('.wrapper');

window.addEventListener('deviceorientation',function(e){
    const x = Math.round(e.beta);
    const y = Math.round(e.gamma);
    const z = Math.round(e.alpha);

    document.getElementsByClassName('xtxt')[0].innerText = "X-Axis = " + x;
    document.getElementsByClassName('ytxt')[0].innerText = "Y-Axis = " + y;
    document.getElementsByClassName('ztxt')[0].innerText = "Z-Axis = " + z;

    //Parallax Effect

    document.getElementsByClassName('rocket')[0].style.transform = `translateY(-${x}%)`;

});

layer.mousemove(function(e){
    var ivalueX= (e.pageX * -1 / 30);
    var ivalueY= (e.pageY * -1 / 30);
    var iivalueX= (e.pageX * -1 / 45);
    var iivalueY= (e.pageY * -1 / 60);
    var iiivalueX= (e.pageX * -1 / 60);
    var iiivalueY= (e.pageY * -1 / 90);
    var ivvalueX= (e.pageX * -1 / 80);
    var ivvalueY= (e.pageY * -1 / 120);
    // console.log('ok');
    p4.css('transform', 'translate3d('+ivalueX+'px,'+ivalueY+'px, 0)');
    p3.css('transform', 'translate3d('+iivalueX+'px,'+iivalueY+'px, 0)');
    p2.css('transform', 'translate3d('+iiivalueX+'px,'+iiivalueY+'px, 0)');
    p1.css('transform', 'translate3d('+ivvalueX+'px,'+ivvalueY+'px, 0)');
  });


  const controller = new ScrollMagic.Controller();

  const scene = new ScrollMagic.Scene({
      triggerElement: '.top',
      duration: 3000
  })
    .setClassToggle('.p1','blur')
    .addTo(controller);

    const controller2 = new ScrollMagic.Controller();
    const scene2 = new ScrollMagic.Scene({
        triggerElement: '.top',
        offset: 250,
        duration: 5000
    })
        .setClassToggle('.top','show')
        .addTo(controller2);

    const controller3 = new ScrollMagic.Controller();
    const scene3 = new ScrollMagic.Scene({
        triggerElement: '.box2',
        duration: 5000
    })
        .setClassToggle('.box2','show')
        .addTo(controller2);
  
    var controller4 = new ScrollMagic.Controller();
    var tween4 = TweenMax.to(".p1", 1, {scale: 1.4, ease: Linear.easeNone});
    var scene4 = new ScrollMagic.Scene({offset:50 ,duration: 300})
    .setTween(tween4)
    .setPin(".p1", {pushFollowers: true})
        .addIndicators(true)
    .addTo(controller);
