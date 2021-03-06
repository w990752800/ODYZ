/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadProductByPage(1);
});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#product .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadProductByPage(pageNum);
});

function loadProductByPage(pageNum){
    $.ajax({
        url:"data/loadproduct.php?pageNum="+pageNum,
        data: {mname: sessionStorage['loginName']},
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,d){
                html+=`
                <tr>
                  <td>${d.PID}</td>
                  <td>${d.UNAME}</td>
                  <td>${d.PNAME}</td>
                  <td>${d.PRICE}</td>
                  <td>${d.PIC1}</td>
                  <td>${d.STAUS}</td>
                  <td><button class="${d.PID}" id="del">删除</button></td>
                </tr>
                `;
            });
            // <td><img src="../index/${d.PIC1}" alt=""/></td>

            $("#product table tbody").html(html);
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
            $('#product .pager').html(html);

            //循环遍历状态
            var trList = $("#product tbody").children("tr")
            console.log(trList.length);
            for (var i=0;i<trList.length;i++) {
                var tdArr = trList.eq(i).find("td");
                if(tdArr.eq(5).html()==="1"){
                    tdArr.eq(5).html("正常");
                    console.log("正常");
                    //tdArr.eq(3).find('button').html("确认付款");
                }else if(tdArr.eq(5).html()==="0"){
                    tdArr.eq(5).html("已下架");
                    //tdArr.eq(3).find('button').html("交易完成");
                }
            }

            //删除商品
            $('#product tbody').on('click','#del',function(event){
                event.preventDefault();
                var pid = $(this).attr('class');
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: 'data/deleteProduct.php',
                    data: {mname: sessionStorage['loginName'],pid:pid},
                    success: function(txt){
                        $('#model-tips').css('display','block');
                        $('#model-tips p').html(txt);

                    }
                });
            });
        }
    });
}

