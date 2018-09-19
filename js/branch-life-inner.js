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
	var title = '';
	switch (parseInt(params[1])) {
		case 22:
			title = '首页 &gt; 最新动态 &gt; 通知';
			break;
        case 23:
            title = '首页 &gt; 最新动态 &gt; 公告';
            break;
        case 24:
            title = '首页 &gt; 最新动态 &gt; 公示';
            break;
	}
	app.titleHeader = title;
	console.log(app.titleHeader);
    getArticleContent(params[0]);
})