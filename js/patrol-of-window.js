var app = new Vue({
	el: '#app',
	data: {
		images: []
	},
	methods: {
		goDetail:function (url) {
			window.location.href = url;
        }
	}
});

$(function () {
    getBannerData(rootUrl+'index/index');
});


function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
	goHome();
}

function getBannerData(url) {
    $.ajax({
        url:url,
        type:'post',
		data:{
        	pid:37,
			p:1
		},
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
}