/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadProductByPage(1);
});

//功能点五 用户点击分页条号时实现异步加载
$('#list-page').on('click','a',function(e){
    $(this).addClass('page-click').siblings('.page-click').removeClass('page-click');
    e.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadProductByPage(pageNum);
});

function loadProductByPage(pageNum){
    $.ajax({
        url:"data/newPub.php?pageNum="+pageNum,
        success:function(pager){
            console.log(pager.data);
            var html='';
            $.each(pager.data,function(i,auto){
                html+=`<li style="height:377px;">
							<img class="${auto.PID}" src="${auto.PIC1}" alt=""/>
                            <b>￥${auto.PRICE}</b>
							<span>${auto.PNAME}</span>
							<span class="belong-somebody" style="margin-bottom:0;">商品持有人：${auto.uname}</span>
                            <span style="font-size:12px;display: block; line-height: 30px;color:#666;margin-bottom:5px;">发布时间：${auto.PUBTIME}</span>
							<i class="connect"><a href="tencent://message/?uin=${auto.QQ}&Site=sc.chinaz.com&Menu=yes">联系卖家</a></i>

                              <a href="${auto.PID}"class="b_cart">加入购物车</a>
                        </li>`;
            });
            $("#product_show>ul").html(html);
            //根据返回的响应数据动态创建分页条
            var html = '';
            if(pager.pageNum-2>0){
                html += `<a  href="${pager.pageNum-1}">${pager.pageNum-2}</a>`;
            }
            if(pager.pageNum-1>0){
                html += `<a href="${pager.pageNum-1}">${pager.pageNum-1}</a> `;
            }

            html += `<a href="#">${pager.pageNum}</a> `;
            if(pager.pageNum+1<=pager.pageCount){
                html += `<a href="${pager.pageNum+1}">${pager.pageNum+1}</a> `;
            }
            if(pager.pagerNum+2<=pager.pageCount){
                html += `<a href="${pager.pageNum+2}">${pager.pageNum+2}</a> `;
            }

            $('#list-page').html(html);
        }
    });
}

