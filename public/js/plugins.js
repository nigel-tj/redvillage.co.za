var Paginator = function(content) {

	var $this = this;

	$this.content = content;
	$this.target = content.parent().parent().find('div.pagination-content');
	$this.current = -1;
	$this.buttons = content.find('li');
	$this.resetter = null;

	$this.content.on('click', 'li', function() {

		var val = $(this).data('idx');

		if(isNaN(val))
		$this.command(val);
		else
		$this.loadpage(val);

	});

	$this.loadpage(0);

}; Paginator.prototype = {

	loadpage : function(page) {

		if(page == this.current)
		return false;

		var $this = this;

		var direction = (this.current > page) ? 70 : -70;
		this.current = page;

		var lis = $this.content.find('li');

		lis.removeClass('active').each(function() {
			if ($(this).removeClass('disabled').data('idx') == page) { $(this).addClass('active'); }
		});

		if($this.current == 0) {
            lis.first().addClass('disabled');
        }
		else if($this.current == 2) {
            lis.last().addClass('disabled');
        }

		$this.target.addClass('animating').css({
			'margin-left' : direction + '%',
			'opacity': 0
		});

		clearTimeout($this.resetter);

		$this.resetter = window.setTimeout(function() {

			if($this.target.hasClass('youtube-content'))
			$this.target.youtubeviewer('loadpage', $this.current);

			if($this.target.hasClass('news-content'))
			$this.target.newsbrowser('loadpage', $this.current);

			$this.target.removeClass('animating').css({
				'margin-left' : -direction + '%'
			}).unbind('page-loaded').bind('page-loaded', function() {

				setTimeout(function() {

					$this.target.addClass('animating').css({
						'margin-left' : '0%',
						'opacity' : 1
					});

				},100);

			});

		}, 600);

	},

	command : function(command) {

		if(command == "next" && this.current < 2)
		this.loadpage(this.current + 1);
		else if (command == "prev" && this.current > 0)
		this.loadpage(this.current - 1);
	},

	reset : function() {

		this.current = 0;

		this.buttons.first().addClass('disabled');
		this.buttons.last().removeClass('disabled');
		this.buttons.each(function(idx) {
			(idx != 1) ? $(this).removeClass('active') : $(this).addClass('active');
		});
	}

};

jQuery.addObject('paginator', Paginator);

var NewsBrowser = function(content) {

	var $this = this;

	$this.content = content;
	$this.page = 0;
	$this.filter = '';

	$this.content.parent().on('click', 'ul.filter li', function() {

		var $button = $(this);

		$button.parent().find('li').removeClass('active');
		$button.addClass('active');

		$this.content.css('opacity','0');

		clearTimeout($this.delay);

		$this.delay = setTimeout(function() {
			$this.filterpage($button.data('val'));
		},300);



	});



}; NewsBrowser.prototype = {

	load : function() {

		var $this = this;

		var data = {
			'action' : 'get_news_posts',
			'numberposts' : 4,
			'offset' : $this.page * 4
		};

		if($this.filter != '') {
			data.meta_key = 'post_category';
			data.meta_value = $this.filter;
			data.meta_compare = '==';
		}

		$.ajax({
			url : "/wp-admin/admin-ajax.php",
			data: data,
			type: 'POST',
	        dataType: 'json',
	        success : function(data) {

	        	$this.init = true;
	        	$this.display(data);

	        }
	    });


	},

	display : function(data) {

		var $this = this;
		var $items = [];

		var totalcount = 0;
		var loadcount = 0;
		var placeholder = $.rocnation.base_url + '/img/placeholders/news-placeholder.jpg';

		$.each(data, function(idx, el) {

			totalcount++;

			var src = (el.thumbnail) ? el.thumbnail : placeholder;

			var $thumb = $('<div/>').addClass('news-img');

			var date = $this.nicedate(el.date);

			$('<img></img').error(function() {
				$(this).attr('src', placeholder);
			}).load(updateCount).attr('src', src).appendTo($thumb);

			var $data = $('<div/>').addClass('news-data').html('<p class="date">' + date + '</p><p class="desc">' + el.title + '</p>');

			var $link = $('<a>').attr('href', '/' + el.slug).append($thumb,$data);

			$items.push($('<div></div>').addClass('span3 grid-item news-item').attr('data-url', '/' + el.slug).append($link));

		});

		function updateCount() {

			if(loadcount < totalcount - 1)
			loadcount++;
			else
			$this.content.html('').append($items).trigger('page-loaded');

		}



	},

	filterpage : function(filter) {

		this.filter = filter;
		this.load();

	},

	loadpage : function(page) {

		this.page = page;
		this.load();

	},

	nicedate : function(raw_date) {

		var a = raw_date.split(' ');
		var d = a[0].split('-');

		return "Posted on " + d[1] + '/' + d[2] + '/' + d[0];
	}


}

jQuery.addObject('newsbrowser', NewsBrowser);

var DiscBrowser = function(content) {
    var $this = this;

    $this.content = content;
    $this.filter = '';

}; DiscBrowser.prototype = {

    load : function() {

        var $this = this;

        var data = {
            'action' : 'get_disc_posts',
            'numberposts' : -1,
            'category' : $("#isotope-content") ? $("#isotope-content").data('aid') : 'all',
        };

        $.ajax({
            url : "/wp-admin/admin-ajax.php",
            data: data,
            type: 'POST',
            dataType: 'json',
            success : function(data) {
                $this.init = true;
                $this.display(data);
            }
        });


    },

    display : function(data) {

        var $this = this;
        var $items = [];

        var totalcount = 0;
        var loadcount = 0;

        if(data.length) {
            $.each(data, function(idx, el) {
                totalcount++;
                if (totalcount === 1) {
                	$items.push('<div class="rsContent">');
                }

                $items.push(createMusicItem(el));

                if (totalcount % 4 === 0) {
                	$items.push('</div>');
                	if (data.length > 4 && totalcount !== data.length) {
                		$items.push('<div class="rsContent">');
                	}                	
                } else if (totalcount === data.length) {
                	$items.push('</div>');
                }               

            });

            $this.content.html('').append($items.join(''));
            $('.discography').imagesLoaded( function(){
            	var disc_slider = $('#discography-slider').royalSlider({
				    loop: false,
				    keyboardNavEnabled: true,
				    controlsInside: false,
				    arrowsNavAutoHide: false,
				    autoScaleSlider: false,
				    controlNavigation: 'arrows',
				    thumbsFitInViewport: false,
				    navigateByClick: true,
				    startSlideId: 0,
				    autoPlay: {
				        enabled : true,
				        delay: 3000
				    },
				    transitionType:'move',
				    globalCaption: false,
				    autoHeight: true
				});

				$(window).trigger('resize');

				$(window).on('resize', function(){
					disc_slider.updateSliderSize(true);
					$('#isotope-content').isotope('reLayout');
				});

				$('#isotope-content').isotope('reLayout');
            	$('.discography').css('height', 'auto').show().animate({	
	                opacity: 1.0
	            }, 1000, function(){

	                if ($('.artist-info-item.media').length) {
            			$('.artist-info-item.media').show().animate({	
	                		opacity: 1.0
	            		}, 1000, function(){
	            			$('#isotope-content').isotope('reLayout');
	                		$(window).trigger('resize');
	            		});
            		} else {
            			$('#isotope-content').isotope('reLayout');
	                	$(window).trigger('resize');
            		}
	            });      

	            disc_slider.ev.on('rsBeforeAnimStart', function(event) {
				    disc_slider.updateSliderSize(true);
				});

				disc_slider.ev.on('rsBeforeMove', function(event, type, userAction ) {
				    disc_slider.updateSliderSize(true);
				});				
			});                  
        }

        function createMusicItem(el) {
            var $item = $('<div>').addClass('music-item').addClass(el.music_type).attr('data-release-date', el.release_date).attr('data-artist', el.artist_name).attr('data-title', el.title);
            var $overlay = $('<div>').addClass('music-item-overlay');

            $('<img>').attr('src', el.music_image).appendTo($item);
            // $('<img>').addClass('lazy').attr('data-original', el.music_image).attr('src', $.rocnation.base_url + '/img/global/album-placeholder.jpg').appendTo($item);
            // $('<p>').addClass('music-item-date').html('RELEASE ON ' + niceDate(el.release_date)).appendTo($overlay);
            $('<h3>').addClass('music-item-title').html(el.title).appendTo($overlay);

            if(el.artist_name)
            $('<p>').addClass('music-item-artist').html(el.artist_name).appendTo($overlay);

            //buy button

            var buy_button = $('<div>').addClass('buy-button').html('<span class="pull-left">BUY THIS MUSIC</span><img class="pull-right" src="' + $.rocnation.base_url + '/img/global/icon-arrow-white.png" />' );
            var buy_link_container = $('<ul>').addClass('buy-links release-links').appendTo(buy_button);

            for(var k in el.buy_links)
            $('<li>').html('<a target="_blank" href="' + el.buy_links[k].link_url + '">' + el.buy_links[k].link_title + '<img class="pull-right" src="' + $.rocnation.base_url + '/img/global/icon-arrow-white.png" /></a>').appendTo(buy_link_container);

            $overlay.append(buy_button);
            $item.append($overlay);

            return $('<div>').append($item).html();

        }

    },

    loadpage : function(page) {
        this.page = page;
        this.load();

    },

    nicedate : function(raw_date) {

        var a = raw_date.split(' ');
        var d = a[0].split('-');

        return "Posted on " + d[1] + '/' + d[2] + '/' + d[0];
    }


}

jQuery.addObject('discbrowser', DiscBrowser);

var Toggler = function(content) {

	var $this = this;

	$this.content = content.on('click', 'li', function() {

		$this.activate($(this).data('toggle-key'));

	});

	$this.activate(content.find('li').first().data('toggle-key'))

}; Toggler.prototype = {

	activate : function(key) {

		this.content.find('li').each(function() {

			($(this).data('toggle-key') == key) ? $(this).addClass('active') : $(this).removeClass('active');

		});

		this.content.parent().find('div.toggleable-item').each(function() {

			($(this).data('toggle-key') == key) ? $(this).addClass('active') : $(this).removeClass('active')

		});

	}

}

jQuery.addObject('toggler', Toggler);



this.tooltip = function(){
	/* CONFIG */
		xOffset = 10;
		yOffset = 20;
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
	/* END CONFIG */
	$(document).on({

		mouseenter : function(e) {

			this.t = this.title;
			this.title = "";
			$("body").append("<p id='tooltip'>"+ this.t +"</p>");
			$("#tooltip")
				.css("top",(e.pageY - xOffset) + "px")
				.css("left",(e.pageX + yOffset) + "px")
				.fadeIn("fast");
		},

		mouseleave : function(e) {

			this.title = this.t;
			$("#tooltip").remove();

		},

		mousemove : function(e) {

			$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");


		}

	}, 'a.tooltip-link');


};

// starting the script on page load
$(document).ready(function(){
	tooltip();
});

