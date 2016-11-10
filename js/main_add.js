// tino. js  Modify  Increase. 

//csr_report.html  
//tab
var $sliderbusiness = $(".business_bn .business_slider");
var sliderbusiness = [];
var $business_slider_full = $('.business_slider_full');
var business_slider_full = [];

$(function() {

    var _showTab = 0;
    var $defaultLi = $('ul.tabss li').eq(_showTab).addClass('hite');


    $($defaultLi.find('a').attr('href')).css('display', 'block').siblings().hide();


    //for pc
    $('ul.tabss li,.tabPanel ul li').click(function(e) {

        e.preventDefault();

        //console.log('19 line click');
        var $this = $(this),
            _clickTab = $this.find('a').attr('href');

        //$this.addClass('hite').siblings('.hite').removeClass('hite');
        $('.tab_container > .hidden-xs').find('> div').hide();
            $this.addClass('hite').siblings('.hite').removeClass('hite');
            $('.tab_container > .hidden-xs > div:eq(' + $(this).index() + ')').show().siblings().hide();

        $(_clickTab).stop(false, true).fadeIn().siblings().hide();

        if ($sliderMedia.length && 1 == 1) {
            sliderInitSet($(".tab_container"), false, 0, 1, _width <= 991 ? _width <= 767 ? 1 : 3 : 4, false, 767);
            $(sliderMedia).each(function(index, item) {
                item.reloadSlider(sliderSet);
            })
        }

        reloadAllSlider();

        return false;
    }).find('a').focus(function() {
        this.blur();
    });
});

//select
if ($('.opt select').length > 0) {
    jQuery(function($) {
        $(".opt select").not(".native select").selectui({
            autoWidth: true,
            interval: true

        });
    });
}




$(function() {


    //   business.html    
    var _width;

    $(window).on('load resize', function() {
        _width = $(window).width();
        tabWidth();
        reloadAllSlider();
    });

    function tabWidth() {
        _target = $(".about_tabs .tabPanel > ul > li")
        _num = _target.length;
        if (_width > 767) {
            _target.css('width', ((100 - (_num - 1) * 0.8) / _num) + '%');
        } else {
            _target.css('width', '100%');
        }

        //    console.log((100 - (_num - 1)*0.6))
    }


    //csr_report.html    
    $('.re_slider_bn').bxSlider({
        slideWidth: 230,
        minSlides: 4,
        auto: false, //輪播自動
        maxSlides: 4,
        'default': 500,
        controls: true,
        pager: false, //圓點
        slideMargin: 16
    });

    //  main  

    $('.tabPanel ul li').click(function() {
        var _tab = $(this).attr("data-tabs-title")
        $(this).addClass('hit').siblings().removeClass('hit');
        $('.panes>div:eq(' + $(this).index() + ')').show().siblings().hide();
        $('.panes>div:eq(' + _tab + ')').show().siblings().hide();
    })


    $(".top").click(function(e) {
        e.preventDefault();
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $body.animate({
            scrollTop: 0
        }, 600);
    })

    $(".top_too").click(function(e) {
        e.preventDefault();
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $body.animate({
            scrollTop: 0
        }, 600);
    })


    $('.mo_item .hd').click(function() {
        $(this).toggleClass('on').parents('li').siblings().find('.hd').removeClass('on');
        setTimeout(function() {
            //        console.log('test')
            if ($sliderMutiple.length && 1 == 1) {
                $(sliderMutiple).each(function(index, item) {
                    item.reloadSlider({ controls: false, pager: true, useCSS: false, adaptiveHeight: true });
                })
            }

        }, 100)
    })
    $('.mo_qr .mo_qr_item .qr_hd').click(function() {
        $(this).find('.qr_bd').slideToggle('fast');
        $(this).closest('.mo_qr_item').toggleClass('on');
    })

    $(".top_btn a").hide();

    $("ul.accordion > li > a").click(function () {
        var cur = $(this).parent();

        //console.log('176 line click');

        cur.find('.bd').slideToggle('fast', function () {
            if ($(this).css('display') == 'block') {
                $(".top_btn a").show()
            } else {
                $(".top_btn a").hide()
            }
            $('body').scrollTop(cur.offset().top);
        });
        cur.siblings().children('.bd').hide();

        reloadAllSlider();

    });
        //     function  index_input() {  
        //         $('.top-nav .search input').stop().toggleClass('index_input')
        //        .animate({maxWidth:500},1300,function(){
        //         $(this).dequeue().removeAttr('style').stop()
        //         });
        //     }
        //       
        //    if($('.top-nav .search').length > 0){
        //        $('.top-nav .inpt_icon').on('click',function(){
        //             $('.top-nav .search input').toggleClass('index_input')  
        //
        //        });    
        //    }
        //    
        //  main end

    //qa 
    if ($('.qa_cont .item').length > 0) {
        $('.qa_cont .item').on('click', function(e) {
            if($(this).hasClass('on')){
                $(this).attr('class', 'item');
            }else{
                $(this).attr('class','item on');
            }
            
        });
    }


    //     about_1_3


    $('.video-page .link').on('click', function(e) {
        e.preventDefault();
        $('input[name=url_text]').val(location.href)



    });
    if ($('#myModal').length > 0) {
        $('#myModal').modal(options)


    }

    //join
    $('.join_slider,.join_team_slider').bxSlider({
        pager: true,
        controls: true,
        mode: 'fade'
    });

    //   business
    $sliderbusiness.each(function(index, item) {
        if ($(item).find('.item').length > 3) { 
            sliderbusiness.push($(item).bxSlider({
                slideWidth: 324,
                slideMargin: 5,
                minSlides: 3,
                maxSlides: 3,
                pager: true,
                controls: true
            }));
        }
    });

    $business_slider_full.each(function(index, item) {
        //if ($(item).find('.item').length > 3) {
            business_slider_full.push($(item).bxSlider({
                pager: true,
                auto: true,
                autoHover: true,
                controls: true,
                adaptiveHeight: true,
                mode: 'fade'
            }));
        //}
    });

    //     tab_dlider   
    var _tab_dlider_btn = $('.tab_dlider ul li').length;

    if (_tab_dlider_btn > 3) {
        $('.tabPanel .slider-btn').show();

    } else {
        $('.tabPanel .slider-btn').hide();
    }

    $('.tab_dlider ul').bxSlider({
        slideWidth: 325,        
        minSlides: 3,
        maxSlides: 3,
        pager: false,
        //         infiniteLoop: false,
        nextSelector: '.slider-next',
        prevSelector: '.slider-prev',
        nextText: '<span class="glyphicon glyphicon-menu-right"></span>',
        prevText: '<span class="glyphicon glyphicon-menu-left"></span>',
        controls: true,
        infiniteLoop: false,
        hideControlOnEnd: true

    });


    $('.index-news .img-list .item .bx-caption > span').dotdotdot({
        wrap: 'letter',
        watch: true
    });     


    if ($('.main_hide').length > 0) {
        $('.main_hide').dotdotdot({
            ellipsis: '......',
            wrap: 'letter',
            watch: true
        });
    }

    if ($('.index-news .img-list .item .bx-caption p.ellipse').length > 0) {

        $('.index-news .img-list .item .bx-caption p.ellipse').dotdotdot({
            ellipsis: '...',
            wrap: 'letter',
            watch: true
        });
    }

    //about
    if($('.ab_slider .slide').length > 1){
        $('.ab_slider').bxSlider({
            pager: true,
            auto: true,
            autoHover: true,
            controls: true,
            autoControls: true,
            touchEnabled: false,
            onSliderLoad: function() {
                $('.bx-controls-auto').hide();
                $('.ab_slider').hover(function() {
                    $('.bx-stop').click();
                });
            }
        });        
    }
    
    if ($('#copyButton').length > 0) {   
        if (isIE(8)) {
            $("#copyButton").click(function(){
                copyToClipboardIE8("copyText");
            })     
        } else {
            $("#copyButton").click(function(){
                copyToClipboard(document.getElementById("copyText"));
            })       
        }   
    }

});


function reloadAllSlider() {
    if ($sliderbusiness.length) {
        setTimeout(function() {
            $(sliderbusiness).each(function(index, item) {
                item.reloadSlider({
                    slideWidth: 324,
                    slideMargin: 5,
                    minSlides: 3,
                    maxSlides: 3,
                    pager: true,
                    controls: true,
                    // slideMargin: 5
                });
            })

        }, 100)

    }

    if ($business_slider_full.length) {
        setTimeout(function() {
            $(business_slider_full).each(function(index, item) {
                item.reloadSlider({
                    pager: true,
                    auto: true,
                    autoHover: true,
                    controls: true,
                    adaptiveHeight: true,
                    mode: 'fade'
                });
            })
        }, 100)

    }
}

function copyToClipboardIE8(ilink)
{
    document.getElementById(ilink).select();
    var copyrange=document.getElementById(ilink).createTextRange();
    copyrange.execCommand("Copy");
} 


function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}
