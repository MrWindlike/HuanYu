require('./style/normalize.css')
require('./style/style.scss')
require('./style/nav.scss')
require('./style/hotClass.scss')
require('./style/artical.scss')
require('./style/carousel.scss')
require('./style/aside.scss')
require('./style/loggin.scss')
require('./style/footer.scss')


window.$ = window.jQuery = require('./js/jQuery.js')
require('./js/carousel.js')
require('./js/input.js')

$('.item').mouseover(function() {
	var _this=$(this);
	$(this).find('ul').css({"display":"block"});
	$('.bg').stop().animate({'left':_this.index() * 110 + 'px'},100);
	_this.find("ul").addClass('active').stop().animate({"opacity":1},100);
	_this.siblings().find("ul").removeClass('active').stop().animate({"opacity":0},100);
});
$('#nav').stop().mouseleave(function() {
	$('.bg').stop().animate({'left':0},1000);
	$('.item ul').css({"display":"none"});
});

$(".Totop").on("click",function(){
    $("body").animate({ scrollTop: 0 }, 500);
})

$(window).on("scroll",function(){
    var scrTop =  $(document).scrollTop();
    $(".consult_part").stop().animate({ bottom: 100 - scrTop + "px" }, 400);
});

$(".carousel").carousel({num:5,path:"./dist/assets/img/"});

/*loggin*/
require('./js/input.js')

$("#bg").input();

$("#bg>*:not(svg)").on("click", function(event){
	event.stopPropagation();
})

$("#bg, #bg .closeButton").on('click', function(event){
	$("#bg").fadeOut(300);
	$("#bg input").val("");
	$("#bg .text").attr("style", "");
});

$("#header .logButton").on('click', function(){
	$("#bg").fadeIn(300);
});