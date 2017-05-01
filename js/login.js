(function($){
	var login = function(element, options){
          this.element = element;
          this.userOptions = options;
          this.defaultOptions = login.default;
          this.options = $.extend({}, this.defaultOptions, this.userOptions);
          this._init();
          this._eventInit();
	};

	login.default = {
		
	};


	login.prototype = {
		_init : function(){
			
		},
		_eventInit : function(){
			var _this = this;
			var click = $(this.element).find("#click")[0];
			var inputs = $(_this.element).find('.input');
			inputs.on('blur', function(){
				if($(this).val()!==''){
					$(this).removeClass('input-danger');
					$($(this).siblings('.alert')[0]).css('opacity', '0');
				}	
			});

			this.element.find('#button').on("click", function(event){
				var flag = true;
				for(var i = 0;i < inputs.length;i++){
					if($(inputs[i]).val()===''){
						$(inputs[i]).addClass('input-danger');
						$($(inputs[i]).siblings('.alert')[0]).css('opacity', '1').html('请填写信息！');
						flag = false;
					}
				}

				if(!flag)
					return ;

				$.ajax({
					url : "http://www.guozewei.cn/login",
					type: "POST",
					dataType : "JSON",
					data:{
						username : $(inputs[0]).val(),
						password : $(inputs[1]).val()
					},
					success : function(data){
						if(data.success){
							Cookies.set("username", $(inputs[0]).val(), new Date().setDate(new Date().getDate() + 30));
							Cookies.set("password", $(inputs[1]).val(), new Date().setDate(new Date().getDate() + 30));
							if(click.beginElement){
								click.beginElement();
								setTimeout(function(){
									if(/loggin\.html/.test(location.href))
										location.assign('index.html');
									else
										location.reload();
								},2000);
							}
							else{
								if(/loggin\.html/.test(location.href))
									location.assign('index.html');
								else
									location.reload();
							}
							
						}
						else{
							if(data.message==='用户名不存在'){
								$(inputs[0]).addClass('input-danger');
								$($(inputs[0]).siblings('.alert')[0]).css('opacity', '1').html(data.message);
							}
							else{
								$(inputs[1]).addClass('input-danger');
								$($(inputs[1]).siblings('.alert')[0]).css('opacity', '1').html(data.message);
							}
						}
							
							
					}
					
				});

				
			});
		}
	};

	$.fn.login = function(options){
		return this.each(function(){
			if(!$(this).data("login"))
				$(this).data("login", new login($(this), options));
		});
	};
})(jQuery);
     