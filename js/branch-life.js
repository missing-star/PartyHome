var page0 = page1 = page2 = page3 = 1;
var app = new Vue({
    el: '#app',
    data: {
        branch: '',
        branchOrg:61,
        partyMemberList: [],
        branchActList: {
            list: [],
            isMore: true
        },
        orgObj: {
            orgList: [],
            isShow: false,
            isHideButton: false
        },
        workObj: {
            workList: [],
            isShow: false
        }
    },
    methods: {
        readAllOrg: function (isFirst) {
            if (isFirst) {
                $('.org .article-content').css({
                    'overflow-y': 'scroll'
                });
                $('.org .bottom-read-btn .read-all-link').hide();
                $('.org .article-content').css({
                    'height': '100%'
                });
            }
            else {
                //请求下一页数据
                getOrgData(++page0, app.branchOrg, '');
            }
        },
        readAllWork: function (isFirst) {
            if (isFirst) {
                $('.work .article-content').css({
                    'overflow-y': 'scroll'
                });
                $('.work .bottom-read-btn .read-all-link').hide();
                $('.work .article-content').css({
                    'height': '100%'
                });
            }
            else {
                //请求下一页数据
                getWorkData(++page1, app.branch, 34);
            }
        },
        readAllBranch:function() {
            getBrancActhData(++page3, app.branch, 36);
        },
        orgInfo: function (id) {
            window.location.href = 'branch-life-inner.html?id=' + id;
        },
        workDync: function (id) {
            window.location.href = 'branch-life-inner.html?id=' + id;
        },
        goInner: function (id) {
            app.branch = id;
            //组织架构点击事件
            app.orgObj.orgList = [];
            app.orgObj.isShow = false;
            getOrgData(1, id, '');
        },
        goDetail:function (id,type) {
            window.location.href = 'branch-life-inner.html?id=' + id + '&type=' + type;
        }
    }
});

$(function () {
    $("div.class-btn-group img").click(function (ev) {
        //重置页码和数据
        page0 = page1 = page2 = page3 = 1;
        app.orgObj.orgList = [];
        app.orgObj.isShow = false;
        app.workObj = {
            workList: [],
            isShow: false
        };
        var img = $(this);
        if (!img.hasClass('scale-img')) {
            var index = $.inArray(img[0], $('div.class-btn-group img'));
            $(this).addClass('scale-img');
            $(this).siblings().removeClass('scale-img');
            $("div.container").find("div.main-content").removeClass('active');
            $("div.container").find("div.main-content").eq(index).addClass('active');
        }
        //发送请求
        switch ($(ev.target).attr("data-id")) {
            case "":
                getOrgData(1, 0, '');
                break;
            case "34":
                getWorkData(1, app.branch, 34);
                break;
            case "35":
                getWorkData(1, app.branch, 35);
                break;
            case "36":
                getWorkData(1, app.branch, 36);
                break;
        }
    });

    /**
     * 获取数据
     */
    getOrgData(1, app.branchOrg, '');
});

/**
 * 初始化轮播组件
 */
function initPlugin() {
    Carousel.init($("#carousel-image"));
    //触摸事件
    var x_orgin = 0;
    var x_now = 0;
    var isTouch = false;
    document.querySelector('#carousel-image').addEventListener('touchstart', function (ev) {
        x_origin = ev.touches[0].clientX;
        $(this).bind('touchmove', function (ev) {
            isTouch = true;
            x_now = ev.originalEvent.touches[0].clientX;
        });
    });
    document.querySelector('#carousel-image').addEventListener('touchend', function () {
        if (isTouch) {
            if (x_now - x_origin < 0) {
                $('#carousel-image').find('.poster-next-btn').click();
            } else {
                $('#carousel-image').find('.poster-prev-btn').click();
            }
        }
        isTouch = false;
    });
}
function goHome() {
    window.location.href = 'index.html';
}

function goBack() {
    window.history.back(-1);
}

/**
 * 获取组织架构数据
 */
function getOrgData(page, branch, type) {
    getData(rootUrl + 'index/branchLife', page, branch, type);
}

/**
 * 获取工作动态数据
 */
function getWorkData(page, branch, type) {
    getData(rootUrl + 'index/branchLife', page, branch, type);
}

/**
 * 获取党员风采数据
 */
function getDangData(page, branch, type) {
    getData(rootUrl + 'index/branchLife', page, branch, type);
}

/**
 * 获取支部活动数据
 */
function getBrancActhData(page, branch, type) {
    getData(rootUrl + 'index/branchLife', page, branch, type);
}

function getData(url, page, branch, type) {
    $.ajax({
        url: url,
        data: {
            p: page,
            branch: branch,
            type: type
        },
        type: 'post',
        dataType: 'json',
        success: function (data) {
            switch (type) {
                case '':
                    //组织架构数据变更
                    app.orgObj.orgList = app.orgObj.orgList.concat(data.data.list);
                    if (data.data.total > 10) {
                        app.orgObj.isShow = true;
                    }
                    if (data.data.names) {
                        app.orgObj.isHideButton = true;
                        getWorkData(1, branch, 34);
                    }
                    break;
                case 34:
                    //工作动态数据变更
                    app.workObj.workList = app.workObj.workList.concat(data.data.list);
                    if (data.data.total > 10) {
                        app.workObj.isShow = true;
                    }
                    break;
                case 35:
                    //党员风采数据变更
                    app.partyMemberList = data.data.list.slice(0,5);
                    console.log(app.partyMemberList);
                    //加载轮播组件
                    setTimeout(function() {
                        initPlugin();
                    },0);
                    break;
                case 36:
                    //支部活动数据变更
                    app.branchActList.list = app.branchActList.list.concat(data.data.list);
                    if (data.data.total > 10 && app.branchActList.list.length != data.data.total) {
                        app.branchActList.isMore = true;
                    }
                    else {
                        app.branchActList.isMore = false;
                    }
                    break;
            }
        },
        error: function () {

        }
    })
}

function goDetail(elem) {
    window.event.returnValue=false;
    window.location.href = 'branch-life-inner.html?id=' + $(elem).attr("id") + '&type=35';
}