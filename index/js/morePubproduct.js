/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadProductByPage(1);
});

//功能点五 用户点击分页条号时实现异步加载
$('#list-page').on('click','a',function(e){
    e.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadProductByPage(pageNum);
});

function loadProductByPage(pageNum){
    $.ajax({
        url:"data/loadproduct2.php",
        data:{uname: sessionStorage['loginName'],pageNum:pageNum},
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,auto){
                console.log(auto.PONE);
                if(auto.PONE=='电子产品'){
                    html+=`<li>
							<img class="${auto.PID}" src="${auto.PIC1}" alt=""/>
                            <b>￥${auto.PRICE}</b>
							<span>${auto.PNAME}</span>
							<span class="belong-somebody">商品持有人：${auto.uname}</span>

							<i class="connect"><a href="tencent://message/?uin=${auto.QQ}&Site=Sambow&Menu=yes">联系卖家</a></i>

                              <a href="${auto.PID}"class="b_cart">加入购物车</a>
                        </li>`;
                    $("#product_show #ele").html(html);
                }
                // if(auto.PONE=='电子产品'){
                //     html+=`<li>
					// 		<img class="${auto.PID}" src="${auto.PIC1}" alt=""/>
                //             <b>￥${auto.PRICE}</b>
					// 		<span>${auto.PNAME}</span>
					// 		<span class="belong-somebody">商品持有人：${auto.uname}</span>
                //
					// 		<i class="connect"><a href="tencent://message/?uin=${auto.QQ}&Site=Sambow&Menu=yes">联系卖家</a></i>
                //
                //               <a href="${auto.PID}"class="b_cart">加入购物车</a>
                //         </li>`;
                //     $("#product_show #ele").html(html);
                // }
            });

            //根据返回的响应数据动态创建分页条
            var html = '';
            if(pager.pageNum-2>0){
                html += `<a  href="${pager.pageNum-2}">${pager.pageNum-2}</a>`;
            }
            if(pager.pageNum-1>0){
                html += `<a href="${pager.pageNum-1}">${pager.pageNum-1}</a> `;
            }

            html += `<a href="#" class="page-click">${pager.pageNum}</a> `;
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

