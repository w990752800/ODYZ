/**
 * Created by Administrator on 2017/3/23.
 */
var loginName = sessionStorage['loginName'];
console.log(loginName);
//$('#top_box span').html(loginName);
$('#product_show').on('click','img',function(event){
    event.preventDefault();
    var pid = $(this).attr('class');
    sessionStorage['pid']=pid;
    //发起异步请求
    console.log(pid);
    location.href='../detail/html/detail.html?pid='+pid;
});
/**功能点：用户点击“添加到购物车”则实现商品的购物车添加**/
//“添加到购物车”按钮是后来动态添加的，必需使用事件代理
$('#product_show').on('click','.b_cart',function(event){
    event.preventDefault();
    var pid = $(this).attr('href');
    //发起异步请求
    if(!loginName==''){
        $.ajax({
            type: 'POST',
            url: '../detail/data/3_cart_add.php',
            data: {uname:loginName,pid:pid},
            success: function(txt, msg, xhr){
                if(txt.msg=='该商品已添加购物车!'){
                    alert('该商品已添加购物车!');

                } else if(txt.msg=='添加购物车成功!'){
                    alert('添加购物车成功!');
                }
            }
        });
    }else{
        $('#model-tips4').css('display','block');
    }
});


/**功能点7：点击“查看购物车”跳转到购物车详情页，传递当前登录的用户名**/
$('div#headMain_content').on('click','.cart',function(){
    if(!sessionStorage['loginName']==''){
        location.href='../detail/html/myShoppingCart.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
        // location.href='../detail/html/myShoppingCart.html?loginName='+loginName;
});
/**功能点7：点击“用户中心”跳转到购物车详情页，传递当前登录的用户名**/
$('div#headMain_content').on('click','.user',function(){
    //JS跳转到购物车详情页
    if(!sessionStorage['loginName']==''){
        location.href='../detail/html/userCenter.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
    // location.href='../detail/html/userCenter.html?loginName='+loginName;

});
/**功能点7：点击“我的积分”跳转到购物车详情页，传递当前登录的用户名**/
$('div#headMain_content').on('click','.my-grade',function(){
    //JS跳转到购物车详情页
    if(!sessionStorage['loginName']==''){
        location.href='../detail/html/userCenter.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
    // location.href='../detail/html/userCenter.html?loginName='+loginName;
});

// $('div#headMain_content').on('click','.newPub',function(){
//     location.href='../index/newPub.html?loginName='+loginName;
// });

//首页
$('div#main_nav').on('click','.index',function(){
    console.log("lala");
    location.href='../index/firstPage.html?loginName='+loginName;
});

$('div#nav .lf').on('click','.newPub',function(){
    if(!sessionStorage['loginName']==''){
        location.href='../index/newPub.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
});
// 发布商品
$('div#nav .lf').on('click','.pubProduct',function(){
    //JS跳转到购物车详情页
    if(!sessionStorage['loginName']==''){
        location.href='../index/pubProduct.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
});
// //发布商品
// $('div#main_nav').on('click','.pubProduct',function(){
//     location.href='../index/pubProduct.html?loginName='+loginName;
// });
//最新发布
// $('div#nav .lf').on('click','.newPub',function(){
//     location.href='../index/newPub.html?loginName='+loginName;
// });
//求购专区
$('div#main_nav').on('click','.wantBuyArea',function(){
    if(!sessionStorage['loginName']==''){
        location.href='../index/wantBuyArea.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
});
//发布求购
$('div#main_nav').on('click','.wantBuy',function(){
    if(!sessionStorage['loginName']==''){
        location.href='../index/wantBuy.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
});
$('#model-tips4 .sure-btn').click(function(){
    $(this).parents('#model-tip4').css('display','none');
});

