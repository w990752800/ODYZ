/**
 * Created by haedu on 2017/4/21.
 */
/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadProductByPage(1);
});

//功能点五 用户点击分页条号时实现异步加载
$('.pager').on('click','a',function(e){
    e.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadProductByPage(pageNum);
    $(this).addClass('page-click').siblings('.page-click').removeClass('page-click');
});
function loadProductByPage(pageNum){
    $.ajax({
        url:"data/lookTradeRecord.php",
        data:{uname: sessionStorage['loginName'],pageNum:pageNum},
        success:function(pager){
            $('#top-bar #welcome').html('您好！欢迎'+sessionStorage['loginName']+'来到我的驿站');
            $('#myOrder h2 ul li.curr a').html('交易记录('+pager.recordCount+')');
            var html='';
            $.each(pager.data,function(i,auto){
                if(auto.status==3){
                    html+=` <tr>
                        <td>
				          <p class="pic">
                           <img src="${auto.pic1}" alt=""/>
                          </p>
                          <div>
                            <p>商品名：${auto.spname}</p>
                            <p class="owner">商品购买人：${auto.sbname}</p>
                          </div>
                        </td>
                        <td class="price">订单编号:${auto.soid}</td>
                        <td style="text-align:center">¥${auto.sprice}</td>
                        <td style="padding-left:10px; line-height: 25px;">
                          订单已完成 <br/>
                           完成时间：${auto.sdate}
                        </td>
                        </tr>`;
                }else if(auto.status==-1){
                    html+=` <tr>
                        <td>
				          <p class="pic">
                           <img src="${auto.pic1}" alt=""/>
                          </p>
                          <div>
                            <p>商品名：${auto.spname}</p>
                            <p class="owner">商品购买人：${auto.sbname}</p>
                          </div>
                        </td>
                        <td class="price">订单编号:${auto.soid}</td>
                        <td style="text-align:center">¥${auto.sprice}</td>
                        <td style="padding-left:10px; line-height: 25px;">
                          <font color="red">订单已拒绝</font> <br/>
                           拒单时间：${auto.sdate}
                        </td>
                        </tr>`;
                }

            });
            $("#wddd table tbody").html(html);

            var html = '';
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
            $('#wddd .pager').html(html);

        }
    });
}

