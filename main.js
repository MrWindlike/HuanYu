require('./style/hotClass.scss')
require('./style/artical.scss')
require('./style/carousel.scss') 
require('./style/aside.scss')

require('./js/js.js')
require('./js/Wind.js')
require('./js/carousel.js')


$(".Totop").on("click",function(){
    $("body").animate({ scrollTop: 0 }, 500);
})

$(window).on("scroll",function(){
    var scrTop =  $(document).scrollTop();
    $(".consult_part").stop().animate({ bottom: 100 - scrTop + "px" }, 400);
});

$(".carousel").carousel({num:5,path:"./dist/assets/img/"});

$.ajax({
	url : "http://www.guozewei.cn/title",
	type: "GET",
	dataType : "JSON",
	success : function(data){
		console.log(data);
	}
		
});