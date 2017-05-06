

(function($){

	var carousel = function(element, options){
	    this.element = element;
	    this.userOptions = options;
	    this.defaultOptions = carousel.default;
	    this.options = $.extend({}, this.defaultOptions, this.userOptions);
	    this.init();
	};

	carousel.default = {
		num : 0,
		now : 0,
		imgClass : 'img',
		path : "./resource/img/",
		fileType : ".jpg",
	};

	carousel.prototype = {
		init : function(){
			var index = '<div class="index"></div>';
			var indexWrap = $('<div class="indexWrap"></div>').appendTo(this.element);
			this.options.indexs = [];
			this.options.active = 0;
			for(var i = 0;i < this.options.num; i++){
				var img = '<img src=\"'+this.options.path+i+this.options.fileType+'\">';
				$(img).prependTo(this.element);
				this.options.indexs[i] = $(index).appendTo(indexWrap);
			}
			$(this.options.indexs[0]).addClass('activeIndex');
			var leftArrow = '<div class="left-arrow"></div>',
				rightArrow = '<div class="right-arrow"></div>';
			this.options.leftArrow = $(leftArrow).appendTo(this.element);
			this.options.rightArrow = $(rightArrow).appendTo(this.element);
			this.options.images = this.element.children(this.options.imgClass);

			this.eventInit();
			this.options.images.trigger('change');
		},
		eventInit : function(){
			var _this = this;
			var originX, startX, endX, moveX, translateX, startTime, endTime, allTime;
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('UC'); //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

			var timer = setInterval(function(){
				_this.options.rightArrow.trigger('touchend');
			}, 3000);

			$(window).on('resize', function(){
				if(document.documentElement.clientWidth > 1200){
					$(_this.options.images[_this.options.now]).attr('style', 'z-index:2');
				}
				else
					$(_this.options.images[_this.options.now]).attr('style', 'z-index:2;transform:translate(0,0)');
			});
			
			/*if(isAndroid || isiOS){
				this.options.leftArrow.css('display', 'none');
				this.options.rightArrow.css('display', 'none');

				_this.options.images.on('touchstart', function(event){
					clearInterval(timer);
					startX = originX = event.changedTouches[0].pageX;
					startTime = new Date().getTime();

				});

				_this.options.images.on('touchmove', function(event){
					if(document.documentElement.clientWidth < 1200){
						endX = event.changedTouches[0].pageX;
						translateX = parseInt($(this).css("transform").substring(7).split(',')[4]);
						moveX = translateX + (endX - startX);
						$(this).css("transition-duration", "0s")
						.css("transform", "translate3d(" + moveX + "px,0px,0)");
						$(_this.options.images[(_this.options.now + _this.options.num - 1) % _this.options.num]).css("transition-duration", "0s")
						.css("transform", "translate3d(calc(-100% + " + moveX + "px),0px,0)");
						$(_this.options.images[(_this.options.now + _this.options.num + 1) % _this.options.num]).css("transition-duration", "0s")
						.css("transform", "translate3d(calc(100% + " + moveX + "px),0px,0)");

						startX = endX;
					}
				});		
			}*/

			_this.element.on('mouseenter', function(){
				clearInterval(timer);
			});

			_this.element.on('mouseleave', function(){
				timer = setInterval(function(){
					_this.options.rightArrow.trigger('touchend');
				}, 3000);
			});

			_this.options.indexs.forEach(function(index){
				$(index).on('mouseenter', function(){
					_this.options.now = $(this).index();
					_this.options.images.trigger('change');
				});
			});

			_this.options.images.on('touchend click', function(event){
				
				if(event.type === "touchend"){
					$(this).unbind('click');
					timer = setInterval(function(){
						_this.options.rightArrow.trigger('touchend');
					}, 3000);
					if(document.documentElement.clientWidth < 1200){
						endTime = new Date().getTime();
						allTime = endTime - startTime;
						endX = event.changedTouches[0].pageX;
						var lastmove = endX - originX;

						if((Math.abs(lastmove) > 0 && allTime <= 300)
						 || Math.abs(lastmove / document.documentElement.clientWidth) >= 0.5){
							if(lastmove > 0){
								$(this).attr('style', '');
								_this.options.leftArrow.trigger('touchend');
							}
							else{
								$(this).attr('style', '');
								_this.options.rightArrow.trigger('touchend');
							}
							return ;
						}
						else{
							$(this).attr('style', '');
							_this.options.images.trigger('change');
							return ;
						}
					}
				}
				if(document.documentElement.clientWidth > 1200){
					_this.options.now = $(this).index();
					_this.options.images.trigger('change');
				}
				
			});

			_this.options.images.on('change', function(){
				var index = $(this).index() % _this.options.num;
				$('.activeIndex').removeClass('activeIndex');
				$(_this.options.indexs[_this.options.now]).addClass('activeIndex');
				$(this).attr('style', '');

				if($(this).index() === _this.options.now){
					$(this).attr('class', 'img middle');
					if(document.documentElement.clientWidth > 1200)
						$(this).attr('style', 'z-index:2');
					else
						$(this).attr('style', 'z-index:2;transform:translate3d(0,0,0)');
				}
				else if(index === (_this.options.now + _this.options.num - 1) % _this.options.num){
					$(this).attr('class', 'img left');
				}
				else if(index === (_this.options.now + _this.options.num + 1) % _this.options.num){
					$(this).attr('class', 'img right');
				}
				else if(index <= (_this.options.now + _this.options.num - 1) % _this.options.num)
					$(this).attr('class', 'img left-hidden');
				else if(index >= (_this.options.now + _this.options.num + 1) % _this.options.num)
					$(this).attr('class', 'img right-hidden');

			});

			_this.options.leftArrow.on('touchend click', function(event){
				if(_this.options.now > 0)
					_this.options.now--;
				else
					_this.options.now = _this.options.num - 1;

				_this.options.images.trigger('change');
			});

			_this.options.rightArrow.on('touchend click', function(event){

				if(_this.options.now < _this.options.num - 1)
					_this.options.now++;
				else
					_this.options.now = 0;
				_this.options.images.trigger('change');
			});
		}
	};

	$.fn.carousel = function(options){
		return this.each(function(){
			if(!$(this).data("carousel"))
				$(this).data("carousel", new carousel($(this), options));
		});
	};

})(jQuery);
     