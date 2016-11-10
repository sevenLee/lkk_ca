//     about_1_3

$(function() {

    if (isIE(9) || isIE(8)) {
        $(".album-page .item-big .item").append('<div class="album-buttom-shadow"></div>');
        var swiper = new Swiper('.swiper-container', {
            // pagination: '.swiper-scrollbar',
            simulateTouch: false,
            slidesPerView: 12,
            centeredSlides: true,
            speed: 800,
            onTouchEnd:function(){
                var _index = $('.swiper-slide a').index($(this));
                
                $(".Events_ba").eq(_index).addClass('ev_on').siblings().removeClass('ev_on');
                // $(this).isTouched=false;
            }
        });
        
        $('.swiper-slide a').on('click',function(e){
            e.preventDefault();
            var _index = $('.swiper-slide a').index($(this));
            swiper.swipeTo( _index, 800 );
            $(".Events_ba").eq(_index).addClass('ev_on').siblings().removeClass('ev_on');
        });
        
        $('.eve_button').click(function(e) {
            e.preventDefault();
            var $this = $(this);
            $('html,body').animate({ scrollTop: $('#swiper_top').offset().top }, 500);
            var _index = swiper.activeIndex+1;
            swiper.swipeTo( _index, 800 );
            $(".Events_ba").eq(_index).addClass('ev_on').siblings().removeClass('ev_on');
        });

        $("img").each(function(){
            var _fname = $(this).attr('src').split('.');
            if(_fname[_fname.length-1].toLowerCase() == 'png'){
                $(this).addClass('ie-fix');
            }
        });

        $(".index-news .list-item .bx-caption p").dotdotdot({
            watch:'window'
        })
    
    } else {
        var _swiperIndex = 0;

        function sw() {
            if ($('.swiper-container').length > 0) {
                if ($(window).width() >= 768) {
                    var swiper = new Swiper('.swiper-container', {
                        scrollbar: '.swiper-scrollbar',
                        nextSlideMessage: '.eve_2',
                        scrollbarHide: true,
                        nextButton: '.eve_button',
                        slidesPerView: 12,
                        centeredSlides: true,
                        spaceBetween: 30,
                        grabCursor: true
                    });
                } else {

                    var swiper = new Swiper('.swiper-container', {
                        scrollbar: '.swiper-scrollbar',
                        scrollbarHide: true,
                        nextButton: '.eve_button',
                        slidesPerView: 4,
                        centeredSlides: true,
                        spaceBetween: 30,
                        grabCursor: true

                    });

                }
                swiper.activeIndex = _swiperIndex;

                swiper.on('onTransitionEnd', function(e) {
                    //                console.log(e)
                    var _index = e.activeIndex;
                    _swiperIndex = _index;
                    $(".Events_ba").eq(_index).addClass('ev_on').siblings().removeClass('ev_on');
                })

                //swiper.on('onInit', function(){});

                $('.swiper-slide a').click(function(e) {
                    var _index = $('.swiper-slide a').index($(this));
                    _swiperIndex = _index;
                    e.preventDefault();
                    swiper.slideTo(_index, 500);
                    $(".Events_ba").eq(_index).addClass('ev_on').siblings().removeClass('ev_on');
                })


                $('.eve_button').click(function() { $('html,body').animate({ scrollTop: $('#swiper_top').offset().top }, 500); });

            }

        }
        sw();
        $(window).on('resize', sw);        
    }
    


    
});