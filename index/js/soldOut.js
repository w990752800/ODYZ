/**
 * Created by haedu on 2017/4/10.
 */
/**
 * Created by haedu on 2017/3/23.
 */
$(function(){
    loadProductByPage(1);
    //上架功能
    $('.myShoppingCart table>tbody').on('click','.soldOut-btn',function(){
        var pid = $(this).attr('pid');
        $.ajax({
            type:'POST',
            url:"data/upShelf.php?pid="+pid,
            success:function(text){
                if(text == "succ"){
                    $('#model-tips').css('display','block');
                }else{
                    console.log('存在未知错误请重新下架');
                }
            }
        });
        $('#sure-btn').click(function(){
            console.log(pid);
            $('.model-tips').css('display','none');
            $("button[pid='"+pid+"']").html('上架成功');
        });

    });
    $('.myShoppingCart table>tbody').on('click','.delete-btn',function(){
        var pid = $(this).attr('pid');
        $.ajax({
            type:'POST',
            url:"data/deleteProduct.php?pid="+pid,
            success:function(text){
                if(text == "succ"){
                    $('#model-tipsT').css('display','block');
                }else{
                    console.log('存在未知错误请重新下架');
                }
            }
        });
    });
});

//功能点五 用户点击分页条号时实现异步加载
$('#list-page').on('click','a',function(e){
    e.preventDefault(); //阻止跳转行为
    //获取要跳转的页号
    var pageNum = $(this).attr('href');
    loadProductByPage(pageNum);
    $(this).addClass('page-click').siblings('.page-click').removeClass('page-click');
});

function loadProductByPage(pageNum){
    $.ajax({
        url:"data/soldOut.php?pageNum="+pageNum,
        data:{uname: sessionStorage['loginName']},
        success:function(pager){
            $('#top-bar #welcome').html('您好！欢迎'+sessionStorage['loginName']+'来到我的驿站');
            var html='';
            $.each(pager.data,function(i,auto){
                html+=`<tr>
                    <td>
                      <p class="pic">
                        <img src="${auto.PIC1}" alt=""/>
                      </p>
                      <div>
                        <p>${auto.PNAME}</p>
                        <p class="owner">商品持有人：${auto.UNAME}</p>
                      </div>
                    </td>
                    <td class="price">¥${auto.PRICE}</td>
                    <td>
                      <button class="soldOut-btn" pid="${auto.PID}">重新上架</button>
                      <a href="javascript:;" pid="${auto.PID}" class="delete-btn">彻底删除</a>
                    </td>
          </tr>`;
            });
            $(".myShoppingCart table>tbody").html(html);
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


