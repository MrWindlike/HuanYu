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
			var url = "http://www.guozewei.cn/test";
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
				$.ajax({
					url : url,
					type: "POST",
					dataType : "JSON",
					data:{
						key : $(_this).attr('data-type'),
						val : $(_this).val()
					},
					success : function(data){
						
					}
				});
			});

			$password.on('blur', function(){
				if($($password[0]).val()!=='' && $($password[1]).val()!==''
					&& $($password[0]).val()!==$($password[1]).val()){
					$($($password[1]).siblings('.alert')[0]).css('opacity','1').html('两次输入的密码不一致！');
					$($password[1]).addClass('input-danger');
				}
				else{
					$($($password[1]).siblings('.alert')[0]).css('opacity','0');
					$($password[1]).removeClass('input-danger');
				}	

			});

			this.element.find('button').on('click', function(){
				var flag = true;
				/*for(i in inputs){
					if($(inputs[i]).val()===''){
						$(inputs[i]).addClass('input-danger');
						$($(inputs[i]).siblings('.alert')[0]).css('opacity','1').html('该项不能为空！');
						flag = false;
					}
					else{
						$(inputs[i]).removeClass('input-danger');
						$($(inputs[i]).siblings('.alert')[0]).css('opacity','0');
					}
				}*/
				if(!flag)
					return ;
				$.ajax({
					url : "http://www.guozewei.cn/resister",
					type: "POST",
					dataType : "JSON",
					data:{
						usename : $(inputs[0]).val(),
						password : $(inputs[1]).val(),
						email : $(inputs[3]).val(),
						phonenum : $(inputs[4]).val()
						
					},
					success : function(data){

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
     