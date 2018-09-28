var app = new Vue({
	el: '#app',
	data: {
		type:'',
		branch:'',
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
	var urlBack = $('.bread-crumb a').eq(1).attr('href');
	if(urlBack) {
        urlBack += '?type=' + app.type;
        if(app.branch != '') {
        	urlBack += '&branch=' + app.branch;
		}
		//返回指定页打开指定标签
		window.location.href = urlBack;
	}
	else {
		//返回上一页
        window.history.back(-1);
	}
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
			if(data.data.attachfile) {
				data.data.content = '<video controls="controls" src="'+data.data.attachfile+'"></video>' + data.data.content;
			}
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
	app.type = params[1];
	if(params[2]) {
		app.branch = params[2];
	}
    getArticleContent(params[0]);
});

function parseTitle(type) {
	if(isNaN(type)) {
		switch (type) {
			case 'list':
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="special-column.html">专题专栏</a> &gt; 专题专栏名称';
				break;
			case 'hot':
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="special-column.html">专题专栏</a> &gt; 专题聚焦';
				break;
            case 'group':
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="group-org.html">群团组织</a>';
                break;
        }
	}
	else {
        switch (parseInt(type)) {
            case 22:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="newest-dyn.html">最新动态</a> &gt; 通知';
                break;
            case 23:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="newest-dyn.html">最新动态</a> &gt; 公告';
                break;
            case 24:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="newest-dyn.html">最新动态</a> &gt; 公示';
                break;
            case 25:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="outside-the-box.html">他山之石</a>';
                break;
            case 28:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="affairs-to-guide.html">党务指南</a> &gt; 党内政策';
                break;
            case 29:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="affairs-to-guide.html">党务指南</a> &gt; 法规';
                break;
            case 30:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="affairs-to-guide.html">党务指南</a> &gt; 制度';
                break;
            case 34:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="branch-life.html">支部生活</a> &gt; 工作动态';
                break;
            case 35:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="branch-life.html">支部生活</a> &gt; 党员风采';
                break;
            case 36:
                app.titleHeader = '<a href="index.html">首页</a> &gt; <a href="branch-life.html">支部生活</a> &gt; 支部活动';
                break;
            case 38:
                app.titleHeader = '<a href="index.html">首页</a> &gt; 探讨交流';
                break;
            case 59:
                app.titleHeader = '<a href="index.html">首页</a> &gt; 学习体会';
                break;
        }
	}
}
