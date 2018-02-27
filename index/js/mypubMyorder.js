/**
 * Created by haedu on 2017/4/18.
 */

/**功能点2：异步加载公用的页头和页尾**/
//$('div#header').load('header.php');
//$('div#footer').load('footer.php');

/**功能点4：页面加载完成后，异步请求产品列表**/
$(function(){
    loadOrderByPage(1);

});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#wddd .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadOrderByPage(pageNum);
});
$('#wddd').on('click','.aceptOrder',function(){
    var pid = $(this).attr('title');
    $.ajax({
        type:'POST',
        url:"data/takeOrder.php",
        data:{pid:pid,uname:sessionStorage['loginName']},
        success:function(text){
            $('#model-accept').css('display','block');
            $('#model-accept p').html(text.msg);
            $('#sure-btn').click(function(){
                location.reload();
            });
        }
    });

});
//分页加载商品数据，并动态创建分页条
function loadOrderByPage(pageNum){
    $.ajax({
        url: 'data/mypubMyorder.php',
        data: {uname: sessionStorage['loginName'],pageNum:pageNum},
        success: function(pager){
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            $('#top-bar #welcome').html('您好！欢迎'+sessionStorage['loginName']+'来到我的驿站');
            $('#myOrder h2 ul li.curr a').html('商品订单('+pager.recordCount+')');
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
                        <td style="text-align:center">买家已下单</td>
                        <td>
                            <button class="aceptOrder" title="${auto.spid}">接单</button>
                            <button class="refuseOrder" title="${auto.spid}">拒绝订单</button>
                        </td>
                        </tr>`;
            });
            $("#wddd table tbody").html(html);
            $('#wddd').on('click','.refuseOrder',function(){
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
                    url:"data/refuseOrder.php",
                    data:{spid:spid,sdate:sdate},
                    success:function(text){
                        if(text == 'succ'){
                            $('#model-refuse').css('display','block');
                            $('#sure-btn2').click(function(){
                                $('#model-refuse').css('display','none');
                                $(".refuseOrder[title='"+spid+"']").attr('disabled',true).css('background','#DE5549').html('订单已拒绝');
                                $(".aceptOrder[title='"+spid+"']").remove();
                            });
                        }else{
                            alert('拒绝失败');
                        }
                    }
                });

            })

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