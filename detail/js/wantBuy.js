/**为所有的Date对象添加一个新的成员方法，转换为形如y-m-d<br>h:m:s**/
Date.prototype.stringify = function(){
  var s = this.getFullYear()+'-';
  s += (this.getMonth()+1)+'-';
  s += this.getDate()+'<br>';
  s += this.getHours()+':';
  s += this.getMinutes()+':';
  s += this.getSeconds();
  return s;
}

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
$('#myWantBuy .pager').on('click','a',function(event){
  event.preventDefault(); //阻止跳转行为
  //获取要跳转的页号
  var pageNum = $(this).attr('href');
  loadFavoriteByPage(pageNum);
});

//分页加载商品数据，并动态创建分页条
function loadFavoriteByPage(pageNum){
  $.ajax({
    url: '../data/9_myWantBuy.php',
    data: {uname: sessionStorage['loginName'],pageNum:pageNum},
    success: function(pager){
      $('#top_box span').html(sessionStorage['loginName']);

      //遍历读取到分页器对象，拼接HTML，追加到DOM树
      var html = '';
      $.each(pager.data,function(i,d){
        html += `
          <tr>
            <td style="text-align: center">${d.pname}</td>
            <td class="price">¥${d.wantPrice}</td>
            <td style="text-align: center" id="buyTime" class="${d.wbid}">${d.wantBuyTime}</td>
            <td>
            <button id="down" class="${d.wbid}">${d.buyStatus}</button>
              <a href="" class="${d.wbid}">删除</a>
            </td>
          </tr>
        `;
      });
      $('#myWantBuy .myShoppingCart tbody').html(html);

      //把所有的日期对应的数字转换为年月日格式
      var jqObj = $('#myWantBuy tbody td:nth-child(3)');
      jqObj.each(function(i,td){
        var num = td.innerHTML;
        console.log(num);
        var str = new Date(parseInt(num)).stringify();
        td.innerHTML = str;

        //判断时间
        var lastTime =parseInt(num)+30*24*60*60*1000;
        console.log(lastTime);
        var now = new Date();
        var nowTime= now.getTime();
        console.log(nowTime);
        if(nowTime>=lastTime){
          var wbid=$('#buyTime').attr('class');
          $.ajax({
            type: 'POST',
            url: '../data/9_myWantBuy_down.php',
            data: {uname:loginName,wbid:wbid},
            success: function(obj){
              console.log("111");
              //for(var i=1;i<2;i++){
              //  location.reload();
              //}

            }
          });
        }
      });

      var trList = $("#myWantBuy tbody").children("tr")
      console.log(trList.length);
      for (var i=0;i<trList.length;i++) {
        var tdArr = trList.eq(i).find("td");
        var vall=tdArr.eq(3).find('button').html();
        if(tdArr.eq(3).find('button').html()==="1"){
          tdArr.eq(3).find('button').html("下架");
        }else if(tdArr.eq(3).find('button').html()==="2"){
          tdArr.eq(3).find('button').html("已下架");
          tdArr.eq(3).find('button').css("background",'#f0f1f2');
        }
      }
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
      $('#myWantBuy .pager').html(html);
      //下架
      $('#myWantBuy .myShoppingCart tbody').on('click','button',function(event){
        event.preventDefault();
        var wbid = $(this).attr('class');
        //发起异步请求
        $.ajax({
          type: 'POST',
          url: '../data/9_myWantBuy_down.php',
          data: {uname:loginName,wbid:wbid},
          success: function(obj){
            alert("下架成功");
            location.reload();
          }
        });
      });

//“删除”按钮是后来动态添加的，必需使用事件代理
      $('#myWantBuy .myShoppingCart tbody').on('click','a',function(event){
        event.preventDefault();
        var wbid = $(this).attr('class');
        //发起异步请求
        $.ajax({
          type: 'POST',
          url: '../data/9_myWantBuy_delete.php',
          data: {uname:loginName,wbid:wbid},
          success: function(obj){
            alert("从我的求购中删除成功");
            location.reload();
          }
        });
      });


    }
  });
}