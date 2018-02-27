if(!sessionStorage['loginName']){
    location.href = '../../index/login.html'; //未登录的话跳转到登录页
}

/**功能点2：异步加载公用的页头和页尾**/
$('div#top_box').load('../data/header.php');
$('div#searchHot').load('../data/hotSearch.php');
$('div#main_nav').load('../data/mainNav.php');
$('#footer').load('../data/footer.php');

var loginName = sessionStorage['loginName'];
console.log(loginName);
$('#top_box span').html(loginName);

//悬浮显示菜单
$('.pructNav').hover(function(){
    $(this).children('.pull-menu').fadeIn(300);
},function(){
    $(this).children('.pull-menu').fadeOut(300);
});

/**功能点：点击“用户中心”跳转到购物车详情页，传递当前登录的用户名**/
$('div#searchHot').on('click','.user',function(){
    //JS跳转到购物车详情页
    location.href='../html/userCenter.html?loginName='+loginName;

});
/**功能点7：点击“我的积分”跳转到购物车详情页，传递当前登录的用户名**/
$('div#searchHot').on('click','.my-grade',function(){
    //JS跳转到购物车详情页
    location.href='../html/userCenter.html?loginName='+loginName;

});
$('div#searchHot').on('click','.cart',function(){
    //JS跳转到购物车详情页
    location.href='../html/myShoppingCart.html?loginName='+loginName;

});

console.log("lala");
$('div#top_box').on('click','.exit a',function(){
    console.log("lala");
    console.log("....");
    console.log(sessionStorage['loginName']);
    sessionStorage['loginName']="";
    location.href='../../index/login.html';
    console.log(sessionStorage['loginName']);
});



//主导航点击事件
//首页
$('div#main_nav').on('click','.index',function(){
    console.log("lala");
    location.href='../../index/firstPage.html?loginName='+loginName;
});
//发布商品
$('div#main_nav').on('click','.pubProduct',function(){
    console.log("lala");
    location.href='../../index/pubProduct.html?loginName='+loginName;
});
//求购专区
$('div#main_nav').on('click','.wantBuyArea',function(){
    console.log("lala");
    location.href='../../index/wantBuyArea.html?loginName='+loginName;
});
//求购专区
$('div#main_nav').on('click','.newPub',function(){
    console.log("lala");
    location.href='../../index/newPub.html';
});
//发布求购
$('div#main_nav').on('click','.wantBuy',function(){
    console.log("lala");
    location.href='../../index/wantBuy.html?loginName='+loginName;
});
//左侧点击事件
//账户信息
$('div#main .myApp').on('click','.accountInfo a',function(){
    location.href='../html/accountInfo.html?loginName='+loginName;
});
//学生认证
$('div#main .myApp').on('click','.stuCertification a',function(){
    location.href='../html/stuCertification.html?loginName='+loginName;
});
//修改密码
$('div#main .myApp').on('click','.changePwd a',function(){
    location.href='../html/changePwd.html?loginName='+loginName;
    $('#top_box span').html(sessionStorage['loginName']);
});
//消费统计
$('div#main .myApp').on('click','.payChart a',function(){
    location.href='../html/payChart.html?loginName='+loginName;
    $('#top_box span').html(sessionStorage['loginName']);
});
//收入统计
$('div#main .myApp').on('click','.incomeChart a',function(){
    location.href='../../index/incomeChart.html?loginName='+loginName;
    $('#top_box span').html(sessionStorage['loginName']);
});
//商品订单
$('div#main .myApp').on('click','.mypubMyorder a',function(){
    location.href='../../index/mypubMyorder.html?loginName='+loginName;
    $('#top_box span').html(sessionStorage['loginName']);
});
//我的购物车
$('div#main .myApp').on('click','.myShoppingCart a',function(){
    location.href='../html/myShoppingCart.html?loginName='+loginName;
});
//我的订单
$('div#main .myApp').on('click','.myOrder a',function(){
    location.href='../html/myOrder.html?loginName='+loginName;
});
//我的收藏
$('div#main .myApp').on('click','.myCollection a',function(){
    location.href='../html/myCollection.html?loginName='+loginName;
});
//下架商品
$('div#main .myApp').on('click','.shelfGoods a',function(){
    console.log(1);
    location.href='../../index/shelfGoods.html?loginName='+loginName;
});
//我的发布
$('div#main .myApp').on('click','.myRelease a',function(){
    console.log(11);
    location.href='../../index/myPub.html?loginName='+loginName;
});
//我的求购
$('div#main .myApp').on('click','.myWantBuy a',function(){
    console.log("我的求购");
    location.href='../html/myWantBuy.html?loginName='+loginName;
});
//商品规则
$('div#main .myApp').on('click','.commodityRule a',function(){
    location.href='../html/commodityRule.html?loginName='+loginName;
});
//积分规则
$('div#main .myApp').on('click','.IntegralRule a',function(){
    location.href='../html/IntegralRule.html?loginName='+loginName;
});


/**功能点：点击“我的积分”跳转到购物车详情页，传递当前登录的用户名**/
$('div#headMain_content').on('click','.cart',function(){
    //JS跳转到购物车详情页
    location.href='../html/myShoppingCart.html?loginName='+loginName;

});
/**功能点7：点击“用户中心”跳转到购物车详情页，传递当前登录的用户名**/
$('div#headMain_content').on('click','.user',function(){
    //JS跳转到购物车详情页
    location.href='../html/userCenter.html?loginName='+loginName;
});
/**功能点7：点击“我的积分”跳转到购物车详情页，传递当前登录的用户名**/
$('div#headMain_content').on('click','.my-grade',function(){
    //JS跳转到购物车详情页
    location.href='../html/userCenter.html?loginName='+loginName;
});