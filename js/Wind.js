(function($){
	var Wind = function(element, options){
          this.element = element;
          this.template = Wind.template;
          this.userOptions = options;
          this.defaultOptions = Wind.default;
          this.options = $.extend({}, this.defaultOptions, this.userOptions);
          this._init();
	};

	Wind.template = '<div>{{Hello}}{{World}} {{Hello}}{{World}}</div>';

	Wind.default = {
		Hello : 'Hello',
		World : 'World',
		nodes : {}
	};

	Wind.prototype = {
		_init : function(){
			this.element.html(this.template);
			this._dataInit();
		},
		_eventInit : function(){

		},
		_dataInit : function(){
			for(var index in this.defaultOptions){
				var nodes = this.element.find(":contains({{" + index + "}})");
				for(var node of nodes){
					var str = $(node).html().replace(new RegExp('{{2}' + index + '}{2}','g'),this.defaultOptions[index]);				
					this.defaultOptions.nodes['index'] = $(nodes);
					$(node).html(str);
				}
			}	

		},
		/*_watchData : function(index){
			var _this = this;
			console.log(_this.defaultOptions.nodes);
			Object.defineProperty(_this.defaultOptions, index, {
			  get: function() {
			    console.log('get：' + index);
			    return index;
			  },
			  set: function(value) {
			    _this.options.nodes.index.html(value);
			    console.log('set:' + value);
			  }
			});
		},*/
		_componentInit : function(){
			for(component in this.components){
				$(this.element.find($(component.id))[0]).Wind();
			}
		}
			
	};

	$.fn.Wind = function(options){
		return this.each(function(){
			if(!$(this).data("Wind"))
				$(this).data("Wind", new Wind($(this), options));
		});
	};
})(jQuery);
     