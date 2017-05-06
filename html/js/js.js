(function(){
	require('../style/normalize.css')
	require('../style/style.scss')
	require('../style/nav.scss')
	require('../style/loggin.scss')
	require('../style/footer.scss')

	window.Cookies = require('./cookies.js')
	window.$ = window.jQuery = require('./jQuery.js');
	require('./Wind.min.js')

	window.nav = {
		template : ['<div id="navs">',
'				',
'				<span class="text iconfont" style="float:right">&#xe60b; 咨询电话:0755-82780808</span>',
'				<ul class="navs">',
'					<li class="item"><a href="index.html" class="naver">首页</a>',
'					</li>',
'					<li class="item"><a href="javascript:;" class="naver">创业服务</a>',
'						<ul>',
'							<li><a href="javascript:;">创业政策</a></li>',
'							<li><a href="javascript:;">创业项目</a></li>',
'							<li><a href="javascript:;">就业服务</a></li>',
'							<li><a href="javascript:;">招生信息</a></li>',
'							<li><a href="javascript:;">职业指导</a></li>',
'						</ul>',
'					</li>',
'					<li class="item"><a href="javascript:;" class="naver">培训项目</a>',
'						<ul>',
'							<li><a href="javascript:;">企业内训</a></li>',
'							<li><a href="javascript:;">再就业培训</a></li>',
'							<li><a href="javascript:;">职业技能培训</a></li>',
'						</ul>',
'					</li>',
'					<li class="item"><a href="/signUp.html" class="naver">在线报名</a>',
'						<ul>',
'							<li><a href="/signUp.html">培训报名</a></li>',
'							<li><a href="/signUp.html?show=competition">竞赛报名</a></li>',
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
'					<li class="item"><a href="/introduce.html" class="naver">了解环宇</a>',
'						<ul>',
'							<li><a href="/introduce.html">关于环宇</a></li>',
'							<li><a href="/artical.html">学校资讯</a></li>',
'							<li><a href="">学校风采</a></li>',
'							<li><a href="javascript:;">考试指南</a></li>',
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
		_this.find("ul").addClass('active').stop().animate({"opacity":1},100);
		_this.siblings().find("ul").removeClass('active').stop().animate({"opacity":0},100);
	});

	/***********autoLogin*********/
	var $logginButton = $('#header').find('.logButton'),
		$user = $('#header').find('.user');

	if(Cookies.get('username')) 
		$.ajax({ 
			url : "http://www.guozewei.cn/login", 
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
})();