
/**功能点2：异步加载公用的页头和页尾**/
//$('div#header').load('header.php');
//$('div#footer').load('footer.php');

/**功能点4：页面加载完成后，异步请求产品列表**/
$(function(){
  loadProductByPage(1);
});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#myShoppingCart .pager').on('click','a',function(event){
  event.preventDefault(); //阻止跳转行为
  //获取要跳转的页号
  var pageNum = $(this).attr('href');
  loadProductByPage(pageNum);
});

//分页加载商品数据，并动态创建分页条
function loadProductByPage(pageNum){
  $.ajax({
    url: '../data/4_cart_detail.php',
    data: {uname: sessionStorage['loginName'],pageNum:pageNum},
    success: function(pager){
      $('#top_box span').html(sessionStorage['loginName']);

      if(pager.recordCount==0){
        $('#no-product-shows').css("display","block");
      }
      //遍历读取到分页器对象，拼接HTML，追加到DOM树
      var html = '';
      $.each(pager.data,function(i,d){
        html += `
          <tr>
            <td>
              <p class="pic">
                <img src="../../index/${d.pic1}" alt=""/>
              </p>
              <div>
                <p>${d.pname}</p>
                <p class="owner">${d.uname}</p>
              </div>
            </td>
            <td class="price">¥${d.price}</td>
            <td>
              <a href="${d.price}" class="${d.productId}">购买</a>
              <a href="" class="${d.productId}">删除</a>
            </td>
          </tr>
        `;
      });
      $('#myShoppingCart .myShoppingCart tbody').html(html);
      //根据返回的分页数据，动态创建分页条内容
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
      $('#myShoppingCart .pager').html(html);
    }
  });
}