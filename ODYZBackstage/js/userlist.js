/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadUserByPage(1);
});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#user .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadUserByPage(pageNum);
});

function loadUserByPage(pageNum){
    $.ajax({
        url:"data/loaduser.php?pageNum="+pageNum,
        data: {mname: sessionStorage['loginName']},
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,d){
                html+=`
                <tr>
                  <td>${d.uid}</td>
                  <td>${d.uname}</td>
                  <td>${d.integral}</td>
                  <td>${d.memberLevel}</td>
                  <td>${d.otherCode}</td>
                </tr>
                `;
            });
            $("#user table tbody").html(html);
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
            $('#user .pager').html(html);


            //循环遍历状态
            var trList = $("#user tbody").children("tr")
            console.log(trList.length);
            for (var i=0;i<trList.length;i++) {
                var tdArr = trList.eq(i).find("td");
                if(tdArr.eq(3).html()==="2"){
                    tdArr.eq(3).html("正常");
                    console.log("正常");
                }else if(tdArr.eq(3).html()==="1"){
                    tdArr.eq(3).html("禁止发布");
                }
                else if(tdArr.eq(3).html()==="0"){
                    tdArr.eq(3).html("封号");
                }
            }
        }
    });
}

