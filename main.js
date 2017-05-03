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

var TEMPLATE = `<li><a href="/view.html?id={{_id}}"><i class="iconfont icon">&#xe60a;</i><span>{{title}}</span></a></li>`;


$.ajax({
	url : "http://www.guozewei.cn/title",
	type: "GET",
	dataType : "JSON",
	success : function(data){
		var lists = $(".lists");
		console.log(data);
		for(var i=0;i<data.length;i++){
            var temp = TEMPLATE;
            for(key in data[i]){
            	if(key == "title")
            		data[i][key] = data[i][key].trim();
                temp = temp.replace("{{"+key+"}}",data[i][key]);
            }
            lists.append(temp);
		}

	}
		
});