
$("#headMain_content").on('click','#search_button',function(){
    var kw = $(this).siblings('#txtSearch').val();
    searchLoad(1,kw);
});
//功能点五 用户点击分页条号时实现异步加载
$('#list-page').on('click','a',function(e){
    e.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var kw = $('#txtSearch').val();
    var pageNum = $(this).attr('page');
    searchLoad(pageNum,kw);
    //$(this).addClass('page-click').siblings('.page-click').removeClass('page-click');
});
function searchLoad(pageNum,kw){
    $.ajax({
        url:"http://www1.haedu.cn/plus/search.php?keyword="+kw,
        success:function(pager){
            console.log(pager);
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
                            <a href="chat.html" class="connect">联系卖家</a><a href="${auto.PID}"class="b_cart">加入购物车</a>
                        </li>`;
            });
            $("#product_show>ul").html(html);
            //根据返回的响应数据动态创建分页条
            var html = '';
            if(pager.pageNum-2>0){
                html += `<a  page="${pager.pageNum-2}">${pager.pageNum-2}</a>`;
            }
            if(pager.pageNum-1>0){
                html += `<a page="${pager.pageNum-1}">${pager.pageNum-1}</a> `;
            }

            html += `<a href="#" class="page-click">${pager.pageNum}</a> `;
            if(pager.pageNum+1<=pager.pageCount){
                html += `<a page="${pager.pageNum+1}">${pager.pageNum+1}</a> `;
            }
            if(pager.pagerNum+2<=pager.pageCount){
                html += `<a page="${pager.pageNum+2}">${pager.pageNum+2}</a> `;
            }
            $('#list-page').html(html);
        }
    });
}

