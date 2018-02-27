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
        url:"data/wantBuyArea.php?pageNum="+pageNum,
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,auto){
                html+=`
                <li>
                   <div>
                    <label style="float: left">求购商品：</label>
                       <span>${auto.pname}</span>
                       <p>
                           <label>求购人：</label>
                           <span>${auto.uname}</span>
                       </p>
                   </div>
                   <p class="desc">
                    <label style="float: left">商品描述：</label>
                    <span>${auto.pdesc}</span>
                   </p>
                   <p>
                    <label style="float: left">期望价格：</label>
                       <b>¥${auto.wantPrice}</b>
                      <i class="connect"><a href="tencent://message/?uin=${auto.QQ}&Site=sc.chinaz.com&Menu=yes">联系买家</a></i>
                   </p>
               </li>
              `;
            });
            $(".zm-container>ul").html(html);
            //根据返回的响应数据动态创建分页条
            var html = '';
            if(pager.pageNum-2>0){
                html += `<a  href="${pager.pageNum-1}">${pager.pageNum-2}</a>`;
            }
            if(pager.pageNum-1>0){
                html += `<a href="${pager.pageNum-1}">${pager.pageNum-1}</a> `;
            }

            html += `<a href="#" class="curr">${pager.pageNum}</a> `;
            if(pager.pageNum+1<=pager.pageCount){
                html += `<a href="${pager.pageNum+1}">${pager.pageNum+1}</a> `;
            }
            if(pager.pagerNum+2<=pager.pageCount){
                html += `<a href="${pager.pageNum+2}">${pager.pageNum+2}</a> `;
            }

            $('.pager').html(html);
        }
    });
}

