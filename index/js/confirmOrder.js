/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadProductByPage(1);
    $('#wddd').on('click','.completeOrder',function(){
        var spid = $(this).attr('title');
        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        }
        var sdate=getNowFormatDate();
        console.log(sdate);
        $.ajax({
            type:'POST',
            url:"data/completeOrder.php",
            data:{spid:spid,sdate: sdate,uname:sessionStorage['loginName']},
            success:function(text){
                $('.model-tips').css('display','block');
                $('.model-tips p').html(text);
                $('.model-tips .sure-btn').click(function(){
                    location.reload();
                });
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
        url:"data/confirmOrder.php",
        data: {uname: sessionStorage['loginName'],pageNum:pageNum},
        success:function(pager){
            $('#top-bar #welcome').html('您好！欢迎'+sessionStorage['loginName']+'来到我的驿站');
            $('#myOrder h2 ul li.curr a').html('待确认订单('+pager.recordCount+')');
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
                        <td style="text-align:center">买家已付款</td>
                        <td>
                            <button class="completeOrder" title="${auto.spid}">确认交易</button>
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

