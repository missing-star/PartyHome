var app = new Vue({
	el: '#app',
	data: {
		
	},
	methods: {
		readAllArticle:function(id) {
			$('.article-content').css({
				'overflow-y': 'scroll'
			});
			$('.read-all-link').hide();
			$('.article-content').css({
				'height': '100%'
			});
		},
		orgInfo:function(id) {
			window.location.href = 'branch-life-inner.html?id=' + id;
		},
	}
});

function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
	window.history.back(-1);
}
