if(!sessionStorage['loginName']){
    location.href = 'firstPage.html'; //未登录的话跳转到登录页
}
//悬浮显示菜单
$('.pructNav').hover(function(){
    $(this).children('.pull-menu').fadeIn(300);
},function(){
    $(this).children('.pull-menu').fadeOut(300);
});
$("[name='uname']").attr("value",sessionStorage['loginName']);
//发布求购
//$('#uname').blur(function(){
//    var unameValid = $(this).val();
//    var reg = /^[A-Za-z0-9]{6,9}$/;
//    if(reg.test(unameValid)){
//        $(this).siblings('span').addClass('msg-succ').removeClass('msg-error').html('√');
//    }else{
//        $(this).siblings('span').removeClass('msg-succ').addClass('msg-error').html('6-9位字母、数字或“_”组合');
//    }
//});
$('#wantBuy-btn').click(function(){
    var inputData = $('#form-wantBuy').serialize();
    $.ajax({
        type: 'POST',
        url: 'data/wantBuy.php',
        data: inputData,
        success: function(txt){
            console.log("发布求购成功");
            $('#model-tips').css('display','block');
            console.log("发布求购成功");
            $('#model-tips p').html(txt);
        }
    });
});
$('#model-tips .sure-btn').click(function(){
    $(this).parents('#model-tips').css('display','none');
});