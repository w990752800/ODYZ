$(function(){
    $("[name='uname']").attr("value",sessionStorage['loginName']);
    $('#top_box span').html(sessionStorage['loginName']);
});

//修改密码
$("#changePwdBtn").click(function(){
    var changePwdData = $('#changePwdForm').serialize();
    console.log(changePwdData);
    $.ajax({
        type: 'post',
        url: '../data/2_changePwd.php',
        data:changePwdData,
        success: function(txt, msg, xhr){
            console.log(loginName+"111");
            if(txt=='ok'){  //登录成功
                $('#top_box span').html(sessionStorage['loginName']);
                alert("密码修改成功");
                location.reload();
            }else { //登录失败
                alert("密码修改失败");
            }
        }
    });
});