
$(function() {
    $.ajax({
        url: '../data/1_accountInfo.php',
        data: {uname: sessionStorage['loginName']},
        success: function (list) {
            $('#top_box span').html(sessionStorage['loginName']);
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            var html = '';
            $.each(list,function (i, d) {
                html += `
                    <div class="changeHeadImg">
                      <p class="headImg">
                        <img src="../${d.headImg}" alt="头像"/>
                      </p>
                      <p id="upImg">
                            <span>修改头像</span>
                            <input type="file" class="upheadImg" id="upheadImg"/>
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


            $('#upheadImg').on('change',function(){
                console.log(11);
                var fd = new FormData();
                fd.append("upload", 0);
                fd.append("upheadImg", $(".upheadImg").get(0).files[0]);
                $.ajax({
                    url: "../data/upheadImg.php?uname="+sessionStorage['loginName'],
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: fd,
                    success: function(d) {
                        location.reload();
                    }
                });
            });
        }
    });



    //数量
    $.ajax({
        url: '../data/total.php',
        data: {uname: sessionStorage['loginName']},
        success: function (output) {
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            var html = '';
                html += `
                    <tr>
                        <td><i>${output.publish}</i>件</td>
                        <td><i>${output.wantBuy}</i>件</td>
                        <td><i>${output.beingTraded}</i>件</td>
                        <td><i>${output.traded}</i>件</td>
                        <td><i>${output.comment}</i>条</td>
                    </tr>
        `;
            $('#userCenter .myPro tbody').html(html);


        }
    });

});

