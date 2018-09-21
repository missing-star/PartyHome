var app = new Vue({
	el: '#app',
	data: {
        articleContent:'',
		titleHeader:''
	},
	methods: {
		redAllArticle: function () {
			$('.article-content').css({
				'overflow-y': 'scroll'
			});
			$('.read-all-link').hide();
			$('.article-content').css({
				'height': '75%'
			});
		}

	}
});

function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
	window.history.back(-1);
}

function getArticleContent(id) {
	$.ajax({
		url:rootUrl+'index/detail',
		type:'post',
		data:{
			detailId:id
		},
		dataType:'json',
		success:function(data) {
			app.articleContent = data.data;
		},
		error:function () {

        }
	})
}

$(function () {
	var str = location.search;
	var params = str.substring(1).split('&');
	params = params.map(function(value,index) {
		return value.substring(value.indexOf('=') + 1);
	});
	parseTitle(params[1]);

    getArticleContent(params[0]);
});

function parseTitle(type) {
	if(isNaN(type)) {
		switch (type) {
			case 'list':
                app.titleHeader = '首页 &gt; 专题专栏 &gt; 专题专栏名称';
				break;
			case 'hot':
                app.titleHeader = '首页 &gt; 专题专栏 &gt; 专题聚焦';
				break;
        }
	}
	else {
        switch (parseInt(type)) {
            case 22:
                app.titleHeader = '首页 &gt; 最新动态 &gt; 通知';
                break;
            case 23:
                app.titleHeader = '首页 &gt; 最新动态 &gt; 公告';
                break;
            case 24:
                app.titleHeader = '首页 &gt; 最新动态 &gt; 公示';
                break;
            case 25:
                app.titleHeader = '首页 &gt; 他山之石';
                break;
            case 34:
                app.titleHeader = '首页 &gt; 支部生活 &gt; 工作动态';
                break;
            case 35:
                app.titleHeader = '首页 &gt; 支部生活 &gt; 党员风采';
                break;
            case 36:
                app.titleHeader = '首页 &gt; 支部生活 &gt; 支部活动';
                break;
            case 38:
                app.titleHeader = '首页 &gt; 探讨交流';
                break;
        }
	}
}
