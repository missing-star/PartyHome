var page0 = page1 = page2 = page3 = 1;
var app = new Vue({
    el: '#app',
    data: {
        branch: 77,
        branchOrg: '',
        partyMemberList: [],
        branchActList: {
            list: [],
            isMore: true
        },
        orgChildList:{
            list:[],
            isShow:false
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
        readAllBranch: function () {
            getBrancActhData(++page3, app.branch, 36);
        },
        orgInfo: function (id) {
            window.location.href = 'branch-life-inner.html?id=' + id;
        },
        workDync: function (id) {
            window.location.href = 'branch-life-inner.html?id=' + id;
        },
        goInner: function (id) {
            //隐藏组织架构图，显示列表
            $('.org-child').toggleClass('active');
            //重置列表数据
            app.orgChildList.list = [];
            app.branch = id;
            app.branchOrg = id;
            //组织架构点击事件，到列表页
            app.orgObj.orgList = {};
            app.orgObj.isShow = false;
            getOrgData(1, id, '');
        },
        goWorkFromOrg:function(id) {
            //子列表点击事件，跳转到工作动态
            getOrgData(1,id,'',true);
        },
        goDetail: function (id, type) {
            window.location.href = 'branch-life-inner.html?id=' + id + '&type=' + type + '&branch=' + app.branch;
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
        app.branchActList = {
            list: [],
            isMore: true
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
                //显示组织架构图，隐藏列表,重置branch,branchOrg
                app.branch = 77;
                app.branchOrg = '';
                $('.org-child.chart').addClass('active');
                $('.org-child.list').removeClass('active');
                getOrgData(1, '', '');
                break;
            case "34":
                getWorkData(1, app.branch, 34);
                break;
            case "35":
                getDangData(1, app.branch, 35);
                break;
            case "36":
                getBrancActhData(1, app.branch, 36);
                break;
        }
    });

    /**
     * 获取数据
     */
    getOrgData(1, app.branchOrg, '');
    parseBack();
    /**
     * 初始化组织架构组件
     */
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
    goHome();
}

/**
 * 获取组织架构数据
 */
function getOrgData(page, branch, type,isToWork) {
    getData(rootUrl + 'index/branchLife', page, branch, type,isToWork);
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

function getData(url, page, branch, type,isToWork) {
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
                    if (data.data.total > 10) {
                        app.orgObj.isShow = true;
                    }
                    if (isToWork) {
                        // app.orgObj.isHideButton = true;
                        $("div.class-btn-group img").eq(1).click();
                        app.workObj.workList = [];
                        // getWorkData(1, branch, 34);
                    }
                    else {
                        //组织架构数据变更
                        if(data.data.list.length == 1 && !data.data.total) {
                            app.orgObj.orgList = transformOrgData(data.data.list)[0];
                            initOrgPlugin(app.orgObj.orgList);
                        }
                        else {
                            //组织子元素列表数据变更
                            app.orgChildList.list = app.orgChildList.list.concat(data.data.list);
                            if (data.data.total > 10 && app.orgChildList.list.length != data.data.total) {
                                app.orgChildList.isShow = true;
                            }
                            else {
                                app.orgChildList.isShow = false;
                            }
                        }
                    }
                    break;
                case 34:
                    //工作动态数据变更
                    app.workObj.workList = app.workObj.workList.concat(data.data.list);
                    if (data.data.total > 10 &&  app.workObj.workList.length != data.data.total) {
                        app.workObj.isShow = true;
                    }
                    else {
                        app.workObj.isShow = false;
                    }
                    break;
                case 35:
                    //党员风采数据变更
                    app.partyMemberList = data.data.list.slice(0, 5);
                    //加载轮播组件
                    setTimeout(function () {
                        initPlugin();
                    }, 0);
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
    window.event.returnValue = false;
    window.location.href = 'branch-life-inner.html?id=' + $(elem).attr("id") + '&type=35';
}


function initOrgPlugin(dataSource) {
    var datascource = dataSource;
    if($('#chart-container').find('.orgchart').length == 0) {
        $('#chart-container').orgchart({
            'data': datascource,
            toggleSiblingsResp: false,
            'depth': 2
        });
    }
}

/**
 * 组织架构数据转换
 */
function transformOrgData(originData) {
    return originData.map(function (value, index) {
        /**
         * 不能点击
         */
        return {
            name: '<a href="javascript:;" onclick="goInner(' + value.id + ')">' + value.names + '</a>',
            children: transformOrgData(value.childlist)
        }
    });
}

function goInner(id) {
    app.goInner(id);
}

//返回页处理
function parseBack() {
    var str = location.search;
    var params = str.substring(1).split('&');
    params = params.map(function(value,index) {
        return value.substring(value.indexOf('=') + 1);
    });
    switch (parseInt(params[0])) {
        case 34:
            //工作动态
            if(params[1]) {
                app.branch = app.branchOrg = params[1];
                app.goWorkFromOrg(params[1]);
            }
            break;
        case 35:
            //党员风采
            $("div.class-btn-group img").eq(2).click();
            break;
        case 36:
            //支部活动
            $("div.class-btn-group img").eq(3).click();
            break;
    }
}