webpackJsonp([1],{

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(5);
__webpack_require__(4);
__webpack_require__(3);
__webpack_require__(7);
__webpack_require__(2);

window.$ = window.jQuery = __webpack_require__(6);

$('#nav').stop().mouseleave(function () {
	$('.bg').stop().animate({ 'left': 0 }, 1000);
	$('.item ul').css({ "display": "none" });
});

/*loggin*/
__webpack_require__(0);

$("#bg").input();
$("#register").input({ left: "0em" });

$("#bg>*:not(svg)").on("click", function (event) {
	event.stopPropagation();
});

$("#bg, #bg .closeButton").on('click', function (event) {
	$("#bg").fadeOut(300);
	$("#bg input").val("");
	$("#bg .text").attr("style", "");
});

$("#nav .logButton").on('click', function () {
	$("#bg").fadeIn(300);
});

$('.item').mouseover(function () {
	var _this = $(this);
	$(this).find('ul').css({ "display": "block" });
	$('.bg').stop().animate({ 'left': _this.index() * 110 + 'px' }, 100);
	_this.find("ul").addClass('active').stop().animate({ "opacity": 1 }, 100);
	_this.siblings().find("ul").removeClass('active').stop().animate({ "opacity": 0 }, 100);
});

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[14]);