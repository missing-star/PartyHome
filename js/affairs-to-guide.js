var page0 = page1 = page2 = 1;
var app = new Vue({
	el: '#app',
	data: {
		//党内政策 28
        noticeObj:{
            noticeList:[

            ],
            isShow:false
        },
        //法规 29
        annouceObj:{
            announcementList:[

            ],
            isShow:false
        },
        //制度 30
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
            window.open('branch-life-inner.html?id=' + id + '&type=' + type);
        }
	}
});

$(function () {
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
    parseBack();
});


function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
	window.close();
}


//获取党内政策数据
function getNotice(page) {
    getData(rootUrl+'index/index',28,page);
}
//获取法规数据
function getAnn(page) {
    getData(rootUrl+'index/index',29,page);
}
//获取制度数据
function getPub(page) {
    getData(rootUrl+'index/index',30,page);
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
                case 28:
                    //通知数据变更
                    app.noticeObj.noticeList = app.noticeObj.noticeList.concat(data.data.list);
                    if(data.data.total > 10 && app.noticeObj.noticeList.length != data.data.total) {
                        app.noticeObj.isShow = true;
                    }
                    else {
                        app.noticeObj.isShow = false;
                    }
                    break;
                case 29:
                    //公告数据变更
                    app.annouceObj.announcementList = app.annouceObj.announcementList.concat(data.data.list);
                    if(data.data.total > 10 && app.annouceObj.announcementList.length != data.data.total) {
                        app.annouceObj.isShow = true;
                    }
                    else {
                        app.annouceObj.isShow = false;
                    }
                    break;
                case 30:
                    //公示数据变更
                    app.publicityObj.publicityList = app.publicityObj.publicityList.concat(data.data.list);
                    if(data.data.total > 10 && app.publicityObj.publicityList.length != data.data.total) {
                        app.publicityObj.isShow = true;
                    }
                    else {
                        app.publicityObj.isShow = false;
                    }
                    break;
            }
        },
        error:function() {

        }
    })
}

//返回页处理
function parseBack() {
    var type = location.search.substr(1).split('=')[1];
    switch (parseInt(type)) {
        case 28:
            //党内政策
            $("div.class-btn-group img").eq(0).click();
            break;
        case 29:
            //法规
            $("div.class-btn-group img").eq(1).click();
            break;
        case 30:
            //制度
            $("div.class-btn-group img").eq(2).click();
            break;
    }
}