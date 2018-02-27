/**功能点1：获取上一个页面传递的登录用户名**/
$('#top_box span').html(loginName);
/**功能点2：异步加载公用的页头和页尾**/
//$('div#header').load('header.php');
//$('div#footer').load('footer.php');

/**功能点4：页面加载完成后，异步请求产品列表**/
$(function(){
  loadFavoriteByPage(1);
});

/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/
$('#myCollection .pager').on('click','a',function(event){
  event.preventDefault(); //阻止跳转行为
  //获取要跳转的页号
  var pageNum = $(this).attr('href');
  loadFavoriteByPage(pageNum);
});

//分页加载商品数据，并动态创建分页条
function loadFavoriteByPage(pageNum){
  $.ajax({
    url: '../data/6_favorite_detail.php',
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
              <button class="${d.productId}">加入购物车</button>
              <a href="" class="${d.productId}">删除</a>
            </td>
          </tr>
        `;
      });
      $('#myCollection .myShoppingCart tbody').html(html);
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
      $('#myCollection .pager').html(html);


      //“加入购物车”按钮是后来动态添加的，必需使用事件代理
      $('#myCollection .myShoppingCart tbody').on('click','button',function(event){
        event.preventDefault();
        var pid = $(this).attr('class');
        //发起异步请求
        $.ajax({
          type: 'POST',
          url: '../data/3_cart_add.php',
          data: {uname:loginName,pid:pid},
          success: function(obj){
            alert('添加购物车成功!');
          }
        });
      });

//“删除”按钮是后来动态添加的，必需使用事件代理
      $('#myCollection .myShoppingCart tbody').on('click','a',function(event){
        event.preventDefault();
        var pid = $(this).attr('class');
        //发起异步请求
        $.ajax({
          type: 'POST',
          url: '../data/6_favorite_detail_delete.php',
          data: {uname:loginName,pid:pid},
          success: function(obj){
            alert("从我的收藏中删除成功");
            location.reload();
          }
        });
      });


    }
  });
}