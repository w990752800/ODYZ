/**
 * Created by haedu on 2017/5/19.
 */

$(function () {
    var classKey=sessionStorage['classDispaly'];
    classLoad(1,classKey);
    $('#searchPage #list-page').on('click','a',function(e){
        e.preventDefault(); //阻止跳转行为
        //获取要跳转的页号
        var pageNum = $(this).attr('href');
        classLoad(pageNum,classKey);
    });
    function classLoad(pageNum,classDispaly){
        $.ajax({
            url:"data/classifiedDisplay.php",
            data:{pageNum:pageNum,classDispaly:classDispaly},
            success:function(pager){
                console.log("开始处理响应数据");
                if(pager.recordCount==0){
                    $('#no-product-show').css('display','block');
                }else{
                    $('#no-product-show').css('display','none');
                }
                var html='';
                $.each(pager.data,function(i,auto){
                    html+=`<li>
							<img class="${auto.PID}" src="${auto.PIC1}" alt=""/>
                            <b>￥${auto.PRICE}</b>
							<span>${auto.PNAME}</span>
							<span class="belong-somebody">商品持有人：${auto.UNAME}</span>
                            <i class="connect"><a href="tencent://message/?uin=${auto.QQ}&Site=Sambow&Menu=yes">联系卖家</a></i><a href="${auto.PID}"class="b_cart">加入购物车</a>
                        </li>`;
                });
                $(" #product_show>ul").html(html);
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
                $('#searchPage #list-page ').html(html);
            }
        });
    }
});
/**
 * Created by haedu on 2017/5/22.
 */
