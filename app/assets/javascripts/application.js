

//= require jquery
//= require bootstrap-sprockets

//= require jquery_ujs
<<<<<<< HEAD

function hamburger_cross() {
    
    if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
    } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
    }
}

$('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
});  

//= require turbolinks
//= require_tree .
<<<<<<< HEAD
//= require blueimp-gallery-all
//= require blueimp-gallery
//= require blueimp-gallery-fullscreen
//= require blueimp-gallery-indicator
//= require blueimp-gallery-video
//= require jquery.blueimp-gallery
=======
$('#myCarousel').carousel({
	pause: 'none'
});
<<<<<<< HEAD
>>>>>>> 32a3a2137ad937ee6dcae31eee9b80399f722b7b
=======
=======
//= require turbolinks
//= require_tree .
//= require blueimp-gallery-all
//= require blueimp-gallery
//= require blueimp-gallery-fullscreen
//= require blueimp-gallery-indicator
//= require blueimp-gallery-video
//= require jquery.blueimp-gallery
>>>>>>> add bluimp gallerry
>>>>>>> serverfix
