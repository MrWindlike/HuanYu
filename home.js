require('./style/home.scss');
(function(){
	var index = document.querySelector('.center').getAttribute('data-index');
	console.log(index);
	document.querySelectorAll('.nav')[index].className += ' active';

	var i = 0, imgs = document.querySelectorAll('.img');
	setTimeout(function(){
		imgs[i].className = 'img up';
		i = (i + 1)%imgs.length;
		imgs[i].className = 'img middle';
	}, 1);
	setInterval(function(){
		imgs[i].className = 'img up';
		i = (i + 1)%imgs.length;
		imgs[i].className = 'img middle';
	}, 4000);

	imgs.forEach(function(img){
		img.addEventListener('transitionend', function(){
			imgs[i].className = 'img';
		});
	});
})();