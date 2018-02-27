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
    //$(this).addClass('page-click').siblings('.page-click').removeClass('page-click');
});
function loadProductByPage(pageNum){
    $.ajax({
        url:"data/myPub.php?pageNum="+pageNum,
        data:{uname: sessionStorage['loginName']},
        success:function(pager){
            $('#top-bar #welcome').html('您好！欢迎'+sessionStorage['loginName']+'来到我的驿站');
            $('#myRelease h2 .active').html('我的发布('+pager.recordCount+')');
            var html='';
            $.each(pager.data,function(i,auto){
                if(auto.STAUS == 0){
                    html+=` <li>
                        <p class="title" pid="${auto.PID}">${auto.PNAME}</p>
                        <p>交易价：<span>¥${auto.PRICE}</span></p>
                        <p class="pic">
                          <img style="height:185px;" src="${auto.PIC1}" alt=""/>
                        </p>
                        <!--<p><i>0</i>赞 <i>0</i>留言 <i>0</i>评论</p>-->
                        <!--<p>${auto.RETAINTIME}展示时间</p>-->
                        <div style="text-align: center">

                          <button disabled >商品已下架</button>
                        </div>
                     </li>`;
                }else if(auto.STAUS == 1){
                    html+=` <li>
                        <p class="title" pid="${auto.PID}">${auto.PNAME}</p>
                        <p>交易价：<span>¥${auto.PRICE}</span></p>
                        <p class="pic">
                          <img style="height:185px;" src="${auto.PIC1}" alt=""/>
                        </p>
                        <!--<p><i>0</i>赞 <i>0</i>留言 <i>0</i>评论</p>-->

                        <div style="text-align: center">
                          <button class="changeDetail" product="${auto.PID}">修改商品信息</button>
                          <button class="downShelf">商品下架</button>
                        </div>
                     </li>`;
                }
            });
            $("#myRelease .myRelease>ul").html(html);
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
            //$('#list-page a:first-child').addClass('page-click');

        }
    });
}

