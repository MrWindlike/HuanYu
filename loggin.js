require('./style/normalize.css')
require('./style/style.scss')
require('./style/nav.scss')
require('./style/loggin.scss')
require('./logginPage.scss')
require('./style/footer.scss')


window.$ = window.jQuery = require('./js/jQuery.js');


$('#nav').stop().mouseleave(function() {
	$('.bg').stop().animate({'left':0},1000);
	$('.item ul').css({"display":"none"});
});

/***********loggin*************/
require('./js/input.js')

$("#bg").input();
$("#register").input({left:"0em"});

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

/*****************************/
/***********register**********/
require('./js/register.js')

$("#register").register();
/*****************************/
$('.item').mouseover(function() {
	var _this=$(this);
	$(this).find('ul').css({"display":"block"});
	$('.bg').stop().animate({'left':_this.index() * 110 + 'px'},100);
	_this.find("ul").addClass('active').stop().animate({"opacity":1},100);
	_this.siblings().find("ul").removeClass('active').stop().animate({"opacity":0},100);
});

