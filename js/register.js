(function($){
	var register = function(element, options){
          this.element = element;
          this.userOptions = options;
          this.defaultOptions = register.default;
          this.options = $.extend({}, this.defaultOptions, this.userOptions);
          this._init();
          this._eventInit();

	};

	register.default = {
		
	};


	register.prototype = {
		_init : function(){
			
		},
		_eventInit : function(){
			var $password = this.element.find('[data-type|="password"]');
			var inputs = this.element.find('.input');
			var url = URL+"/test";
			var _this = this;
			this.element.find('[data-type!="password"]').on('blur', function(){
				var _this = this;
				if($(this).attr('data-type')==='username'&&$(this).val()!==''){
					var match = /^[A-Za-z][A-Za-z1-9_-]+$/;
					if(!match.test($(this).val())){
						$(this).addClass('input-danger');
						$($(this).siblings('.alert')[0]).css('opacity','1').html('用户名（字母开头 + 数字/字母/下划线）');
						return ;
					}
					else{
						$(this).removeClass('input-danger');
						$($(this).siblings('.alert')[0]).css('opacity','0');
					}
				}
				else if($(this).attr('data-type')==='phonenum'&&$(this).val()!==''){
					var match = /^1[34578]\d{9}$/;
					if(!match.test($(this).val())){
						$(this).addClass('input-danger');
						$($(this).siblings('.alert')[0]).css('opacity','1').html('手机号码格式不正确');
						return ;
					}
					else{
						$(this).removeClass('input-danger');
						$($(this).siblings('.alert')[0]).css('opacity','0');
					}
				}
				else if($(this).attr('data-type')==='email'&&$(this).val()!==''){
					var match = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
					if(!match.test($(this).val())){
						$(this).addClass('input-danger');
						$($(this).siblings('.alert')[0]).css('opacity','1').html('邮箱格式不正确');
						return ;
					}
					else{
						$(this).removeClass('input-danger');
						$($(this).siblings('.alert')[0]).css('opacity','0');
					}
				}
				else if($(this).val()===''){
					$(this).removeClass('input-danger');
					$($(this).siblings('.alert')[0]).css('opacity','0');
					return ;
				}
				$.ajax({
					url : url,
					type: "POST",
					dataType : "JSON",
					data:{
						key : $(_this).attr('data-type'),
						val : $(_this).val()
					},
					success : function(data){
						console.log(data.success);
						if(!data.success){
							$(_this).addClass("input-danger");
							$($(_this).siblings('.alert')[0]).css('opacity','1').html('已被占用！');
						}
						else{
							$(_this).removeClass('input-danger');
							$($(_this).siblings('.alert')[0]).css('opacity','0');
							Cookies.unset("username");
							Cookies.unset("password");
							Cookies.set("username", $(inputs[0]).val(), new Date().setDate(new Date().getDate() + 30));
							Cookies.set("password", $(inputs[1]).val(), new Date().setDate(new Date().getDate() + 30));
						}

					}
						
				});
			});

			$password.on('blur', function(){
				if($(this).val()!==''){
					
					if($(this).val().length<6){
						$($(this).siblings('.alert')[0]).css('opacity','1').html('密码最少六位！');
						$(this).addClass('input-danger');
					}
					else{
						$($(this).siblings('.alert')[0]).css('opacity','0');
						$(this).removeClass('input-danger');
					}

					if($($password[0]).val()!==$($password[1]).val()){
						$($($password[1]).siblings('.alert')[0]).css('opacity','1').html('两次输入的密码不一致！');
						$($password[1]).addClass('input-danger');
					}
					else{
						$($($password[1]).siblings('.alert')[0]).css('opacity','0');
						$($password[1]).removeClass('input-danger');
					}
				}
				else{
					$($(this).siblings('.alert')[0]).css('opacity','0');
					$(this).removeClass('input-danger');
				}	

			});

			this.element.find('#registerbutton').on('click', function(){
				var flag = true;
				for(var i = 0;i < inputs.length;i++){
					if($(inputs[i]).val()===''){
						$(inputs[i]).addClass('input-danger');
						$($(inputs[i]).siblings('.alert')[0]).css('opacity','1').html('该项不能为空！');
						flag = false;
					}
					else{
						_this.element.find('[data-type!="password"]').trigger('blur');
						$(inputs).trigger('blur');
						$password.trigger('blur');
					}
				}
				_this.element.find('[data-type]').toArray().forEach(function(value){
					if($(value).hasClass('input-danger'))
						flag = false;
				});

				if(!flag)
					return ;
				$.ajax({
					url : URL+"/resister",
					type: "POST",
					dataType : "JSON",
					data:{
						username : $(inputs[0]).val(),
						password : $(inputs[1]).val(),
						email : $(inputs[3]).val(),
						phonenum : $(inputs[4]).val()
						
					},
					success : function(data){
						if(data.success){
							if(_this.element.find('#registerclick')[0].beginElement){
								_this.element.find('#registerclick')[0].beginElement();
								setTimeout(function(){
									location.assign('index.html');
								},2000);
							}
							else
								location.assign('index.html');
						}
						
					}
				});
			});
				

		}
	};

	$.fn.register = function(options){
		return this.each(function(){
			if(!$(this).data("register"))
				$(this).data("register", new register($(this), options));
		});
	};
})(jQuery);
     