/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadProductByPage(1);
    $('#wddd').on('click','.completeOrder',function(){
        var spid = $(this).attr('title');
        $.ajax({
            type:'POST',
            url:"data/completeOrder.php?spid="+spid,
            success:function(text){
                if(text == 'succ'){
                    $('.model-tips').css('display','block');
                    $('.sure-btn').click(function(){
                        $('.model-tips').css('display','none');
                        $(".completeOrder[title='"+spid+"']").attr('disabled',true).css('background','#ddd').html('已完成订单');
                    });
                }else{
                    console.log('存在未知错误请重新下架');
                }
            }


        });
    });
});

//功能点五 用户点击分页条号时实现异步加载
$('#wddd .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadProductByPage(pageNum);
});


function loadProductByPage(pageNum){
    $.ajax({
        url:"data/yiwancheng.php",
        data: {uname: sessionStorage['loginName'],pageNum:pageNum},
        success:function(pager){
            $('#top-bar #welcome').html('您好！欢迎'+sessionStorage['loginName']+'来到我的驿站');
            $('#myOrder h2 ul li.curr a').html('已完成订单('+pager.recordCount+')');
            if(pager.recordCount==0){
                $('#no-product-show').css({"position":"absolute",
                    "top":"50%",
                    "left":"50%",
                    "margin-left":"-100px",
                    "color":"#e4339c",
                    "font-size":"24px",
                    "display":"block"});
            }
            var html='';
            $.each(pager.data,function(i,auto){
                    html+=`<tr>
                        <td>
				          <p class="pic">
                           <img src="${auto.pic1}" alt=""/>
                          </p>
                          <div>
                            <p>${auto.spname}</p>
                            <p class="owner">商品购买人：${auto.sbname}</p>
                          </div>
                        </td>
                        <td class="price">¥${auto.sprice}</td>
                        <td style="text-align:center">商品交付完毕</td>
                        <td>
                            <button class="completeOrder" disabled style="background: #eee;" title="${auto.spid}">订单已完成</button>
                        </td>
                       </tr>`;

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

/**
 * Created by haedu on 2017/4/19.
 */
