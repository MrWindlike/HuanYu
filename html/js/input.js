
(function($){
	var input = function(element, options){
          this.element = element;
          this.userOptions = options;
          this.defaultOptions = input.default;
          this.options = $.extend({}, this.defaultOptions, this.userOptions);
          this._initEvent();
	};

	input.default = {
		top : "-1.8em",
		left : "1em"
	};

	input.prototype = {

		_initEvent : function(){
			var _this = this;
			$(_this.element).find(".input").on('focus', function(){
				$($(this).siblings()[0]).css("top", _this.options.top);
				$($(this).siblings()[0]).css("left", _this.options.left);
				$($(this).siblings()[0]).css("transform", "scale(0.9)");
			}).on('blur', function(){
				if($(this).val()==="")
					$($(this).siblings()[0]).attr("style", "");
				
			});
		}
	};

	$.fn.input = function(options){
		return this.each(function(){
			if(!$(this).data(".input"))
				$(this).data(".input", new input($(this), options));
		});
	};
})(jQuery);
