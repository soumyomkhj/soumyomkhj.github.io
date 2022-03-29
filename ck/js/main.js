var p1= $('.p1');
var p2= $('.p2');
var p3= $('.p3');
var p4= $('.p4');

var layer= $('.wrapper');

// layer.mousemove(function(e){
//     var ivalueX= (e.pageX * -1 / 10);
//     var ivalueY= (e.pageY * -1 / 20);
//     var iivalueX= (e.pageX * -1 / 35);
//     var iivalueY= (e.pageY * -1 / 40);
//     var iiivalueX= (e.pageX * -1 / 60);
//     var iiivalueY= (e.pageY * -1 / 80);
//     var ivvalueX= (e.pageX * -1 / 90);
//     var ivvalueY= (e.pageY * -1 / 100);
//     // console.log('ok');
//     p4.css('transform', 'translate3d('+ivalueX+'px,'+ivalueY+'px, 0)');
//     p3.css('transform', 'translate3d('+iivalueX+'px,'+iivalueY+'px, 0)');
//     p2.css('transform', 'translate3d('+iiivalueX+'px,'+iiivalueY+'px, 0)');
//     p1.css('transform', 'translate3d('+ivvalueX+'px,'+ivvalueY+'px, 0)');
// });

const wrapper = document.querySelector('.wrapper');
const video1 = document.querySelector('.v1');
const video2 = document.querySelector('.v2');
const video3 = document.querySelector('.v3');

const controller1 = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
    duration: 15000,
    triggerElement: wrapper,
    triggerHook: 0
})
    .addIndicators()
    .setPin(wrapper)
    .addTo(controller1)

let accelamout = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on('update', e => {
    scrollpos = e.scrollPos/1000;
})

setInterval(() => {
    delay += (scrollpos - delay) * accelamout;
    console.log(scrollpos,delay);
    video3.play();
    video3.addEventListener('canplay', function() {
        this.currentTime = scrollpos;
    });
    video2.play();
    video2.addEventListener('canplay', function() {
        this.currentTime = scrollpos;
    });
    video1.play();
    video1.addEventListener('canplay', function() {
        this.currentTime = scrollpos;
    });
    // video3.currentTime = scrollpos;
    // video1.currentTime = scrollpos;
    // video2.currentTime = scrollpos;
}, 100)