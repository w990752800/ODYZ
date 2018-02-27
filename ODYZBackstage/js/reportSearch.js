console.log("searchBtn");
$("#report .form1").on('click','#search-btn',function(){
    console.log("searchBtn.........");
    var kw = $('#txtSearch').val();
    console.log(kw);
    searchLoad(1,kw);

    $('#report .pager').on('click','a',function(event){
        event.preventDefault(); //阻止跳转行为
        //获取要跳转的页号
        var pageNum = $(this).attr('href');
        searchLoad(pageNum,kw)
    });
});
//功能点五 用户点击分页条号时实现异步加载
/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/

function searchLoad(pageNum,kw){
    $.ajax({
        url:"data/reportSearch.php?pageNum="+pageNum+"&kw="+kw,
        data: {mname: sessionStorage['loginName']},
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,d){
                html+=`
                <tr>
                  <td>${d.rid}</td>
                  <td>${d.uname}</td>
                  <td>${d.tipName}</td>
                  <td>${d.pname}</td>
                  <td>${d.reason}</td>
                  <td>${d.tipStatus}</td>
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

            //循环遍历状态
            var trList = $("#report tbody").children("tr")
            console.log(trList.length);
            for (var i=0;i<trList.length;i++) {
                var tdArr = trList.eq(i).find("td");
                if(tdArr.eq(5).html()==="1"){
                    tdArr.eq(5).html("未处理");
                    console.log("未处理");
                }else if(tdArr.eq(5).html()==="0"){
                    tdArr.eq(5).html("已处理");
                }
            }
        }
    });
}

