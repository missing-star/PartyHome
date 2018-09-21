var page = 1;
var app = new Vue({
	el: '#app',
	data: {
        orgList:{
        	list:[],
			isMore:true
		},
		sectionList:{
        	list:[],
			isShow:false
		}
	},
	methods: {
        readAllOrg:function () {
			getData(rootUrl+'index/groups',++page,62);
        },
        readAllSection:function (isFirst) {
			
        }
	}
});


function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
	window.history.back(-1);
}

function getData(url,page,branch) {
	$.ajax({
		url:url,
		type:'post',
		data:{
			branch:branch,
			p:page
		},
		success:function (data) {
			app.orgList.list = app.orgList.list.concat(data.data.list);
			if(data.data.total > 10 && app.orgList.list.length != data.data.total) {
				app.orgList.isMore = true;
			}
			else {
                app.orgList.isMore = false;
			}
        },
		error:function () {

        }
	});
}

$(function () {
	getData(rootUrl+'index/groups',page,62);
})