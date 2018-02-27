/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadIntegralByPage(1);
});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#IntegralRule .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadIntegralByPage(pageNum);
});

function loadIntegralByPage(pageNum){
    $.ajax({
        url:"../data/integral.php?pageNum="+pageNum,
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,d){
                html+=`
                <tr>
                  <td>${d.behavior}</td>
                  <td>${d.step}</td>
                </tr>
                `;
            });
            $("#IntegralRule table tbody").html(html);
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
            $('#IntegralRule .pager').html(html);


        }
    });
}

