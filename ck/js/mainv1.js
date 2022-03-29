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

var p1= $('.p1');
var p2= $('.p2');
var p3= $('.p3');
var p4= $('.p4');

var layer= $('.wrapper');

layer.mousemove(function(e){
    var ivalueX= (e.pageX * -1 / 10);
    var ivalueY= (e.pageY * -1 / 20);
    var iivalueX= (e.pageX * -1 / 35);
    var iivalueY= (e.pageY * -1 / 40);
    var iiivalueX= (e.pageX * -1 / 60);
    var iiivalueY= (e.pageY * -1 / 80);
    var ivvalueX= (e.pageX * -1 / 90);
    var ivvalueY= (e.pageY * -1 / 100);
    // console.log('ok');
    p4.css('transform', 'translate3d('+ivalueX+'px,'+ivalueY+'px, 0)');
    p3.css('transform', 'translate3d('+iivalueX+'px,'+iivalueY+'px, 0)');
    p2.css('transform', 'translate3d('+iiivalueX+'px,'+iiivalueY+'px, 0)');
    p1.css('transform', 'translate3d('+ivvalueX+'px,'+ivvalueY+'px, 0)');
  });


const controller = new ScrollMagic.Controller();
var tween1 = TweenMax.to("#hue1feGaussianBlur", 10, {
    paused:true,
    attr:{"stdDeviation":40},
    onUpdateParams:["{self}"],
    onUpdate:function(tl){
      var tlp = (tl.progress()*50)>>0,
          heading = $('#tint h3');
      heading.text('SVG stdDeviation Gaussian Blur: ' + tlp);
    }
  });
const scene = new ScrollMagic.Scene({duration: 3000})
    .setTween(tween1)
    .setPin(".i1", {pushFollowers: true})
    .addTo(controller);

const controller2 = new ScrollMagic.Controller();
const scene2 = new ScrollMagic.Scene({
    triggerElement: '.top',
    // offset: 150,
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
var tween4 = TweenMax.to(".i1", 1, {scale: 1.4, ease: Linear.easeIn});
var scene4 = new ScrollMagic.Scene({offset:50 ,duration: 300})
.setTween(tween4)
.setPin(".i1", {pushFollowers: true})
.addTo(controller4);
