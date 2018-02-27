/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadIntegralByPage(1);
});

//添加规则
$('#integral .form1').on('click','#add-btn',function(event){
    event.preventDefault();
    var behavior=$(this).siblings('input[name="behavior"]').val();
    var step=$(this).siblings('input[name="step"]').val();
    console.log(behavior,step);
    //发起异步请求
    $.ajax({
        type: 'POST',
        url: 'data/addIntegral.php',
        data: {mname: sessionStorage['loginName'],behavior:behavior,step:step},
        success: function(txt){
            $('#model-tips').css('display','block');
            $('#model-tips p').html(txt);

        }
    });
});
/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#integral .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadIntegralByPage(pageNum);
});

function loadIntegralByPage(pageNum){
    $.ajax({
        url:"data/loadIntegral.php?pageNum="+pageNum,
        data: {mname: sessionStorage['loginName']},
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,d){
                html+=`
                <tr>
                  <td><input type="text" name="behavior" value="${d.behavior}"/></td>
                  <td><input type="text" name="step" value="${d.step}"/></td>
                  <td class="${d.inId}" id="change">修改规则 &nbsp;&nbsp;<a class="${d.inId}" id="del">删除规则</a></td>
                </tr>
                `;
            });
            $("#integral table tbody").html(html);
            //根据返回的响应数据动态创建分页条
            var html = '';
            //html += `<a href="${pager.pageNum-pager.pageNum+1}">首页</a> `;
            if(pager.pageNum-2>0){
                html += `<a href="${pager.pageNum-2}">${pager.pageNum-2}</a> `;
            }
            if(pager.pageNum-1>0){
                html += `<a href="${pager.pageNum-1}">${pager.pageNum-1}</a> `;
            }
            html += `<a href="#" class="curr">${pager.pageNum}</a> `;
            if(pager.pageNum+1<=pager.pageCount){
                html += `<a href="${pager.pageNum+1}">${pager.pageNum+1}</a> `;
            }
            if(pager.pageNum+2<=pager.pageCount){
                html += `<a href="${pager.pageNum+2}">${pager.pageNum+2}</a> `;
            }
            //html += `<a href="${pager.pageNum}">尾页</a> `;
            $('#integral .pager').html(html);


            //修改规则
            $('#integral tbody').on('click','#change',function(event){
                event.preventDefault();
                var inId = $(this).attr('class');
                var behavior=$(this).siblings('td').children('input[name="behavior"]').val();
                var step=$(this).siblings('td').children('input[name="step"]').val();
                console.log(behavior,step);
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: 'data/changeIntegral.php',
                    data: {mname: sessionStorage['loginName'],inId:inId,behavior:behavior,step:step},
                    success: function(txt){
                        $('#model-tips').css('display','block');
                        $('#model-tips p').html(txt);

                    }
                });
            });
            //删除规则
            $('#integral tbody').on('click','#del',function(event){
                event.preventDefault();
                var inId = $(this).attr('class');
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: 'data/deleteIntegral.php',
                    data: {mname: sessionStorage['loginName'],inId:inId},
                    success: function(txt){
                        $('#model-tips').css('display','block');
                        $('#model-tips p').html(txt);

                    }
                });
            });
        }
    });
}

