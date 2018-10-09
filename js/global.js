const rootUrl = "http://49.4.70.109/partyHome/php/PartyHome/public/api/";
/**
 * 处理从组织架构图点击跳转的参数
 */
function transformParams() {
    var params = location.search.substring(1).split('&');
    var param = {};
    params.forEach(function(value,index,array) {
        var temp = value.split('=');
        param[temp[0]] = temp[1];
    });
    return param;
}