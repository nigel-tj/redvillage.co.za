$(document).ready(function() {
    
    //masthead slider
    
    $('#full-height-width-slider').royalSlider({
	loop: true,
	keyboardNavEnabled: true,
	controlsInside: false,
	autoScaleSliderHeight: 600,
	imageScaleMode: 'fill',
	arrowsNavAutoHide: false,
	autoScaleSlider: false, 
	imgHeight:600,
	imageAlignCenter:false,
	controlNavigation: 'arrows',
	thumbsFitInViewport: false,
	navigateByClick: true,
	startSlideId: 0,
	autoPlay: {
	    enabled : true,
	    delay: 6000,
	    stopAtAction: false
	},
	transitionType:'move',
	globalCaption: true
    });
    
    $('.masthead-preloader').delay(300).animate({
     	top: '33%',
     	opacity: '1'
    }, 600);
    
    //plugins
    
    $('ul.toggle').each(function() { $(this).toggler(); });
    $('ul.pagination').each(function() { $(this).paginator(); });
    $('.news-content').first().newsbrowser();
    
    //news above the fold
    
    // var windowHeight = $(window).height();
    
    // $('#masthead').css('height', windowHeight - 100);
    // $('.navigation-bottom').css('height', windowHeight - 543)
    
    //tour toggle4
    
    $('#tour-section').find('select').bind('change',function() {
        
	var val = $(this).val();
        
	$('#tour-section').find('div.tour-widget').each(function() {
	    ($(this).data('artist') != val) ? $(this).hide() : $(this).show();
	});
        
    }).change();
    
    //youtube
    
    $(this).on({
	click : function() {
	    if(!$(this).hasClass('now-playing')) {
                
	    	$('div.youtube-playlist-item').removeClass('now-playing');
	    	$('#yt-player').attr('src', 'http://www.youtube.com/embed/' + $(this).addClass('now-playing').data('ytid') + '?autoplay=1&controls=1&showinfo=0&autohide=1&modestbranding=1');
                
	    }
            
	}
    }, 'div.youtube-playlist-item');
    
    $('#yt-player').attr('src', 'http://www.youtube.com/embed/' + $('div.youtube-playlist-item').first().addClass('now-playing').data('ytid') + '?autoplay=0&controls=0&showinfo=0&autohide=1&modestbranding=1');
    
    //trigger resize
    setTimeout(function() {
    	$(window).trigger('resize');
    	/*	Resize menu bottom  */
	setBottom(600);
    }, 500);	
    
});


$(window).resize(function() {
    
    var realH = $('.rsContent').find('img').last().height();
    
    setBottom(realH);
    
}).load(function() {
    
    $('.rsABlock').css('visibility','visible');
    
    var realH = $('.rsSlide').last().height();
    
    setBottom(realH);
    
});

var setBottom = function(h){
    
    var w = $('div.row-fluid.max-width').first().find('div.container-fluid').width();
    
    var tw = ($(this).width() > 769) ? Math.floor((w - $('div.three-col-center').width() - 42) / 2) : '100%';
    $('div.three-col-left, div.three-col-right').css('width', tw);
    
    $("#masthead").css('height', h + 'px');
    
};
