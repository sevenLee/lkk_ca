var isIE = function(ver){
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

var _slider = false;
var kv_slider, servire_slider, news_slider;
var $sliderRelate = $(".related .slider"),
	$sliderMedia = $(".media-list .slider"),
	$sliderOne = $(".slider-one .items"),
	$sliderMutiple = $(".slider-mutiple .items"),
	$sliderAlbum = $(".slider-album .items"),
	$sliderAlbum2 = $(".album-list .item .col2"),
	$realSlider = $(".slider-real .items"),
	$realThumbSlider = $(".item-thumb"),
	sliderRelate,
	sliderAlbum,
	sliderAlbum2 = [],
	sliderMedia = [],
	sliderMutiple = [],
	sliderSet={},
	realSlider, realThumbSlider;

var _width;
$(function(){
	_width = viewport().width;
	loadSlider();
	checkMask();
    

	$('input, textarea').placeholder();

	if($sliderRelate.length && 1==1){
		sliderInitSet($(".related .container"), false, _width <= 991 ? 0 : 16, 1, 3, true);
		sliderRelate = $sliderRelate.bxSlider(sliderSet);
	}
	if($sliderMedia.length && 1==1){

		sliderInitSet($(".tab_container").eq(0), false, 0, 1, _width<=991?_width<=767?1:3:4, false, 767);
		$sliderMedia.each(function(index, item){
			sliderMedia.push($(item).bxSlider(sliderSet));
		})
	}

	if($sliderMutiple.length && 1==1){
		$sliderMutiple.each(function(index, item){
			sliderMutiple.push($(item).bxSlider({controls:false, pager: true ,useCSS: false}));
		})
	}
	if($sliderAlbum.length && $sliderAlbum.find('.item').length>1){
		$sliderAlbum.bxSlider({
			pager: true,
			useCSS: false
		});
	}

	if($sliderAlbum2.length && 1==1){
		if(_width <= 640){
			$sliderAlbum2.each(function(index, item){
				sliderAlbum2.push($(item).bxSlider({controls:false, pager: true,useCSS: false}));
			})
		}else{
			if(sliderAlbum2.length){
				sliderAlbum2.each(function(index, item){
					item.destroySlider();
				})
			}
		}
	}
	if($realSlider.length){
		realSlider = $realSlider.bxSlider({
			useCSS: false,
			infiniteLoop:false,
			hideControlOnEnd:true,
			adaptiveHeight: true,
			pagerCustom: _width > 640 ?'.item-thumb' : '',
			onSlideBefore:function($slideElement, oldIndex, newIndex){
				changeRealThumb($realThumbSlider,newIndex);
			}
	    });
	    realThumbSlider = $realThumbSlider.bxSlider({
	    	useCSS: false,
			minSlides: 5,
			maxSlides: 5,
			slideWidth: 200,
			slideMargin: 10,
			moveSlides: 5,
			pager:true,
			infiniteLoop:false,
			controls: false
	    });
	}

	/*ios hover*/
	
	var mobileHover = function () {
	    $('*').on('touchstart', function () {
	        $(this).trigger('hover');
	    }).on('touchend', function () {
	        $(this).trigger('hover');
	    });
	};
	if(iOS) mobileHover();

	//top-btn
	$(document).on('scroll', function(){
		if ($(window).scrollTop() > 100) {
			$('.top_btn_too').removeClass('hidden-xs');
		} else {
			$('.top_btn_too').addClass('hidden-xs');
		}
	});
	$(window).on('load', function(){
		if ($(window).scrollTop() > 100) {
			$('.top_btn_too').removeClass('hidden-xs');
		} else {
			$('.top_btn_too').addClass('hidden-xs');
		}
	})

	$(".inpt_icon").click(function(){
		$("#searchForm").submit();
	})

	$(".qr_link a").click(function(e){
		e.preventDefault();
		$(".qrLink").html($(this).clone().removeAttr('data-toggle').removeAttr('data-target'));
	});

	$(".bx-pager-link").on('click', function(){
		$(this).blur();
	})

	if(!isIE(8)){
		$(window).bind('resize', function(){
			loadSlider();
			checkMask();
	        _width = viewport().width;

			if($sliderRelate.length && 1==1){
				sliderInitSet($(".related .container"), false, _width <= 991 ? 0 : 16, 1, 3, true);
				sliderRelate.reloadSlider(sliderSet);
			}
			if($sliderMedia.length && 1==1){
				sliderInitSet($(".tab_container"), false, 0, 1, _width<=991?_width<=767?1:3:4, false, 767);
				
				$(sliderMedia).each(function(index, item){
					item.reloadSlider(sliderSet);
				})
			}
			if($sliderAlbum2.length && 1==1){
				
				if(_width <= 640){
					if(sliderAlbum2.length){
						$(sliderAlbum2).each(function(index, item){
							item.reloadSlider({controls:false, pager: true, useCSS: false});
						})					
					}else{
						$sliderAlbum2.each(function(index, item){
							sliderAlbum2.push($(item).bxSlider({controls:false, pager: true, useCSS: false}));
						})					
					}
				}else{
					if(sliderAlbum2.length){
						$(sliderAlbum2).each(function(index, item){
							item.destroySlider();
						})
					}
				}
			}
			if($realSlider.length){
				realSlider.reloadSlider({
					useCSS: false,
					infiniteLoop:false,
					hideControlOnEnd:true,
					swipeThreshold: 150,
					adaptiveHeight: true,
					pagerCustom: _width > 640 ?'.item-thumb' : '',
					onSlideBefore:function($slideElement, oldIndex, newIndex){
						changeRealThumb(realThumbSlider,newIndex);
					}
			    });
			    realThumbSlider.reloadSlider({
			    	useCSS: false,
					minSlides: 5,
					maxSlides: 5,
					slideWidth: 200,
					slideMargin: 10,
					swipeThreshold: 150,
					moveSlides: 5,
					pager:true,
					infiniteLoop:false,
					controls: false
			    });			
			}

		})
	}else{
		//inner banner
		var _inbanner = $(".container.about_us .car-bn, .contanier.about_us .csr-bn, .container.about_us .list-item, .container.about_us .join-bn");
		if(_inbanner.length){	
				
			if(_width >= 1600){
				_inbanner.css('height', '210px');
			}
			if(_width >= 1920){
				inbanner.css('height', '253px');
			}			
		}
	}



	$(".navbar-toggle").click(function(){
		if($(this).hasClass('collapsed')){
			$(".mask").addClass('active')
		}else{
			setTimeout(function(){
				$(".mask").removeClass('active')
			}, 500)
		}
	})	

	$(".mask").click(function(){
		cur = $(this);
		if(cur.hasClass('active')){
			cur.removeClass('active')
			$(".navbar-toggle").click();
		}
	})

/*	$(".main-nav li").click(function(){
		cur = $(this);
		cur.addClass('active').siblings().removeClass('active');
		// cur.toggleClass('active');
		// 
		$(".main-nav li a span").removeClass('glyphicon-menu-up').addClass('glyphicon-menu-right')
		if(cur.find('a > span').hasClass("glyphicon-menu-right")){
			cur.find('a > span').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-up')
		}
		
	})*/

	$('ul.top-nav li.dropdown').hover(function(){
	  
	},function(){
		$(this).removeClass('open');
	});	
	
	$(".main-nav li").hover(function(){
		if(_width > 767){
			cur = $(this);
			cur.addClass('active')
			cur.find('a > span').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-up')			
		}
	},function(){
		if(_width > 767){
			cur = $(this);
			cur.removeClass('active');
			cur.find('a > span').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-right')			
		}	
	})
	$(".main-nav > li > a").click(function(e){
		e.preventDefault();
		var _href = $(this).attr('href');
		if (_href != '#') {
			location.href = _href;
		}
	})
	$(".main-nav li").click(function(e){
		// e.preventDefault();
        // console.log(_width)
		if(_width <= 767){

			var _offset = $(this).closest('.main-nav').find('.active');
			_offset = _offset.length > 0 ? _offset.offset().top : 0;
			var _height = $(this).closest('.main-nav').find('.active ul').height();

			var cur = $(this);

            if(!cur.hasClass('active')){
            	var offset = cur.offset().top;
            	offset = offset>_offset?offset - _height:offset;

                cur.toggleClass('active').siblings().removeClass('active');

                cur.find('a > span').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-up');
                cur.each(function(){
                	$(this).find('a > span').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-right').find('ul').hide('slow');	                	
                });
            }else{
            	var offset = 0;
                cur.toggleClass('active').find('a > span').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-right')
            }
           
            setTimeout(function(){
            	$('body,html').stop().animate({scrollTop:offset}, 400);
            },700)
		}
	})


	$(".search input").focus(function(){
		$(this).attr('placeholder', '');
	})
	/*
	$(".search input").blur(function(){
		$(this).attr('placeholder', '搜寻李锦记健康产品集团');
	})
	*/


	$(".index-news .list-item").bxSlider({
		'captions':true,
		'controls':false,
		 onSliderLoad: function(){

		 	if(_slider == false){
			 	$(".img-list .item:not('.bx-clone')").each(function(i,e){
			 		cur = $(this);
			 		title = cur.find('img').attr('title');
			 		href = cur.attr('href');
			 		date = cur.find('>p span').html();
			 		cur.find('>p span').remove();
			 		content = cur.find('>p').html();
			 		
			        $(".pager-list").append('<a href="'+href+'" class="item">'+title+'<span>'+date+'</span></a>');
			        cur.find('.bx-caption').append('<p>'+content+'</p>').append('<div>'+date+'</div>');

			        if(cur.find('.bx-caption p').height() > 48){
			        	cur.find('.bx-caption p').addClass('ellipse');
			        }

			    })			 		
		 	}
		 }	
	});	

	if($(".index-service .list-item .item").length > 4){
		$(".index-service .list-item").bxSlider({
			pager:false,
			nextSelector: '.index-service .slider-next',
			prevSelector: '.index-service .slider-prev',
			nextText: '<span class="glyphicon glyphicon-menu-right"></span>',
			prevText: '<span class="glyphicon glyphicon-menu-left"></span>'
		})		
	}else{
		$(".index-service .slider-control").hide();
		$(".wrapper .index-service").css('padding-bottom','0px');
	}
})

  $(window).load(function() {
        if($sliderOne.length){
        	$sliderOne.each(function(){
        		var $this = $(this);
        		if($this.find('img').length >1){
        			$this.bxSlider({
                pager: true,
                useCSS: false
            });
        		}
        	})
        }
   });


$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}

function viewport() {
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;

    if ((is_chrome)&&(is_safari)) {is_safari=false;}
    if ((is_chrome)&&(is_opera)) {is_chrome=false;}

    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {    
         a = 'client';
         e = document.documentElement || document.body;    
    }
   if (is_safari) {    
         a = 'client';
         e = document.documentElement || document.body;    
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function checkMask()
{
	
	if($(window).width() > 767){
		$(".mask").removeClass('active')
	}else{
		if($(".navbar-toggle").hasClass('collapsed')){
			$(".mask").removeClass('active')
		}else{
			
			$(".mask").addClass('active')
			
		}
	}
}

function loadSlider()
{

  //   var cfg = {
		// 	'captions':true,
  //           'auto':true
		// };	

   // if(typeof(servire_slider) != 'undefined' && typeof(servire_slider.destroySlider) == 'function') servire_slider.destroySlider();
    //if(typeof(news_slider) != 'undefined' && typeof(news_slider.destroySlider) == 'function') news_slider.destroySlider();
	if (isIE(8)) {		
		if(_width >= 1600){
			$(".kv").css('max-height', '433px').find('.item').css('max-height', '433px');
		}
		if(_width >= 1920){
			$(".kv").css('max-height', '520px').find('.item').css('max-height', '520px');
		}
	}
	if(_width > 767){
		var cfg = {
			'captions':true,
            'auto':true,
            onSliderLoad: function(){
        	 	$(this).find('.item').each(function(_i, _v){
        	 		var _title = $(_v).find('img').attr('title').replace(/(<br ?\/?>)*/g,"");
        	 		$(_v).find('img').attr('title', _title);
        	 	}) 	
            }
		}	
		var tar = 'kv1';
	}else{
		var cfg = {
			'captions':true,
			'controls':false,
            'auto':true,
            onSliderLoad: function(){
        	 	$(this).find('.item').each(function(_i, _v){
        	 		var _title = $(_v).find('img').attr('title').replace('<br>', '');
        	 		$(_v).find('img').attr('title', _title);
        	 	}) 	
            }
		}
		var tar = 'kv2';	
	}

	if(typeof(kv_slider) != 'undefined' && typeof(kv_slider.destroySlider) == 'function'){ 
		kv_slider.destroySlider();
	}
	
	
	kv_slider = $("."+tar+" .list-item").bxSlider(cfg);
	
	
//	_slider = true;		
}

function slideWidth(_target, num)
{
	return $(_target).width() / num;
}

function sliderInitSet(tar, pager, margin, min, max, cusController, responsiveWidth)
{
	_responsiveWidth = responsiveWidth || 991;

	_margin = margin || 0;
	sliderSet.pager = pager || false;
	sliderSet.minSlides = min || 1;
	sliderSet.maxSlides = max || 3;
	_controller = cusController || false;
	// sliderSet.oneToOneTouch = false;
	// sliderSet.preventDefaultSwipeY = true;
	// swipeThreshold: 150;
	// sliderSet.touchEnabled = true;
	sliderSet.useCSS = false;
	if(_controller){
		sliderSet.nextSelector = '.slider-next';
		sliderSet.prevSelector = '.slider-prev';
		sliderSet.nextText = '<span class="glyphicon glyphicon-menu-right"></span>';
		sliderSet.prevText = '<span class="glyphicon glyphicon-menu-left"></span>';			
	}

	sliderSet.moveSlides =(_width <=_responsiveWidth ? min : max);
	sliderSet.slideWidth = (tar.width() + _margin) / (_width <=_responsiveWidth ? min : max);
	console.log('slideWidth:'+sliderSet.slideWidth);

}

//slider!=$thumbSlider. slider is the realslider
function changeRealThumb(slider,newIndex){
  
  var $thumbS=$(".item-thumb");
  $thumbS.find('.active').removeClass("active");
  $thumbS.find('a[data-slide-index="'+newIndex+'"]').addClass("active");
  slider.goToSlide(parseInt(newIndex/5));
  console.log(newIndex);
}

function pagerJump(obj)
{
	var _pathname = location.pathname;
	var _pageNum = parseInt($(obj).parent().find('.jump-page').val());
	//var _query = parsrQueryString();
	var _queryStr = '';

	for (var _key in urlParams) {
		if(_key != 'page' && _key != ""){
			_queryStr += (_queryStr.length>0?'&':'')+_key+'='+urlParams[_key];
		}
	}
	if (_queryStr.length > 0) {
		_queryStr+='&';
	}
	if (!isNaN(_pageNum)) {
		location.href = _pathname+'?'+_queryStr+'page='+_pageNum;
	}
}

function selectOpen(obj)
{
	var _href = $(obj).find('option:selected').val();

	if (_href != "") {
        var link = document.createElement('a');
		link.href = _href;
		if(_width>768)link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click(); 
	}
}

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();