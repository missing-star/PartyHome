//当前页码
var pageInner = pageOuter = 1;
var app = new Vue({
    el: '#app',
    data: {
        outerId: 0,
        list: {
            list: [],
            isShow: false
        },
        hot: []
    },
    methods: {
        specialName: function (id) {
            window.location.href = 'branch-life-inner.html?id=' + id;
        },
        specialFocus: function (id) {
            window.location.href = 'branch-life-inner.html?id=' + id;
        },
        moreFocus: function () {
            $('.right-part .right-top-part:nth-child(1)').removeClass('active');
            $('.right-part .right-top-part:nth-child(2)').addClass('active');
        },
        readAllSection: function (isFirst) {
            if (isFirst) {
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
                getInnerData(app.outerId, ++pageInner, true);
            }
        },
        goDetail: function (id, isToInner,type) {
            app.outerId = id;
            if (isToInner) {
                //跳转页面
                window.open('branch-life-inner.html?id=' + id + '&type=' + transformParams().type);
            }
            else {
                //请求数据
                getInnerData(id, 1, false);
            }
        }
    }
});


$(function () {
    parseSpecial();
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
        url: rootUrl + 'index/special',
        type: 'post',
        dataType: 'json',
        data: {
            p: page
        },
        success: function (data) {
            app.list.list = app.list.list.concat(data.data.list);
            if (parseInt(data.data.total) > 10 && app.list.list.length != data.data.total) {
                app.list.isShow = true;
            }
            else {
                app.list.isShow = false;
            }
            app.hot = data.data.hot;
        },
        error: function () {

        }
    })
}

function getInnerData(id, page, isMore) {
    $.ajax({
        url: rootUrl + 'index/index',
        type: 'post',
        dataType: 'json',
        data: {
            pid: id,
            p: page
        },
        success: function (data) {
            if (isMore) {
                app.list.list = app.list.list.concat(data.data.list);
            }
            else {
                app.list.list = data.data.list;
            }
            if (parseInt(data.data.total) > 10 && app.list.list.length != data.data.total) {
                app.list.isShow = true;
            }
            else {
                app.list.isShow = false;
            }
        },
        error: function () {

        }
    });
}

function parseSpecial() {
    var params = transformParams();
    app.goDetail(params.specialId, false, params.type);
}