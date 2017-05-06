require("./js/js.js")
require('./style/signUp.scss')
require("./js/selection.js")
var Check = require("./js/Check.js")


$(function(){

	var url = window.location.search;
	if(url){

		$(".navigation .item").toggleClass("active");
		$(".train").toggleClass("show");
		$(".train").toggleClass("hide");
		$(".competition").toggleClass("show");
		$(".competition").toggleClass("hide");
	}

	$(".navigation .item").click (function(){
		if($(".result").hasClass("show")){	//在报名成功页面显示的时候点击导航时执行
			Return();
		}
		if(!$(this).hasClass("active")){
			$(".navigation .item").toggleClass("active");
			$(".train").toggleClass("show");
			$(".train").toggleClass("hide");
			$(".competition").toggleClass("show");
			$(".competition").toggleClass("hide");
		}					
	});
	$(".sex label").click(function(){
		var index = $(".sex label").index(this);
		$(".sex .circle").removeClass("hide");
		switch(index){
			case 0:
					$(".sex .circle").css("left","68.2px");
					break;
			case 1:
					$(".sex .circle").css("left","124.1px");
					break;
			case 2:
					$(".sex .circle").css("left","68.2px");
					break
			case 3:4.1
					$(".sex .circle").css("left","124.1px");
					break;
		}
	});
	$(".submit").click(function(){
		var index = $(".submit").index(this);
		var checkObject = new Check();
		switch(index){
			case 0:
					var flag = true;//各项输入验证通过标志

					var name = $(".train input[name='name']")[0].value;
					var sex = $(".train .sex input:radio:checked").val();
					var degree = $(".container .selection")[0].innerHTML;
					var phone = $(".train input[name='phone']")[0].value;
					var qq = $(".train input[name='qq']")[0].value;
					var email = $(".train input[name='email']")[0].value;
					var learningGoal = $(".train .container .selection")[1].innerHTML;
					var learningChannel="";
					$("#learningChannel input:checkbox:checked").each(function(index){
						learningChannel += this.value;
						if(index!=$("#learningChannel input:checkbox:checked").length-1){
							learningChannel+=",";
						}
					});
					var course = "";
					$("#course input:checkbox:checked").each(function(index){
						course += this.value;
						if(index!=$("#course input:checkbox:checked").length-1){
							course+=",";
						}
					});
					//验证输入框

					if(!$("#course input:checkbox:checked").length){
						$($(".train .bubble-box")[8]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(!$("#learningChannel input:checkbox:checked").length){
						$($(".train .bubble-box")[7]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if (learningGoal==="--请选择--"){
						$($(".train .bubble-box")[6]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if (degree==="--请选择--"){
						$($(".train .bubble-box")[5]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}

					if(!checkObject.check({'email':email})){
						$($(".train .bubble-box")[4]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
						$($(".train input[name='email']")[0]).focus();
					}
					if(!checkObject.check({'qq':qq})){
						$($(".train .bubble-box")[3]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
						$($(".train input[name='qq']")[0]).focus();
					}
					if(!checkObject.check({"mobilePhone":phone})){
						$($(".train .bubble-box")[2]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
						$($(".train input[name='phone']")[0]).focus();
					}

					
					if(!checkObject.check({'name':name})){
						$($(".train .bubble-box")[1]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
						$($(".train input[name='name']")[0]).focus();
					}

					if(!sex){
						$($(".train .bubble-box")[0]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(!flag)
						return;

					$.ajax({
						url:"http://www.guozewei.cn/form",
						type:'post',
						data:{
							type:0,
							name:name,
							sex:sex,
							degree:degree,
							phone:phone,
							qq:qq,
							email:email,
							learningGoal:learningGoal,
							learningChannel:learningChannel,
							course:course,
						},
						success:function(result){
							dealwithResult(result);
						}
					});
					break;
			case 1:
					var flag = true;//各项输入通过验证标志

					var name = $(".competition input[name='name']")[0].value;
					var sex = $(".competition .sex input:radio:checked").val();
					var ID = $(".competition input[name='ID']")[0].value;
					var unit = $(".competition input[name='unit']")[0].value;
					var area=$(".competition .container .selection")[0].innerHTML;
					var degree=$(".competition .container .selection")[1].innerHTML;
					var mobilePhone= $(".competition input[name='mobilePhone']")[0].value;
					var phone= $(".competition input[name='phone']")[0].value;
					var workType=$(".competition input:checkbox")[0].value;
					var certificate=$(".competition .container .selection")[2].innerHTML;
					var seniority=$(".competition .container .selection")[3].innerHTML;

					if(seniority==="--请选择--"){
						$($(".competition .bubble-box")[10]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(certificate==="--请选择--"){
						$($(".competition .bubble-box")[9]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(!$(".competition input:checkbox:checked").length){
						$($(".competition .bubble-box")[8]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(!checkObject.check({'phone':phone})){
						$($(".competition .bubble-box")[7]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
						$($(".competition input[name='phone']")[0]).focus();
					}

					if(!checkObject.check({'mobilePhone':mobilePhone})){
						$($(".competition .bubble-box")[6]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
						$($(".competition input[name='mobilePhone']")[0]).focus();
					}
					if(degree==="--请选择--"){
						$($(".competition .bubble-box")[5]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(area==="--请选择--"){
						$($(".competition .bubble-box")[4]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(!unit){
						$($(".competition .bubble-box")[3]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(!checkObject.check({"ID":ID})){
						$($(".competition .bubble-box")[2]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
						$(".competition input[name='ID']")[0].focus();
					}
					if(!sex){
						$($(".competition .bubble-box")[1]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
					}
					if(!checkObject.check({"name":name})){

						$($(".competition .bubble-box")[0]).fadeTo(1000,1,function(){
							$(this).delay(5000).fadeTo(1000,0);
						});
						flag = false;
						$($(".competition input[name='name']")[0]).focus();
					}
					if(!flag)
						return;
					$.ajax({
						url:"http://www.guozewei.cn/form",
						type:"post",
						data:{
							type:1,
							name:name,
							sex:sex,
							ID:ID,
							unit:unit,
							area:area,
							degree:degree,
							mobilePhone:mobilePhone,
							phone:phone,
							workType:workType,
							certificate:certificate,
							seniority:seniority,
						},
						success:function(result){
							dealwithResult(result);
						},
					});

					break;
		}
	});
	$(".return").click(function(){
		Return();
	});
	$(".select").selection({showNum: 9});
 
    function dealwithResult(result){
    		//修改进度条样式
			$(".schedule .line").addClass("finish");
			$(".schedule .circle i").removeClass().addClass("finish iconfont").html("&#xe601;");

			$("section .train").removeClass("show").addClass("hide");
			$("section .competition").removeClass("show").addClass("hide");
			$("section .result").removeClass("hide").addClass("show");
			if(result.success){
				$(".fail").addClass("hide");
				if($(".success").hasClass("hide")){
					$(".success").removeClass("hide");
				}
				$(".success .iconfont").css("color","#31c27c");
			}else{
				$(".success").addClass("hide");
				if($(".fail").hasClass("hide")){
					$(".fail").removeClass("hide");
				}
				$(".fail .iconfont").css("color","red")
			}


			timer = setInterval(function(){
				$(".result .content .countDown .time").html($(".result .content .countDown .time")[0].innerHTML-1);
			},1000);
			setTimeout(Return,5000);
    }
    function Return(){
    	clearInterval(timer);
		$("section .train").removeClass("hide").addClass("show");
		$("section .result").removeClass("show").addClass("hide");

		$(".schedule .line").removeClass("finish");
		$($(".schedule .line")[0]).addClass("finish");

		$(".schedule .circle i").removeClass();
		$($(".schedule .circle i")[0]).addClass("finish iconfont").html("&#xe619;");
		$($(".schedule .circle i")[1]).addClass("iconfont").html("&#xe61a;");
		$(".result .content .countDown .time").html("5");

		$(".navigation .item").removeClass("active");
		$($(".navigation .item")[0]).addClass("active");

		//清空表格填写内容
		$("input[type='text']").val("");
		$(".sex .circle").addClass("hide");
		$("input:checkbox").prop("checked",false);
		$(".container .select .selection ").html("--请选择--");
    }
})