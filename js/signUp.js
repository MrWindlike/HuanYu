(function($){
	var singUp = function(element,Check){
		this.element = element;
		this.checkObject = new Check();
		this.init();
	};

	singUp.prototype = {
		default:{
			flag:true,//表单提交时检查输入成功与否标志
			timer:"",
			timeoutTimer:"",
			//两个表单公共内容
			name:'',
			sex:'',
			mobilePhone:'',
			degree:'',			
			train:{
				qq:'',
				email:'',
				learningGoal:'',
				learningChannel:'',
				course:'',
			},
			competition:{
				ID:'',
				unit:'',
				area:'',
				phone:'',
				workType:'',
				certificate:'',
				seniority:'',
			},
		},
		init:function(){
			this.getUrlParameter();
			this.eventBindingOfClick();
			this.inputBlur();
			/*this.element.find(".select").selection({showNum: 9});*/
		},
		inputBlur:function(){
			var _this = this;
			this.element.find("input[type='text']").blur(function(){
				if($(this).attr('name') === "name" && $(this).val()){
					if(!_this.checkObject.check({"name":$(this).val()})){
						_this.showTip("name");
						/*$(this).focus();*/
					}

				}else if($(this).attr("name") === "mobilePhone"  && $(this).val()){
					if(!_this.checkObject.check({"mobilePhone":$(this).val()})){
						_this.showTip("mobilePhone");
						/*$(this).focus();*/
					}

				}else if($(this).attr("name") === "qq"  && $(this).val()){
					if(!_this.checkObject.check({'qq':$(this).val()})){
						_this.showTip("qq");
						/*$(this).focus();*/
					}

				}else if($(this).attr("name") === "email"  && $(this).val()){
					if(!_this.checkObject.check({'email':$(this).val()})){
						_this.showTip("email");
						/*$(this).focus();*/
					}

				}else if($(this).attr("name") === "ID"  && $(this).val()){
					if(!_this.checkObject.check({'ID':$(this).val()})){
						_this.showTip("ID");
						/*$(this).focus();*/
					}

				}else if($(this).attr("name") === "phone"  && $(this).val()){
					if(!_this.checkObject.check({'phone':$(this).val()})){
						_this.showTip("phone");
						/*$(this).focus();*/
					}

				}else if($(this).attr("name") === "unit"  && $(this).val()){
					if(!$(this).val()){
						_this.showTip("unit");
						/*$(this).focus();*/
					}

				}
			});
		},
		showTip:function(type){
			var type = ".bubble-box[data-type='"+type+"']";
			this.element.find(type).fadeTo(1000,1,function(){
				$(this).delay(5000).fadeTo(1000,0);
			});
		},
		getInfo:function(index,_this){
			var _default = _this.default;
			var Element = _this.element;
			_default.name = Element.find("input[name='name']")[index].value;
			var sex = Element.find("input:radio:checked");
			var circle = Element.find(".circle").hasClass("hide");
			_default.sex = sex.length===0 || circle ? "" : sex.val();
			_default.mobilePhone = Element.find("input[name='mobilePhone']")[index].value;
			_default.degree = Element.find(".selection[data-type='degree']")[index].value;

			switch(index){
				case 0 :
					_default.train.qq = Element.find("input[name='qq']").val();
					_default.train.email = Element.find("input[name='email']").val();
					_default.train.learningGoal = Element.find(".selection[data-type='learningGoal']").val();
					_learningChannel = Element.find("#learningChannel input:checkbox:checked");
					if(_learningChannel.length)
					{
						_learningChannel.each(function(index){
							_default.train.learningChannel += this.value;
							if(index!=Element.find("#learningChannel input:checkbox:checked").length-1){
								_default.train.learningChannel+=",";
							}
						});
					}else{
						_default.train.learningChannel="";
					}

					_course = Element.find("#course input:checkbox:checked");
					if(_course.length){
						_course.each(function(index){
							_default.train.course += this.value;
							if(index!=$("#course input:checkbox:checked").length-1){
								_default.train.course+=",";
							}
						});
					}else{
						_default.train.course = "";
					}							
					break;
				case 1:

					_default.competition.ID = Element.find("input[name='ID']").val();
					_default.competition.unit = Element.find(".competition input[name='unit']").val();
					_default.competition.area = Element.find(".selection[data-type='area']").val();
					_default.competition.phone = Element.find(".competition input[name='phone']").val();
					var workType = Element.find(".competition input:checkbox:checked");
					_default.competition.workType = workType.length === 0 ? "":workType.val();
					_default.competition.certificate = Element.find(".selection[data-type='certificate']").val();
					_default.competition.seniority = Element.find(".selection[data-type='seniority']").val();
					break;
			}
		},
		submitCheck:function(key,value,_this){
			switch(key){
				case 'name':
						if(!_this.checkObject.check({'name':value})){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'sex':
						if(value===""){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'mobilePhone':
						if(!_this.checkObject.check({'mobilePhone':value})){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'qq':
						if(!_this.checkObject.check({'qq':value})){
							_this.default.flag = false;
							_this.showTip(key);
						}						
						break;
				case 'email':
						if(!_this.checkObject.check({'email':value})){
							_this.default.flag = false;
							_this.showTip(key);
						}				
						break;
				case 'phone':
						if(!_this.checkObject.check({'phone':value})){
							_this.default.flag = false;
							_this.showTip(key);
						}				
						break;
				case 'ID':
						if(!_this.checkObject.check({'ID':value})){
							_this.default.flag = false;
							_this.showTip(key);
						}				
						break;	
				case 'unit':
						if(!value){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;			
				case 'learningChannel':
						if(value === ""){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'workType':
						if(value === ""){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'course':
						if(value === ""){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'learningGoal':
						if(value === "--请选择--"){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'degree':
						if(value === "--请选择--"){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'area':
						if(value === "--请选择--"){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'certificate':
						if(value === "--请选择--"){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
				case 'seniority':
						if(value === "--请选择--"){
							_this.default.flag = false;
							_this.showTip(key);
						}
						break;
			}
		},
		eventBindingOfClick:function(){
			var _this = this;

			//导航点击事件，切换报名表单和导航样式
			this.element.find(".navigation .item").click (function(){
				if(_this.element.find(".result").hasClass("show")){	//在报名成功页面显示的时候点击导航时执行
					Return(_this);
				}else{
					_this.clearInput(_this);
				}
				if(!$(this).hasClass("active")){
					_this.element.find(".navigation .item").toggleClass("active");
					_this.element.find("form").toggleClass("show").toggleClass("hide");
				}					
			});
			//性别切换动画
			this.element.find(".sex label").click(function(){
					var index = _this.element.find(".sex label").index(this);
					var circle = _this.element.find(".sex .circle")
					circle.removeClass("hide");
					switch(index){
						case 0:
								circle.css("left","68.2px");
								break;
						case 1:
								circle.css("left","124.1px");
								break;
						case 2:
								circle.css("left","68.2px");
								break
						case 3:
								circle.css("left","124.1px");
								break;
					}
			});

			this.element.find(".submit").click(function(){
				var index = _this.element.find(".submit").index(this);
				var _default =  _this.default;
				_this.getInfo(index,_this);
				switch(index){
					case 0:
							_this.submitCheck('name',_default.name,_this);
							_this.submitCheck('sex',_default.sex,_this);
							_this.submitCheck('mobilePhone',_default.mobilePhone,_this);
							_this.submitCheck('degree',_default.degree,_this);

							for( k in _default.train){
								_this.submitCheck(k,_default.train[k],_this);
							}
							
							if(!_this.default.flag)
								return;
							$.ajax({
								url:URL+"/form",
								type:'post',
								data:{
									type:0,
									name:_default.name,
									sex:_default.sex,
									degree:_default.degree,
									mobilePhone:_default.mobilePhone,
									qq:_default.train.qq,
									email:_default.train.email,
									learningGoal:_default.train.learningGoal,
									learningChannel:_default.train.learningChannel,
									course:_default.train.course,
								},
								success:function(result){
									_this.dealwithResult(result);
								}
							});
							break;
					case 1:
							_this.submitCheck('name',_default.name,_this)
							_this.submitCheck('sex',_default.sex,_this)
							_this.submitCheck('mobilePhone',_default.mobilePhone,_this)
							_this.submitCheck('degree',_default.degree,_this)
							for( k in _default.competition){
								_this.submitCheck(k,_default.competition[k],_this);
							}
							
							if(!_this.default.flag)
								return;
							$.ajax({
								url:URL+"/form",
								type:"post",
								data:{
									type:1,
									name:_default.name,
									sex:_default.sex,
									ID:_default.competition.ID,
									unit:_default.competition.unit,
									area:_default.competition.area,
									degree:_default.degree,
									mobilePhone:_default.mobilePhone,
									phone:_default.competition.phone,
									workType:_default.competition.workType,
									certificate:_default.competition.certificate,
									seniority:_default.competition.seniority,
								},
								success:function(result){
									_this.dealwithResult(result);
								},
							});
							break;
				}
			});
			//报名成功返回按钮
			this.element.find(".return").click(function(){
				_this.Return(_this);
			});
		},
		getUrlParameter:function(){
			var url = window.location.search;
			if(url){
				this.element.find(".navigation .item").toggleClass("active");
				this.element.find("form").toggleClass("show").toggleClass("hide");
			}
		},
		dealwithResult:function(result){
    		//修改进度条样式
    		var _element = this.element;
			

			_element.find("section .train").removeClass("show").addClass("hide");
			_element.find("section .competition").removeClass("show").addClass("hide");
			_element.find("section .result").removeClass("hide").addClass("show");
			if(result.success){
				_element.find(".fail").addClass("hide");
				_element.find(".success").removeClass("hide");
				_element.find(".schedule .line").addClass("finish");
				_element.find(".schedule .circle i").removeClass().addClass("finish iconfont").html("&#xe601;");
			}else{
				_element.find(".success").addClass("hide");
				_element.find(".fail").removeClass("hide");
			}
			this.timer = setInterval(function(){
				_element.find(".result .content .countDown .time").html(_element.find(".result .content .countDown .time")[0].innerHTML-1);
			},1000);
			var _this = this;
			this.timeoutTimer = setTimeout(function(){_this.Return(_this)},5000);
   		},
		Return:function(_this){
	    	clearInterval(_this.timer);
	    	clearTimeout(_this.timeoutTimer);
	    	var _element = _this.element;
	    	_element.find("section .result").removeClass("show").addClass("hide");
			_element.find("section .train").removeClass("hide").addClass("show");
			

			_element.find(".schedule .line:not(:eq(0))").removeClass("finish");
		//	$(_element.find(".schedule .line")[0]).addClass("finish");

			_element.find(".schedule .circle i").removeClass();
			$(_element.find(".schedule .circle i")[0]).addClass("finish iconfont").html("&#xe619;");
			$(_element.find(".schedule .circle i")[1]).addClass("iconfont").html("&#xe61a;");
			_element.find(".result .content .countDown .time").html("5");

			_element.find(".navigation .item").removeClass("active");
			$(_element.find(".navigation .item")[0]).addClass("active");

			_this.clearInput(_this);			
	    },
	    clearInput:function(_this){
	    	_this.element.find("input[type='text']").val("");
	    	_this.element.find(".selection").val("--请选择--");
			_this.element.find(".sex .circle").addClass("hide");
			_this.element.find("input:checkbox").prop("checked",false);
	    } 
	};

	$.fn.signup = function(Check){
		return this.each(function(){
			new singUp($(this),Check);
		})
	}
})(jQuery)