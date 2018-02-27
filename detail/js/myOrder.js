/**功能点1：页面加载完成后，异步请求产品列表**/
$(function(){
    loadOrderByPage(1);
    loadOrder1ByPage(1);
    loadOrder2ByPage(1);
    loadOrder3ByPage(1);

    $.ajax({
        url: '../data/total.php',
        data: {uname: sessionStorage['loginName']},
        success: function (output) {
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            var html = '';
            html += `
                    <ul>
          <li class="curr"><a href="#wddd">我的订单（<i>${output.order}</i>）</a></li>
          <li><a href="#zzjy">正在交易（<i>${output.beingTraded}</i>）</a></li>
          <li><a href="#qrjy">确认交易（<i>${output.traded}</i>）</a></li>
          <li><a href="#wdpj">我的评价（<i>${output.comment}</i>）</a></li>
        </ul>
        `;
            $('#myOrder h2').html(html);

            /**功能点2：为附加导航中项添加事件监听，进行内容切换**/


            $('#myOrder ul li a').click(function(e){
                e.preventDefault();
                //修改li的.active的位置
                console.log("haha");
                $(this).parent().addClass('curr').siblings('.curr').removeClass('curr');

                //修改右侧主体中的div的.active位置
                var id = $(this).attr('href');
                $(id).addClass('curr').siblings('.curr').removeClass('curr');
            });
        }
    });
});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#wddd .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadOrderByPage(pageNum);
});

//分页加载商品数据，并动态创建分页条
function loadOrderByPage(pageNum){
    $.ajax({
        url: '../data/8_order_select.php',
        data: {uname: sessionStorage['loginName'],pageNum:pageNum},
        success: function(pager){
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            console.log("1111");
            $('#top_box span').html(sessionStorage['loginName']);

            if(pager.recordCount==0){
                $('#no-product-shows').css("display","block");
            }

            var html = '';
            $.each(pager.data,function(i,d){
                $.each(d.productList, function(j,p){
                    html += `
                    <tr>
                        <td>
                          <p class="pic">
                            <img src="../../index/${p.pic1}" alt=""/>
                          </p>
                          <div>
                            <p>${p.pname}</p>
                            <p class="owner">${p.uname}</p>
                          </div>
                        </td>
                        <td class="price">¥${p.price}</td>
                        <td class="orderStatus" style="text-align: center">${d.orderStatus}</td>
                        <td>
                          <!--<button class="${p.pid}">付款中</button>-->
                          <a href="" class="${p.pid}">删除</a>
                        </td>
                      </tr>
                `;
                })
            });
            $('#wddd tbody').html(html);

            var trList = $("#wddd tbody").children("tr")
            console.log(trList.length);
            for (var i=0;i<trList.length;i++) {
                var tdArr = trList.eq(i).find("td");
                if(tdArr.eq(2).html()==="1"){
                    tdArr.eq(2).html("付款中");
                    console.log("付款中");
                    //tdArr.eq(3).find('button').html("确认付款");
                }else if(tdArr.eq(2).html()==="2"){
                    tdArr.eq(2).html("确认交易");
                    //tdArr.eq(3).find('button').html("交易完成");
                } else if(tdArr.eq(2).html()==="3"){
                    console.log("交易完成");
                    tdArr.eq(2).html("交易完成");
                    //tdArr.eq(3).find('button').html("评论");
                }
            }

            //if($("tr .orderStatus").html()=="2"){
            //    console.log("ha");
            //    $(".orderStatus").html("付款中");
            //    $(".orderStatus").next("td").children("button").html("确认交易");
            //}

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
            //“删除”按钮是后来动态添加的，必需使用事件代理
            $('#wddd tbody').on('click','a',function(event){
                event.preventDefault();
                var pid = $(this).attr('class');
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: '../data/8_order_select_delete.php',
                    data: {uname:loginName,pid:pid},
                    success: function(obj){
                        alert("从我的订单中删除成功");
                        location.reload();
                    }
                });
            });
            ////把所有的日期对应的数字转换为年月日格式
            //var jqObj = $('#order-table tbody td:nth-child(4)');
            //jqObj.each(function(i,td){
            //    var num = td.innerHTML;
            //    var str = new Date(parseInt(num)).stringify();
            //    td.innerHTML = str;
            //});

        }
    });
}





//*********************************************************正在交易
/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#zzjy .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadOrder1ByPage(pageNum);
});

//分页加载商品数据，并动态创建分页条
function loadOrder1ByPage(pageNum){
    $.ajax({
        url: '../data/8_order_select_1.php',
        data: {uname: sessionStorage['loginName'],pageNum:pageNum},
        success: function(pager){
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            console.log("1111");
            $('#top_box span').html(sessionStorage['loginName']);

            var html = '';
            $.each(pager.data,function(i,d){
                $.each(d.productList, function(j,p){
                    html += `
                    <tr>
                        <td>
                          <p class="pic">
                            <img src="../../index/${p.pic1}" alt=""/>
                          </p>
                          <div>
                            <p>${p.pname}</p>
                            <p class="owner">${p.uname}</p>
                          </div>
                        </td>
                        <td class="price">¥${p.price}</td>
                        <td class="orderStatus" style="text-align: center">${d.orderStatus}</td>
                        <td>
                          <button class="${p.pid}">确认交易</button>
                          <a href="" class="${p.pid}">删除</a>
                        </td>
                      </tr>
                `;
                })
            });
            $('#zzjy tbody').html(html);
            if($("#zzjy tr .orderStatus").html()=="1"){
                $("#zzjy tr .orderStatus").html("付款中");
                //$(".orderStatus").next("td").children("button").html("确认交易");
            }

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
            $('#zzjy .pager').html(html);

            //“确认交易”按钮是后来动态添加的，必需使用事件代理
            $('#zzjy tbody').on('click','button',function(event){
                event.preventDefault();
                var pid = $(this).attr('class');
                console.log("交易完成");
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: '../data/8_sureBuy.php',
                    data: {uname:loginName,pid:pid},
                    success: function(txt){
                        $('#model-tips').css('display','block');
                        $('#model-tips p').html(txt);
                    }
                });
            });


            //“删除”按钮是后来动态添加的，必需使用事件代理
            $('#zzjy tbody').on('click','a',function(event){
                event.preventDefault();
                var pid = $(this).attr('class');
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: '../data/8_order_select_delete.php',
                    data: {uname:loginName,pid:pid},
                    success: function(obj){
                        alert("从我的订单中删除成功");
                        location.reload();
                    }
                });
            });
            ////把所有的日期对应的数字转换为年月日格式
            //var jqObj = $('#order-table tbody td:nth-child(4)');
            //jqObj.each(function(i,td){
            //    var num = td.innerHTML;
            //    var str = new Date(parseInt(num)).stringify();
            //    td.innerHTML = str;
            //});

        }
    });
}





//*********************************************************确认交易
/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#qrjy .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadOrder2ByPage(pageNum);
});

//分页加载商品数据，并动态创建分页条
function loadOrder2ByPage(pageNum){
    $.ajax({
        url: '../data/8_order_select_2.php',
        data: {uname: sessionStorage['loginName'],pageNum:pageNum},
        success: function(pager){
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            console.log("1111");
            $('#top_box span').html(sessionStorage['loginName']);

            var html = '';
            $.each(pager.data,function(i,d){
                $.each(d.productList, function(j,p){
                    html += `
                    <tr>
                        <td>
                          <p class="pic">
                            <img src="../../index/${p.pic1}" alt=""/>
                          </p>
                          <div>
                            <p>${p.pname}</p>
                            <p class="owner">${p.uname}</p>
                          </div>
                        </td>
                        <td class="price">¥${p.price}</td>
                        <td class="orderStatus" style="text-align: center">${d.orderStatus}</td>
                        <td>
                          <button class="${p.pid}">评论</button>
                          <a href="" class="${p.pid}">删除</a>
                        </td>
                      </tr>
                `;
                })
            });
            $('#qrjy tbody').html(html);
            if($("#qrjy tr .orderStatus").html()=="2"){
                console.log("ha");
                $("#qrjy tr .orderStatus").html("交易完成");
                //$(".orderStatus").next("td").children("button").html("确认交易");
            }

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
            $('#qrjy .pager').html(html);


            //“评论”按钮是后来动态添加的，必需使用事件代理
            $('#qrjy tbody').on('click','button',function(event){
                event.preventDefault();
                var pid = $(this).attr('class');
                $('.modal').css("display","block");

                //修改账户信息
                $("#bt-comment").click(function(){
                    $("[name='uname']").attr("value",sessionStorage['loginName']);
                    $("[name='pid']").attr("value",pid);
                    var commentData = $('#comment-form').serialize();
                    console.log(commentData);
                    console.log("评论");

                    $.ajax({
                        type: 'post',
                        url: '../data/8_comment.php',
                        data:commentData,
                        success: function(txt){
                            $('#model-tips').css('display','block');
                            $('#model-tips p').html(txt);
                        }
                    });
                });
            });


            //“删除”按钮是后来动态添加的，必需使用事件代理
            $('#qrjy tbody').on('click','a',function(event){
                event.preventDefault();
                var pid = $(this).attr('class');
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: '../data/8_order_select_delete.php',
                    data: {uname:loginName,pid:pid},
                    success: function(obj){
                        alert("从我的订单中删除成功");
                        location.reload();
                    }
                });
            });
            ////把所有的日期对应的数字转换为年月日格式
            //var jqObj = $('#order-table tbody td:nth-child(4)');
            //jqObj.each(function(i,td){
            //    var num = td.innerHTML;
            //    var str = new Date(parseInt(num)).stringify();
            //    td.innerHTML = str;
            //});

        }
    });
}



//*********************************************************我的评价
/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#wdpj .pager').on('click','a',function(event){
    event.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadOrder3ByPage(pageNum);
});

//分页加载商品数据，并动态创建分页条
function loadOrder3ByPage(pageNum){
    $.ajax({
        url: '../data/8_order_select_3.php',
        data: {uname: sessionStorage['loginName'],pageNum:pageNum},
        success: function(pager){
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            console.log("1111");
            $('#top_box span').html(sessionStorage['loginName']);

            var html = '';
            $.each(pager.data,function(i,d){
                $.each(d.productList, function(j,p){
                    html += `
                    <tr>
                        <td>
                          <p class="pic">
                            <img src="../../index/${p.pic1}" alt=""/>
                          </p>
                          <div>
                            <p>${p.pname}</p>
                            <p class="owner">${p.uname}</p>
                          </div>
                        </td>
                        <td class="price">¥${p.price}</td>
                        <td class="comment" style="text-align: left;padding: 0 5px">${d.comment}</td>
                        <td>
                          <a href="" class="${p.pid}">删除</a>
                        </td>
                      </tr>
                `;
                })
            });
            $('#wdpj tbody').html(html);

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
            $('#wdpj .pager').html(html);



            //“删除”按钮是后来动态添加的，必需使用事件代理
            $('#wdpj tbody').on('click','a',function(event){
                event.preventDefault();
                var pid = $(this).attr('class');
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: '../data/8_order_select_delete.php',
                    data: {uname:loginName,pid:pid},
                    success: function(obj){
                        alert("从我的订单中删除成功");
                        location.reload();
                    }
                });
            });
            ////把所有的日期对应的数字转换为年月日格式
            //var jqObj = $('#order-table tbody td:nth-child(4)');
            //jqObj.each(function(i,td){
            //    var num = td.innerHTML;
            //    var str = new Date(parseInt(num)).stringify();
            //    td.innerHTML = str;
            //});

        }
    });
}
$('#model-tips .sure-btn').click(function(){
    $(this).parents('#model-tips').css('display','none');
    location.reload();
});