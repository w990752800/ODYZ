/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadStuvalidateByPage(1);
});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#stuvalidate .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadStuvalidateByPage(pageNum);
});

function loadStuvalidateByPage(pageNum){
    $.ajax({
        url:"data/loadstuvalidate1.php?pageNum="+pageNum,
        data: {mname: sessionStorage['loginName']},
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,d){
                html+=`
                <tr>
                  <td>${d.stuId}</td>
                  <td>${d.userId}</td>
                  <td>${d.stuName}</td>
                  <td>${d.stuSchool}</td>
                  <td>${d.stuCollege}</td>
                  <td>${d.stuNumber}</td>
                  <td>${d.stuImg}</td>
                  <td>未认证</td>
                  <td><a class="${d.userId}" id="verify" href="${d.stuNumber}">认证</a></td>
                </tr>
                `;
            });
            $("#stuvalidate table tbody").html(html);
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
            $('#stuvalidate .pager').html(html);

            //认证
            $('#stuvalidate tbody').on('click','#verify',function(event){
                event.preventDefault();
                var userId = $(this).attr('class');
                var stuNumber=$(this).attr('href');
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: 'data/Stuvalidate.php',
                    data: {mname: sessionStorage['loginName'],userId:userId,stuNumber:stuNumber},
                    success: function(txt){
                        $('#model-tips').css('display','block');
                        $('#model-tips p').html(txt);
                    }
                });
            });
        }
    });
}

