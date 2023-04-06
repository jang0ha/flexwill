const html = document.querySelector('html');
const body = document.querySelector('body');


/***
    WINDOW RESIZE
 */
var Init = {
    defaults: function () {
        this.resize();
        window.addEventListener("resize", this.resize);
    },
    resize: function () {
        // Init.getBrowserSize();

        Init.breakpoint = window.matchMedia('(min-width:991px)').matches;
        if (!Init.breakpoint) {
            html.classList.add("is-mobile")
            html.classList.remove("is-desktop")

        } else {
            html.classList.add("is-desktop")
            html.classList.remove("is-mobile")
            $(".header-burger").removeClass("is-open");
            $(".header-burger").prev(".menu-wrap").removeClass("is-open");
            // $(".header-burger").closest("header .container").removeClass("show-menu");

        }
    },
    getBrowserSize: function () {
        this.bodyHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        this.bodyWidth = Math.max(
            document.body.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.clientWidth,
            document.documentElement.scrollWidth,
            document.documentElement.offsetWidth
        );
    },
};
Init.defaults();


// 모바일 웹브라우저 스크롤 이슈
// js
function setScreenSize() {
    //먼저 뷰포트 높이를 얻고 1%를 곱하여 vh 단위 값을 얻는다.
	let vh = window.innerHeight * 0.01;
    //그런다음 --vh 사용자 정의 속성의 값을 문서의 루트로 설정!
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', setScreenSize);

//Javascript
//기본 세팅 

// let vh = window.innerHeight * 0.01; 
// document.documentElement.style.setProperty('--vh', `${vh}px`);

// //화면 리사이즈시 변경 

// window.addEventListener('resize', () => { let vh = window.innerHeight * 0.01; 
//     document.documentElement.style.setProperty('--vh', `${vh}px`); }); window.addEventListener('touchend', () => { let vh = window.innerHeight * 0.01; 
//     document.documentElement.style.setProperty('--vh', `${vh}px`); });



/***
    HEADER
 */
var Header = {
    init : function () {
		this.gnb();
        this.event();
        this.scroll();
    },
    gnb : function (e) {
        $(".header-burger").on("click", function (e) {
            e.preventDefault();
            if($(html).hasClass("is-mobile")){
                $(this).toggleClass("is-open");
                if($(this).hasClass("is-open")){
                    $(this).parent().prev(".menu-wrap").addClass("is-open");
                    $(html).addClass("gnb-opened");
                    $(html).removeClass("not-scroll");
                    $(html, body).on('scroll touchmove mousewheel', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                        });
                }else{
                    $(this).parent().prev(".menu-wrap").removeClass("is-open");
                    $(html).removeClass("gnb-opened");
                    $(html).removeClass("not-scroll");
                    $(html, body).off('scroll touchmove mousewheel');
                }
            }
        });
        $(".header-burger").on("focus", function (e) {
            e.preventDefault();
            if($(html).hasClass("is-desktop")){
                $(this).removeClass("is-open");
                $(this).prev(".menu-wrap").removeClass("is-open");
            }
        });
    },

    scroll : function(){
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            var headerTop = $("#header-block").height();
            if(scrollTop >= headerTop){
                $(html).addClass("is-scrolled");
            } else{
                $(html).removeClass("is-scrolled");
            }
        });
     
    },

    event :function(){
        // $("html, body").mCustomScrollbar();
    },  
}

/***
    COMMON
 */
var Common = {
	init: function () {
		this.common();
		window.addEventListener('mousewheel', Common.scrolling);
		window.addEventListener('touchmove', Common.scrolling);
	},
	common: function () {
		$(".scroll-y-dark").mCustomScrollbar({
			theme:"dark"
		});
	}
}

Header.init();
Common.init();

var innerWidth = window.innerWidth;
var logoWidth = $(".main-logo").outerWidth();
// console.log(logoWidth);





window.addEventListener('load', function(){
    /* AOS - Animate On Scroll Library */
    AOS.init();
})




