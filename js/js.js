require('../style/normalize.css')
require('../style/style.scss')
require('../style/nav.scss')
require('../style/loggin.scss')
require('../style/footer.scss')

window.Cookies = require('./cookies.js')
window.$ = window.jQuery = require('./jQuery.js');

$('#nav').stop().mouseleave(function() {
	$('.bg').stop().animate({'left':0},1000);
	$('.item ul').css({"display":"none"});
});

/***********input*************/
require('./input.js')

$("#bg").input();
$("#register").input({left:"0em"});

$("#bg>*:not(svg)").on("click", function(event){
	event.stopPropagation();
})

$("#bg, #bg .closeButton").on('click', function(event){
	$("#bg").fadeOut(300);
	$("#bg input").val("").removeClass('input-danger');
	$("#bg .alert").css('opacity', '0');
	$("#bg .text").attr("style", "");
});

$("#header .logButton").on('click', function(){
	$("#bg").fadeIn(300);
});

/*****************************/
/***********login*************/
require('./login.js')

$(".loggin").login();
/*****************************/
$('.item').mouseover(function() {
	var _this=$(this);
	$(this).find('ul').css({"display":"block"});
	$('.bg').stop().animate({'left':_this.index() * 110 + 'px'},100);
	_this.find("ul").addClass('active').stop().animate({"opacity":1},100);
	_this.siblings().find("ul").removeClass('active').stop().animate({"opacity":0},100);
});

/***********autoLogin*********/
var $logginButton = $('#header').find('.logButton'),
	$user = $('#header').find('.user');

if(Cookies.get('username'))
	$.ajax({
		url : "http://www.guozewei.cn/login",
		type: "POST",
		dataType : "JSON",
		data:{
			username : Cookies.get('username'),
			password : Cookies.get('password')
		},
		success : function(data){
			if(data.success){
				$logginButton.css('display', 'none');
				$user.css('display', 'block');

				$user.find(".menu:contains('注销')").on('click', function(){

					Cookies.unset("username");
					Cookies.unset("password");
					location.reload();
				})
			}
				
				
		}
		
	});
/*****************************/