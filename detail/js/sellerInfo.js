if(!sessionStorage['loginName']){
    location.href = 'firstPage.html'; //未登录的话跳转到登录页
}
//悬浮显示菜单
$('.pructNav').hover(function(){
    $(this).children('.pull-menu').fadeIn(300);
},function(){
    $(this).children('.pull-menu').fadeOut(300);
});

$(function() {
    $.ajax({
        url: '../data/sellerInfo.php',
        data: {pid:sessionStorage['pid']},
        success: function (list) {
            $('#top_box span').html(sessionStorage['loginName']);
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            var html = '';
            $.each(list,function (i, d) {
                html += `
                    <div class="changeHeadImg">
                      <p class="headImg">
                        <img src="../../detail/${d.headImg}" alt="头像"/>
                      </p>
                    </div>
                    <div class="userInfo">
                      <p>用户名称：<span>${d.uname}</span>,欢迎您！</p>
                      <p>当前积分：<span>${d.integral}</span></p>
                     <p>权限等级：<i class="rootLevel">${d.memberLevel}</i></p>
                     <p>用户QQ：<span class="qq">${d.QQ}</span></p>
                    </div>
        `;
            });
            $('#userCenter .baseInfo').html(html);
            if($('.rootLevel').html()==="2"){
                $('.rootLevel').html("正常");
            }else if($('.rootLevel').html()==="1"){
                $('.rootLevel').html("禁止发布");
            }else if($('.rootLevel').html()==="0"){
                $('.rootLevel').html("封号");
            }
            if($('.verifyStatus').html()==="0"){
                $('.verifyStatus').html("验证通过");
            }else if($('.verifyStatus').html()==="1"){
                $('.verifyStatus').html("未验证");
            }else if($('.verifyStatus').html()==="2"){
                $('.verifyStatus').html("未通过验证");
            }
        }
    });
    //数量
    $.ajax({
        url: '../data/totalSeller.php',
        data: {pid:sessionStorage['pid']},
        success: function (total) {
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            var html = '';
            html += `
                    <tr>
                        <td><i>${total.publish}</i>件</td>
                        <td><i>${total.trades}</i>件</td>
                        <td><i>${total.beingTraded}</i>件</td>
                        <td><i>${total.traded}</i>件</td>
                    </tr>
        `;
            $('#userCenter .myPro tbody').html(html);
        }
    });
});
