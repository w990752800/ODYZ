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

                     <form id="accountInfoForm">
                      <div class="userLeft">
                        <p>
                            <label>用户名：</label>
                             <input type="text" placeholder="${d.uname}" name="uname" value="${d.uname}" style="border: 0;"/>
                          </p>
                          <p>
                            <label>QQ号：</label>
                            <input id="QQ" type="text" name="QQ" value="${d.QQ}"/>
                          </p>
                          <p>
                            <label>密保问题：</label>
                            <input id="safe" type="text"  name="safe" value="${d.safe}"/>
                          </p>
                          <p>
                            <label>密保答案：</label>
                            <input id="answer" type="text"  name="answer" value="${d.answer}"/>
                          </p>
                         <input type="button" value="提交" id="accountInfoBtn"/>
                        </div>
                      <div class="userRight">
                          <p class="headImg">
                            <img src="../${d.headImg}" alt="头像"/>
                          </p>
                          <p id="upImg">
                            <span>修改头像</span>
                            <input type="file" class="upheadImg" id="upheadImg"/>
                          </p>
                      </div>
                     </form>

        `;
            });
            $('#accountInfo .baseInfo').html(html);
            if($('.verifyStatus').html()==="0"){
                $('.verifyStatus').html("验证通过");
            }else if($('.verifyStatus').html()==="1"){
                $('.verifyStatus').html("未验证");
            }else if($('.verifyStatus').html()==="2"){
                $('.verifyStatus').html("未通过验证");
            }

            //修改账户信息
            $("#accountInfoBtn").click(function(){
                var accountInfoData = $('#accountInfoForm').serialize();
                console.log(accountInfoData);
                $.ajax({
                    type: 'post',
                    url: '../data/2_accountInfo.php',
                    data:accountInfoData,
                    success: function(txt, msg, xhr){
                        console.log(loginName+"111");
                        if(txt=='ok'){  //登录成功
                            $('#top_box span').html(sessionStorage['loginName']);
                            alert("账户信息修改成功");
                            location.reload();
                        }else { //登录失败
                            alert("账户信息修改失败");
                        }
                    }
                });
            });

            //修改头像
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
});

