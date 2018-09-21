//当前页码
var page = 1;
var app = new Vue({
	el: '#app',
	data: {
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
        readMore:function (isFirst,event) {
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
                getData(++page);
            }
        },
        //跳转链接
        goDetail:function (id,type) {
            window.location.href = 'branch-life-inner.html?id=' + id + '&type='+ type;
        }
	}
});


$(function () {
	
});

function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
	window.history.back(-1);
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
			console.log(app.list.isShow);
        },
        error:function () {

        }
    })
}

getData(page);