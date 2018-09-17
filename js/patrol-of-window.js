var app = new Vue({
	el: '#app',
	data: {
		images: [
            'img/index/broadcast/1.jpg',
            'img/index/broadcast/2.jpg',
            'img/index/broadcast/3.jpg',
            'img/index/broadcast/4.jpg',
            'img/index/broadcast/5.jpg'
		]
	},
	methods: {
		
	}
});

$(function () {
	/**
	 * 初始化轮播组件
	 */
	Carousel.init($("#carousel-image"));
	$("#carousel-image").init();
	//触摸事件
	var x_orgin = 0;
	var x_now = 0;
	var isTouch = false;
	document.querySelector('#carousel-image').addEventListener('touchstart', function (ev) {
		x_origin = ev.touches[0].clientX;
		$(this).bind('touchmove', function (ev) {
			isTouch = true;
			x_now = ev.originalEvent.touches[0].clientX;
		});
	});
	document.querySelector('#carousel-image').addEventListener('touchend', function () {
		if (isTouch) {
			if (x_now - x_origin < 0) {
				$('#carousel-image').find('.poster-next-btn').click();
			} else {
				$('#carousel-image').find('.poster-prev-btn').click();
			}
		}
		isTouch = false;
	});
});


function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
	window.history.back(-1);
}
