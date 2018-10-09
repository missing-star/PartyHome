var page0 = page1 = 1;
var app = new Vue({
	el: '#app',
	data: {
        sectionBranch:0,
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
			getData(rootUrl+'index/groups',++page0,62);
        },
        goInner:function(id) {
			$('#group-image').removeClass('active');
			$('#group-list').addClass('active');
			//请求数据
			getSectionData(rootUrl+'index/groups',id,page1);
		},
        goDetail:function(id,type) {
            window.location.href = 'branch-life-inner.html?id=' + id + '&type=group&branch=' + app.sectionBranch;
		},
        readAllSection:function (isFirst) {
            if(isFirst) {
                $('#group-list .article-content').css({
                    'overflow-y': 'scroll'
                });
                $('#group-list .bottom-read-btn .read-all-link').hide();
                $('#group-list .article-content').css({
                    'height': '100%'
                });
            }
            else {
                //请求下一页数据
                getSectionData(rootUrl+'index/groups',app.sectionBranch,++page1);
            }
        }
	}
});


function goHome() {
	window.location.href = 'index.html';
}

function goBack() {
    window.close();
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

function getSectionData(url,branch,page) {
	app.sectionBranch = branch;
    $.ajax({
        url:url,
        type:'post',
        data:{
            branch:branch,
            p:page
        },
        success:function (data) {
            app.sectionList.list = app.sectionList.list.concat(data.data.list);
            if(data.data.total > 10 && app.sectionList.list.length != data.data.total) {
                app.sectionList.isShow = true;
            }
            else {
                app.sectionList.isShow = false;
            }
        },
        error:function () {

        }
    });
}

$(function () {
	getData(rootUrl+'index/groups',page0,62);
	parseBack();
});


//返回页处理
function parseBack() {
    var str = location.search;
    var params = str.substring(1).split('&');
    params = params.map(function(value,index) {
        return value.substring(value.indexOf('=') + 1);
    });
    if(params[1]) {
        app.goInner(params[1]);
    }
}