var page = 1;
var app = new Vue({
    el: '#app',
    data: {
        listData: {
            list: [],
            isShow: false
        }
    },
    methods: {
        readAllArticle: function (isFirst) {
            if (isFirst) {
                $('.article-content').css({
                    'overflow-y': 'scroll'
                });
                $('.bottom-read-btn .read-all-link').hide();
                $('.article-content').css({
                    'height': '100%'
                });
            }
            else {
                //请求下一页数据
                getData(rootUrl, ++page);
            }
        },
        orgInfo: function (id) {
            window.location.href = 'branch-life-inner.html?id=' + id;
        },
        goDetail: function (id, type) {
            window.location.href = 'branch-life-inner.html?id='+id + '&type=' + type;
        }
    }
});

function goHome() {
    window.location.href = 'index.html';
}

function goBack() {
    window.history.back(-1);
}

function getData(url, page) {
    $.ajax({
        url: url,
        data: {
            pid: 25,
            p: page
        },
        type: 'post',
        dataType: 'json',
        success: function (data) {
            app.listData.list = app.listData.list.concat(data.data.list);
            if (data.data.total > 10 && app.listData.list.length != data.data.total) {
                app.listData.isShow = true;
            }
            else {
                app.listData.isShow = false;
            }
        },
        error: function () {

        }
    })
}

$(function () {
    //首次加载数据
    getData(rootUrl, page);
});