var page0 = page1 = page2 = 1;
var app = new Vue({
	el: '#app',
	data: {
		//通知 22
		noticeObj:{
            noticeList:[

            ],
			isShow:false
		},
		//公告 23
		annouceObj:{
            announcementList:[

            ],
			isShow:false
		},
		//公示 24
		publicityObj:{
            publicityList:[

            ],
			isShow:false
		}
	},
	methods: {
		readAllNotice: function (isFirst) {
            if(isFirst) {
                $('.notice .article-content').css({
                    'overflow-y': 'scroll'
                });
                $('.notice .bottom-read-btn .read-all-link').hide();
                $('.notice .article-content').css({
                    'height': '100%'
                });
            }
            else {
                //请求下一页数据
				getNotice(++page0);
			}
		},
		readAllAnnouncement: function (isFirst) {
			if(isFirst) {
                $('.announcement .article-content').css({
                    'overflow-y': 'scroll'
                });
                $('.announcement .bottom-read-btn .read-all-link').hide();
                $('.announcement .article-content').css({
                    'height': '100%'
                });
			}
			else {
                //请求下一页数据
				getAnn(++page1);
			}
		},
		readAllPublicity: function (isFirst) {
			if(isFirst) {
                $('.publicity .article-content').css({
                    'overflow-y': 'scroll'
                });
                $('.publicity .bottom-read-btn .read-all-link').hide();
                $('.publicity .article-content').css({
                    'height': '100%'
                });
			}
			else {
				//请求下一页数据
				getPub(++page2);
			}
		},
		//跳转链接
        goDetail:function (id,type) {
			window.location.href = 'branch-life-inner.html?id=' + id + '&type=' + type;
        }
	}
});

$(function () {
    /**
	 * 底部图片按钮点击事件
     */
	$("div.class-btn-group img").click(function () {
		var img = $(this);
		if (!$(this).hasClass('scale-img')) {
			var index = $.inArray(img[0], $('div.class-btn-group img'));
			$(this).addClass('scale-img');
			$(this).siblings().removeClass('scale-img');
			$("div.container").find("div.main-content").removeClass('active');
			$("div.container").find("div.main-content").eq(index).addClass('active');
		}
	});
    /**
	 * 进入页面加载数据
     */
    getNotice(1);
    getAnn(1);
    getPub(1);
});


function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
	window.history.back(-1);
}
//获取通知数据
function getNotice(page) {
	getData(rootUrl+'index/index',22,page);
}
//获取公告数据
function getAnn(page) {
    getData(rootUrl+'index/index',23,page);
}
//获取公示数据
function getPub(page) {
    getData(rootUrl+'index/index',24,page);
}

//获取数据通用函数
function getData(url,type,page) {
    $.ajax({
        url:url,
        data:{
			pid:type,
			p:page
        },
        type:'post',
        dataType:'json',
        success:function(data) {
			switch (type) {
				case 22:
					//通知数据变更
                    app.noticeObj.noticeList = app.noticeObj.noticeList.concat(data.data.list);
                    if(data.data.total > 10) {
                    	app.noticeObj.isShow = true;
					}
					break;
				case 23:
					//公告数据变更
                    app.annouceObj.announcementList = app.annouceObj.announcementList.concat(data.data.list);
                    if(data.data.total > 10) {
                        app.annouceObj.isShow = true;
                    }
					break;
				case 24:
					//公示数据变更
                    app.publicityObj.publicityList = app.publicityObj.publicityList.concat(data.data.list);
                    if(data.data.total > 10) {
                        app.publicityObj.isShow = true;
                    }
					break;
            }
        },
        error:function() {

        }
    });
}
