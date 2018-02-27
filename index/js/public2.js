if(!sessionStorage['loginName']){
    location.href = 'firstPage.html';
}
var loginName = sessionStorage['loginName'];
$('#top_box span').html(loginName);
$('.pructNav').hover(function(){
    $(this).children('.pull-menu').fadeIn(300);
},function(){
    $(this).children('.pull-menu').fadeOut(300);
});


$('div#buy').on('click','.cart',function(){
    location.href='../detail/html/myShoppingCart.html?loginName='+loginName;
});
$('div#buy').on('click','.user',function(){
    location.href='../detail/html/userCenter.html?loginName='+loginName;
});
$('div#buy').on('click','.my-grade',function(){
    location.href='../detail/html/userCenter.html?loginName='+loginName;
});


$('div#main .myApp').on('click','.accountInfo a',function(){
    location.href='../detail/html/accountInfo.html?loginName='+loginName;
});
$('div#main .myApp').on('click','.stuCertification a',function(){
    location.href='../detail/html/stuCertification.html?loginName='+loginName;
});
$('div#main .myApp').on('click','.changePwd a',function(){
    location.href='../detail/html/changePwd.html?loginName='+loginName;
    $('#top_box span').html(sessionStorage['loginName']);
});


$('div#main .myApp').on('click','.payChart a',function(){
    location.href='../detail/html/payChart.html?loginName='+loginName;
    $('#top_box span').html(sessionStorage['loginName']);
});

$('div#main .myApp').on('click','.incomeChart a',function(){
    location.href='incomeChart.html?loginName='+loginName;
    $('#top-bar #welcome').html('���ã���ӭ'+sessionStorage['loginName']+'�����ҵ���վ');
});

$('div#main .myApp').on('click','.myShoppingCart a',function(){
    location.href='../detail/html/myShoppingCart.html?loginName='+loginName;
});

$('div#main .myApp').on('click','.myOrder a',function(){
    location.href='../detail/html/myOrder.html?loginName='+loginName;
});

$('div#main .myApp').on('click','.myCollection a',function(){
    location.href='../detail/html/myCollection.html?loginName='+loginName;
});

$('div#main .myApp').on('click','.shelfGoods a',function(){
    location.href='shelfGoods.html?loginName='+loginName;
});
$('div#main .myApp').on('click','.mypubMyorder a',function(){
    location.href='mypubMyorder.html?loginName='+loginName;
});

$('div#main .myApp').on('click','.myRelease a',function(){
    console.log(11);
    location.href='myPub.html?loginName='+loginName;
});

$('div#main .myApp').on('click','.myWantBuy a',function(){
    location.href='../detail/html/myWantBuy.html?loginName='+loginName;
});

$('div#main .myApp').on('click','.commodityRule a',function(){
    location.href='../detail/html/commodityRule.html?loginName='+loginName;
});

$('div#main .myApp').on('click','.IntegralRule a',function(){
    location.href='../detail/html/IntegralRule.html?loginName='+loginName;
});/**
 * Created by haedu on 2017/4/11.
 */

$('div#main_nav').on('click','.index',function(){
    console.log("lala");
    location.href='../index/firstPage.html?loginName='+loginName;
});

$('div#main_nav').on('click','.wantBuyArea',function(){
    console.log("lala");
    location.href='../index/wantBuyArea.html?loginName='+loginName;
});

$('div#main_nav').on('click','.wantBuy',function(){
    console.log("lala");
    location.href='../index/wantBuy.html?loginName='+loginName;
});
$('div#main_nav').on('click','.pubProduct',function(){
    console.log("lala");
    location.href='../index/pubProduct.html?loginName='+loginName;
});

$('div#main_nav').on('click','.newPub',function(){
    console.log("lala");
    location.href='../index/newPub.html?loginName='+loginName;
});

$('#myRelease').on('click','.changeDetail',function(){
    var productId=$(this).attr('product');
    location.href='../index/changePub.html?productId='+productId;

});