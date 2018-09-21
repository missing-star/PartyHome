var app = new Vue({
	el: '#app',
	data: {
		images: [],
		btImages: [
			{
				image:'img/index/1.png',
				link:'newest-dyn.html'
			},
			{
				image:'img/index/2.png',
				link:'affairs-to-guide.html'
			},
			{
				image:'img/index/3.png',
				link:'group-org.html'
			},
			{
				image:'img/index/4.png',
				link:'special-column.html'
			},
			{
				image:'img/index/5.png',
				link:'outside-the-box.html'
			},
			{
				image:'img/index/6.png',
				link:'discussion-and-exchange.html'
			},
			{
				image:'img/index/7.png',
				link:'branch-life.html'
			},
            {
                image:'img/index/8.png',
                link:'patrol-of-window.html'
            }

		]
	},
	methods: {
        goDetail:function (url) {
			window.location.href = url;
        }
	}
});

$(function () {
	getImageData(rootUrl + 'index/banner');
});

function getImageData(url) {
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		success:function (data) {
			app.images = data.data.list.slice(0,5);
			setTimeout(function () {
				//初始化轮播组件
                initPlugin();
            },0);
        },
		error:function () {
			
        }
	})
}

function initPlugin() {
    Carousel.init($("#carousel-image,#carousel-button"));
    $("#carousel-image,#carousel-button").init();
    var ids = ['#carousel-image', '#carousel-button'];
    for (var i = 0; i < 2; i++) {
        var x_orgin = 0;
        var x_now = 0;
        var isTouch = false;
        //触摸事件触发
        if (i == 0) {
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
        } else if (i == 1) {
            document.querySelector('#carousel-button').addEventListener('touchstart', function (ev) {
                x_origin = ev.touches[0].clientX;
                $(this).bind('touchmove', function (ev) {
                    isTouch = true;
                    x_now = ev.originalEvent.touches[0].clientX;
                });
            });
            document.querySelector('#carousel-button').addEventListener('touchend', function () {
                if (isTouch) {
                    if (x_now - x_origin < 0) {
                        $('#carousel-button').find('.poster-next-btn').click();
                    } else {
                        $('#carousel-button').find('.poster-prev-btn').click();
                    }
                }
                isTouch = false;
            });
        }
    }
}