//当前页码
var pageInner = pageOuter = 1;
var app = new Vue({
	el: '#app',
	data: {
		outerId:0,
		list:{
			list:[],
			isShow:false
		},
		hot:[]
	},
	methods: {
		specialName:function(id) {
			window.location.href = 'branch-life-inner.html?id=' + id;
		},
		specialFocus:function(id) {
			window.location.href = 'branch-life-inner.html?id=' + id;
		},
		moreFocus:function() {
			$('.right-part .right-top-part:nth-child(1)').removeClass('active');
			$('.right-part .right-top-part:nth-child(2)').addClass('active');
		},
        readMore:function (isFirst,isOut,event) {
            if(isFirst) {
            	$(event.target).hide();
                $('.left-part').css({
                    'overflow-y': 'scroll'
                });
                $('.left-part').css({
                    'height': '100%'
                });
            }
            else {
                //请求下一页数据
				if(isOut) {
					//外页
                    getData(++pageOuter);
				}
				else {
					//内页
                    getInnerData(app.outerId,++pageInner,true);
				}
            }
        },
        //跳转链接
        goDetail:function (id,type) {
		    window.open('special-column-article.html?specialId=' + id + '&type=' + type);
        }
	}
});


$(function () {
	
});

function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
    window.close();
}

/**
 * 专题专栏--获取数据
 */
function getData(page) {
    $.ajax({
        url:rootUrl+'index/special',
        type:'post',
        dataType:'json',
        data:{
            p:page
        },
        success:function(data) {
            app.list.list = app.list.list.concat(data.data.list);
            if(parseInt(data.data.total) > 10 && app.list.list.length != data.data.total) {
                app.list.isShow = true;
            }
            else {
                app.list.isShow = false;
            }
            app.hot = data.data.hot;
        },
        error:function () {

        }
    })
}

function getInnerData(id,page,isMore) {
    $.ajax({
        url:rootUrl+'index/index',
        type:'post',
        dataType:'json',
        data:{
            pid:id,
            p:page
        },
        success:function(data) {
        	if(isMore) {
                app.list.list = app.list.list.concat(data.data.list);
			}
			else {
                app.list.list = data.data.list;
			}
            if(parseInt(data.data.total) > 10 && app.list.list.length != data.data.total) {
                app.list.isShow = true;
            }
            else {
                app.list.isShow = false;
            }
        },
        error:function () {

        }
    });
}

getData(pageOuter);