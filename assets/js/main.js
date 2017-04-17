// main js
$(".wave").click(function (e) {

  // Remove any old one
  $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
	  posY = $(this).offset().top,
	  buttonWidth = $(this).width(),
	  buttonHeight =  $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple'></span>");


  if(buttonWidth >= buttonHeight) {
	buttonHeight = buttonWidth;
  } else {
	buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;


  // Add the ripples CSS and start the animation
  $(".ripple").css({
	width: buttonWidth,
	height: buttonHeight,
	top: y + 'px',
	left: x + 'px'
  }).addClass("rippleEffect");
});



$(".btn").click(function (e) {

  // Remove any old one
  $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
	  posY = $(this).offset().top,
	  buttonWidth = $(this).width(),
	  buttonHeight =  $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple'></span>");


 // Make it round!
  if(buttonWidth >= buttonHeight) {
	buttonHeight = buttonWidth;
  } else {
	buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth*2;
  var y = e.pageY - posY - buttonHeight*2;


  // Add the ripples CSS and start the animation
  $(".ripple").css({
	width: buttonWidth*4,
	height: buttonHeight*4,
	top: y + 'px',
	left: x + 'px'
  }).addClass("rippleEffect");
});





// Dark one

$(".wave-dark").click(function (e) {

  // Remove any old one
  $(".ripple-dark").remove();

  // Setup
  var posX = $(this).offset().left,
	  posY = $(this).offset().top,
	  buttonWidth = $(this).width(),
	  buttonHeight =  $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple-dark'></span>");


 // Make it round!
  if(buttonWidth >= buttonHeight) {
	buttonHeight = buttonWidth;
  } else {
	buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;


  // Add the ripples CSS and start the animation
  $(".ripple-dark").css({
	width: buttonWidth,
	height: buttonHeight,
	top: y + 'px',
	left: x + 'px'
  }).addClass("rippleEffect");
});







$(".btn-dark").click(function (e) {

  // Remove any old one
  $(".ripple-dark").remove();

  // Setup
  var posX = $(this).offset().left,
	  posY = $(this).offset().top,
	  buttonWidth = $(this).width(),
	  buttonHeight =  $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple-dark'></span>");


 // Make it round!
  if(buttonWidth >= buttonHeight) {
	buttonHeight = buttonWidth;
  } else {
	buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth*2;
  var y = e.pageY - posY - buttonHeight*2;


  // Add the ripples CSS and start the animation
  $(".ripple-dark").css({
	width: buttonWidth*4,
	height: buttonHeight*4,
	top: y + 'px',
	left: x + 'px'
  }).addClass("rippleEffect");
});

var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    isMobile = true;

    $(document).ready(function () {


    	var button = '#slidx_button'; //Elemento en el que pulsamos para abrir y cerrar el menú.
    	var menu = '#slidx_menu'; //Elemento que contiene el menú responsive.
    	var side = 'left' //Indica de que lado está el menú ('right' o 'left')
    	var buttonMove = 'no' //Indica si quieres que también se mueva el botón cuando abres el menú en modo 'click' ('yes' o 'no')
    	var shadow = 'yes' //Indica si se crea una sombra en el resto de la página, cuando se abre el menú ('yes' o 'no')
    	var opacity = 0.6; //Opacidad de la sombra que se crea en el resto de la página con el menú abierto. (0=transparente 1=opaco)
    	var size = 400; //Ancho del menú.
    	var speed = 0.5; //Velocidad de apertura y cierre (en s.)
    	var normalTime = 0; //Tiempo que tarda el menú en abrirse/cerrarse cuando pulsamos el botón (en ms. recomendable dejar en 0).
    	var menuTime = 300; //Tiempo que tarda el menú en cerrarse cuando pulsamos un elemento dentro del menu (en ms.).
    	var menuTop = 0; //Espaciado entre la parte superior del menú y la parte superior de la pantalla (en px. por defecto = 0)
    	var menuBottom = 0; //Espaciado entre la parte inferior del menú y la parte inferior de la pantalla (en px. por defecto = 0)
    	var zIndexMenu = 98; //z-index del menú (el botón lleva 1 número menos al número que introduzcas, y la sombra, 2 menos.)

    	//Otras variables. (No toques esto, si no sabes lo que haces)
    	var slidxOpen = "slidx_open";
    	var slidxShadow = "slidx_shadow";
    	var slidxShadowID = '#' + slidxShadow;
    	var zIndexButton = zIndexMenu - 1;
    	var zIndexShadow = zIndexMenu - 10;
    	var speedM = speed * 1000;
    	$(menu).css({
    		'transition': speed + 's',
    		'z-index': zIndexMenu,
    		'-webkit-transition': 'all 1.2s cubic-bezier(0,.91,0,.99)',
    		'-o-transition': 'all 1.2s cubic-bezier(0,.91,0,.99)',
    		'transition': 'all 1.2s cubic-bezier(0,.91,0,.99)',
    	});

    	//Si es derecho
    	if (side == 'right') {
    		$(menu).css({
    			'right': '-' + size + 'px',
    		})
    	}

    	//Si es izquierdo
    	if (side !== 'right') {
    		$(menu).css({
    			'left': '-' + size + 'px',
    		})
    	}

    	//------------------------------  FUNCIONES  -------------------------------//
    	//Ésta es la función que abre el menú.
    	function open() {

    		if (side == 'right') {

    			$(menu).animate({
    				right: '0',
    			}, normalTime);

    			if (buttonMove == 'yes') {
    				$(button).animate({
    					right: size,
    				}, normalTime);
    			}

    		}

    		if (side !== 'right') {

    			$(menu).animate({
    				left: '0',
    			}, normalTime);

    			if (buttonMove == 'yes') {
    				$(button).animate({
    					left: size,
    				}, normalTime);
    			}
    		}

    		$(menu).addClass(slidxOpen);

    		if (shadow == 'yes') {
    			$("<div>", {
    				id: slidxShadow, //atributo directo, igual que si fuéramos con attr(“id”)
    				css: //propiedad de jQuery
    				{
    					'position': 'fixed',
    					'top': '0px',
    					'width': '100%',
    					'height': '100%',
    					'background-color': '#000000',
    					'opacity': '0',
    					'z-index': zIndexShadow,
    				},
    			}).appendTo('html');

    			$(slidxShadowID).fadeTo(speedM, opacity);
    		}
    	};

    	function close(delayTime) {
    		if (side == 'right') {
    			$(menu).animate({
    				right: '-' + size,
    			}, delayTime)

    			if (buttonMove == 'yes') {
    				$(button).animate({
    					right: 0,
    				}, delayTime);
    			}
    		}

    		if (side !== 'right') {
    			$(menu).animate({
    				left: '-' + size,
    			}, delayTime)

    			if (buttonMove == 'yes') {
    				$(button).animate({
    					left: 0,
    				}, delayTime);
    			}
    		}

    		$(menu).removeClass(slidxOpen);
    		$(slidxShadowID).fadeOut(speedM);

    		setTimeout(function () {
    			$(slidxShadowID).remove();
    		}, speedM);
    	};
    	if(isMobile == true)
    	{
    		$(button).click(function () {
    			event.preventDefault();
    			if (!$(menu).hasClass(slidxOpen)) {
    				open();
    			} else {
    				close(normalTime);
    			}
    		});
    		$(menu).click(function () {
    			close(menuTime);
    		});
    	$(document).on('click', slidxShadowID, function () {
    		close(normalTime);
    	});
    	}
    	else
    	{
    		$(button).mouseover(function () {
    			if (!$(menu).hasClass(slidxOpen)) {
    				open();
    			} else {
    				close(normalTime);
    			}
    		});
    		$(menu).mouseleave(function () {
    			close(normalTime);
    		});
    		$(menu).click(function () {
    			close(menuTime);
    		});
    	};
    });


$(document).ready(function () {

  var mode = "hover";
	var button = '#slidup_button'; //Elemento en el que pulsamos para abrir y cerrar el menú.
	var menu = '#slidup_menu'; //Elemento que contiene el menú responsive.
	var side = 'left' //Indica de que lado está el menú ('right' o 'left')
	var buttonMove = 'no' //Indica si quieres que también se mueva el botón cuando abres el menú en modo 'click' ('yes' o 'no')
	var shadow = 'yes' //Indica si se crea una sombra en el resto de la página, cuando se abre el menú ('yes' o 'no')
	var opacity = 0.6; //Opacidad de la sombra que se crea en el resto de la página con el menú abierto. (0=transparente 1=opaco)
	var size = 400; //Ancho del menú.
	var speed = 0.5; //Velocidad de apertura y cierre (en s.)
	var normalTime = 0; //Tiempo que tarda el menú en abrirse/cerrarse cuando pulsamos el botón (en ms. recomendable dejar en 0).
	var menuTime = 300; //Tiempo que tarda el menú en cerrarse cuando pulsamos un elemento dentro del menu (en ms.).
	var menuTop = 0; //Espaciado entre la parte superior del menú y la parte superior de la pantalla (en px. por defecto = 0)
	var menuBottom = 0; //Espaciado entre la parte inferior del menú y la parte inferior de la pantalla (en px. por defecto = 0)
	var zIndexMenu = 98; //z-index del menú (el botón lleva 1 número menos al número que introduzcas, y la sombra, 2 menos.)

	//Otras variables. (No toques esto, si no sabes lo que haces)
	var slidxOpen = "slidx_open";
	var slidxShadow = "slidx_shadow";
	var slidxShadowID = '#' + slidxShadow;
	var zIndexButton = zIndexMenu - 1;
	var zIndexShadow = zIndexMenu - 10;
	var speedM = speed * 1000;
	$(menu).css({
		'transition': speed + 's',
		'z-index': zIndexMenu,
		'-webkit-transition': 'all 1.2s cubic-bezier(0,.91,0,.99)',
		'-o-transition': 'all 1.2s cubic-bezier(0,.91,0,.99)',
		'transition': 'all 1.2s cubic-bezier(0,.91,0,.99)',
	});

	//Si es derecho
	if (side == 'right') {
		$(menu).css({
			'bottom': '-100%',
		})
	}

	//Si es izquierdo
	if (side !== 'right') {
		$(menu).css({
			'top': '-100%',
		})
	}
	function open() {
		if (side !== 'right') {

			$(menu).animate({
				top: '0',
			}, normalTime);

			if (buttonMove == 'yes') {
				$(button).animate({
					left: size,
				}, normalTime);
			}
		}

		$(menu).addClass(slidxOpen);
	};

	function close(delayTime) {

		if (side !== 'right') {
			$(menu).animate({
        top: '-100%',
			}, delayTime)
		}

		$(menu).removeClass(slidxOpen);

		setTimeout(function () {
			$(slidxShadowID).remove();
		}, speedM);
	};

		$(button).click(function () {
			event.preventDefault();
			if (!$(menu).hasClass(slidxOpen)) {
				open();
			} else {
				close(normalTime);
			}
		});
		$(menu).click(function () {
			close(menuTime);
		});
});
