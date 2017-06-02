(function(){ 
	

	require('../style/normalize.css')
	require('../style/style.scss')
	require('../style/nav.scss')
	require('../style/loggin.scss')
	require('../style/footer.scss')

	window.Cookies = require('./cookies.js')
	window.$ = window.jQuery = require('./jQuery.js');
	window.URL = './';
	require('./Wind.min.js')

	

	var header = {
		template : ['<div class="headerWrap">',
'        <div class="logo">',
'            <img src="./dist/assets/img/logo.png" style="margin-right:1em;" width="60px"><span class="name">深圳市创新工匠投资咨询有限公司</span>',
'        </div>',
'        <div class="logButton" href="loggin.html">登录/注册</div>',
'        <div class="user">',
'            <div class="username iconfont">Windlike &#xe620;</div>',
'            <div class="menus">',
'                <div class="menu iconfont">&#xe60e; 注销</div>',
'            </div>',
'        </div>',
'    </div>'].join("")
	};
	$('#header').Use(header);
	window.nav = {
		template : ['<div id="navs">',
'				',
'				<span class="text iconfont" style="float:right">&#xe60b; 咨询电话:0755-82780808</span>',
'				<ul class="navs">',
'					<li class="item"><a href="index.html" class="naver">首页</a>',
'					</li>',
/*'					<li class="item"><a href="javascript:;" class="naver">创业服务</a>',
'						<ul>',
'							<li><a href="javascript:;">创业政策</a></li>',
'							<li><a href="javascript:;">创业项目</a></li>',
'							<li><a href="javascript:;">就业服务</a></li>',
'							<li><a href="javascript:;">招生信息</a></li>',
'							<li><a href="javascript:;">职业指导</a></li>',
'						</ul>',
'					</li>',*/
'					<li class="item"><a href="javascript:;" class="naver">培训项目</a>',
'						<ul>',
'							<li><a href="./view.html?id=590f2fdbd7b84e0b20b2ff2b">企业内训</a></li>',
//'							<li><a href="javascript:;">再就业培训</a></li>',
'							<li><a href="./view.html?id=590f2fdbd7b84e0b20b2ff2b">职业技能培训</a></li>',
'						</ul>',
'					</li>',
'					<li class="item"><a href="./signUp.html" class="naver">在线报名</a>',
'						<ul>',
'							<li><a href="./signUp.html">培训报名</a></li>',
'							<li><a href="./signUp.html?show=competition">竞赛报名</a></li>',
'						</ul>',
'					</li>',
'					<li class="item"><a href="javascript:;" class="naver">在线学习</a>',
'						<ul>',
'							<li><a href="javascript:;">相关资料</a></li>',
'							<li><a href="javascript:;">在线视频</a></li>',
'							<li><a href="javascript:;">在线测试</a></li>',
'						</ul>',
'					</li>',
'					<li class="item"><a href="javascript:;" class="naver">下载专区</a>',
'						<ul>',
'							<li><a href="javascript:;">竞赛说明</a></li>',
'							<li><a href="javascript:;">竞赛报名表</a></li>',
'							<li><a href="javascript:;">工作证明模板</a></li>',
'							<li><a href="javascript:;">更多下载</a></li>',
'						</ul>',
'					</li>',
'					</li>',
'					<li class="item"><a href="./introduce.html" class="naver">了解公司</a>',
'						<ul>',
'							<li><a href="./introduce.html">关于公司</a></li>',
'							<li><a href="./artical.html?type=all">学校资讯</a></li>',
'							<li><a href="./school.html">学校风采</a></li>',
//'							<li><a href="javascript:;">考试指南</a></li>',
'						</ul>',
'					</li>',
'					<div class="bg"></div>',
'				</ul>',
'			</div>'].join("")
	};
	$('#nav').Use(nav);
	var index = parseInt($('#nav').attr('data-index'));
	$($('#nav').find('.bg')[0]).css('left', index * 110 + 'px');
	$($('#nav').find('.naver')[index]).css('color', '#3882b0');

	$('#nav').stop().mouseleave(function() {
		$('.bg').stop().animate({'left':index*110},1000);
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
	$('.navs .item').mouseover(function() {
		var _this=$(this);
		$(this).find('ul').css({"display":"block"});
		$('.bg').stop().animate({'left':_this.index() * 110 + 'px'},100);
		_this.find("ul").addClass('act').stop().animate({"opacity":1},100);
		_this.siblings().find("ul").removeClass('act').stop().animate({"opacity":0},100);
	});

	/***********autoLogin*********/
	var $logginButton = $('#header').find('.logButton'),
		$user = $('#header').find('.user');

	if(Cookies.get('username')) 
		$.ajax({ 
			url : URL + "/login", 
			type:"POST", 
			dataType : "JSON",
			data:{ 
				username : Cookies.get('username'),
				password : Cookies.get('password') 
			}, 
			success : function(data){
				if(data.success){ 
					$logginButton.css('display', 'none');
					$user.css('display', 'block'); 
					$($user.find('.username')[0]).html(Cookies.get('username') + ' <i class="iconfont">&#xe620;</i>');
					$user.on('mouseenter', function(){
					$($user.find('.menus')).fadeIn(300); }); 
					$user.on('mouseleave',function(){ 
						$($user.find('.menus')).fadeOut(300); 
					});
					
					$user.find(".menu:contains('注销')").on('click', function(){

							Cookies.unset("username");
							Cookies.unset("password");
							location.reload();
						})
				}
					
					
			}
			
	});
	/*****************************/
	/************footer***********/
	var footer = {
		template : ['<div class="flexBox">',
'        <div class="left">',
'            <div class="code"></div>',
'            环宇培训中心创新办学理念，大力推行与企业及大专院校的人才培养及输出战略合作，采取社会招生、 定单培训、联合办学、政府企业委培、专题讲座等培训方式多层次全方位开展教学。',
'        </div><!--',
'             -->',
'        <div class="center">',
'            <div class="logo"></div>',
'            <div class="title">深圳市创新工匠投资咨询有限公司</div>',
'        </div><!--',
'             -->',
'        <div class="right">',
'            <div class="title">友情链接</div>',
'            <ul>',
'                <li><a href="http://www.30c.cn/">中网互联</a></li>',
'                <li><a href="http://www.beida100.com/">百年教育网</a></li>',
'                <li><a href="http://www.babyschool.com.cn/zaojiao/list_9.html">幸福家庭网</a></li>',
'                <li><a href="http://www.jiaoyuda.com/">教育大论文网</a></li>',
'            </ul>',
'            <ul>',
'                <li><a href="http://www.szhuanyupeixun.com/index.asp">深圳市职业培训网</a></li>',
'                <li><a href="http://www.xykj2007.net/">整合网络营销</a></li>',
'                <li><a href="http://www.huayiming.com/">华艺名教育网</a></li>',
'                <li><a href="http://www.xuanke114.com/">天天电脑学习网</a></li>',
'            </ul>',
'        </div>',
'    </div>',
'    <div class="message">',
'        <div class="link">在线客服QQ：362628685 2540915119</div>',
'        /',
'        <div class="link">电话：0755-82780808</div>',
'        /',
'        <div class="link">邮箱：huanyuzypeixun@163.com</div>',
'        <div class="description">粤ICO备09185067号</div>',
'    </div>'].join("")
	};

	$('.footer').Use(footer);
})();