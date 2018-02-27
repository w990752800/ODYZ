/**功能点0：检验当前是否已经登录**/
if(!sessionStorage['loginName']){
    location.href = '../../index/firstPage.html'; //未登录的话跳转到登录页
}
//“确认购买”按钮是后来动态添加的，必需使用事件代理
$('#myShoppingCart .myShoppingCart tbody').on('click','a:first-child',function(event){
    event.preventDefault();
    var pid = $(this).attr('class');
    var price= $(this).attr("href");
    console.log(price);
    console.log("haha");
    //发起异步请求
    $.ajax({
        type: 'POST',
        url: '../data/7_order_add.php',
        data: {uname:loginName,pid:pid,price:price},
        success: function(txt, msg, xhr){
            if(txt.msg=='订单生成!'){
                alert('订单生成!');
                $.ajax({
                    type: 'POST',
                    url: '../data/4_cart_detail_delete.php',
                    data: {uname:loginName,pid:pid},
                    success: function(obj){
                        console.log("从购物车删除成功");
                        location.reload();
                    }
                });

            } else if(txt.msg=='该订单已存在!'){
                alert('该订单已存在!');
            }
        }
    });
});

//“删除”按钮是后来动态添加的，必需使用事件代理
$('#myShoppingCart .myShoppingCart tbody').on('click','a:last-child',function(event){
    event.preventDefault();
    var pid = $(this).attr('class');
    //发起异步请求
    $.ajax({
        type: 'POST',
        url: '../data/4_cart_detail_delete.php',
        data: {uname:loginName,pid:pid},
        success: function(obj){
            alert("从购物车中删除成功");
            location.reload();
        }
    });
});
