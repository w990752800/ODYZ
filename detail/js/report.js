if(!sessionStorage['loginName']){
    location.href = 'firstPage.html'; //未登录的话跳转到登录页
}
//悬浮显示菜单
$('.pructNav').hover(function(){
    $(this).children('.pull-menu').fadeIn(300);
},function(){
    $(this).children('.pull-menu').fadeOut(300);
});

$.ajax({
    url: '../detail/data/product_detail.php',
    data: {pid:sessionStorage['pid']},
    success: function (list) {
        //$('#top_box span').html(sessionStorage['loginName']);
        //遍历读取到分页器对象，拼接HTML，追加到DOM树
        var html = '';
        $.each(list,function (i, d) {
            html += `

                    <form id="form-report">
             <div class="form-group1">
                 <label for="pname"><i></i>商品名称：</label>
                 <input type="text"  name="pname" id="pname" value="${d.PNAME}" readonly style="border: none;"/>
                 <span class=""></span>
             </div>
             <div class="form-group1">
                 <label for="tipName"><i></i>商品持有人：</label>
                 <input type="text"  name="tipName" id="tipName" value="${d.UNAME}" readonly style="border: none;"/>
                 <span class=""></span>
             </div>
             <div class="form-group1">
                 <label for="reason"><i></i>举报理由：</label>
                 <textarea name="reason" id="reason" cols="46" rows="10"></textarea>
                 <span class="">100字内</span>
             </div>
             <div class="form-group1">
                 <label for="uname"><i></i>举报人：</label>
                 <input required type="text" placeholder="" name="uname" id="uname" readonly style="border: none;"/>
             </div>
             <div class="form-group1">
                 <input type="button" value="举报" id="report-btn"/>
             </div>
         </form>

        `;
        });
        $('.content-box1 .zm-container').html(html);
        $("[name='uname']").attr("value",sessionStorage['loginName']);
        //修改账户信息
        $("#report-btn").click(function(){
            var reportData = $('#form-report').serialize();
            console.log(reportData);
            $.ajax({
                type: 'post',
                url: '../detail/data/report.php',
                data:reportData,
                success: function(txt, msg, xhr){
                    console.log(sessionStorage['loginName']);
                    if(txt=='ok'){  //登录成功
                        alert("举报成功！");
                        location.reload();
                    }else { //登录失败
                        alert("举报失败！");
                    }
                }
            });
        });
    }
});

