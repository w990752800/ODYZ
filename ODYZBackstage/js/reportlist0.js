/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadReportByPage(1);
});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#report .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadReportByPage(pageNum);
});

function loadReportByPage(pageNum){
    $.ajax({
        url:"data/loadreport0.php?pageNum="+pageNum,
        data: {mname: sessionStorage['loginName']},
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,d){
                html+=`
                <tr>
                  <td>${d.rid}</td>
                  <td class="tip" style="cursor: pointer;text-decoration: underline">${d.uname}</td>
                  <td class="tiped" style="cursor: pointer;text-decoration: underline">${d.tipName}</td>
                  <td>${d.pname}</td>
                  <td>${d.reason}</td>
                  <td>已处理</td>
                  <td>${d.cancel}</td>
                </tr>
                `;
            });
            $("#report table tbody").html(html);
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
            $('#report .pager').html(html);

            //举报人信息
            $('#report tbody').on('click','.tip',function(event){
                event.preventDefault();
                var kw =$(".tip").html();
                console.log("举报人信息");
                console.log(kw);
                sessionStorage['tipuser']=kw;
                location.href="tipuser.html?kw="+kw;
            });
            //被举报人发布商品信息
            $('#report tbody').on('click','.tiped',function(event){
                event.preventDefault();
                var kw =$(".tiped").html();
                console.log("举报人信息");
                console.log(kw);
                sessionStorage['tipeduser']=kw;
                location.href="tipeduserPro.html?kw="+kw;
            });
        }
    });
}

