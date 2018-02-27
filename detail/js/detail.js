/**功能点2：异步加载公用的页头和页尾**/
$('div#top_box').load('../data/header.php');
$('div#searchHot').load('../data/hotSearch.php');
$('div#main_nav').load('../data/mainNav.php');
$('#footer').load('../data/footer.php');

var loginName=sessionStorage['loginName'];
$('.sure-btn').click(function(){
    $(this).parents('.model-tips').css('display','none');
});
/**功能点7：点击“我的积分”跳转到购物车详情页，传递当前登录的用户名**/
$('div#searchHot').on('click','.user',function(){
    //JS跳转到购物车详情页
    if(!loginName==''){
        location.href='../html/userCenter.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }


});
/**功能点7：点击“我的积分”跳转到购物车详情页，传递当前登录的用户名**/
$('div#searchHot').on('click','.my-grade',function(){
    //JS跳转到购物车详情页
    if(!loginName==''){
        location.href='../html/userCenter.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
});
$('div#searchHot').on('click','.cart',function(){
    //JS跳转到购物车详情页
    if(!loginName==''){
        location.href='../html/myShoppingCart.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }


});

//主导航点击事件
//首页
$('div#main_nav').on('click','.index',function(){
    location.href='../../index/firstPage.html';
});
//发布商品
$('div#main_nav').on('click','.pubProduct',function(){

    if(!loginName==''){
        location.href='../../index/pubProduct.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
});
//求购专区
$('div#main_nav').on('click','.wantBuyArea',function(){
    if(!loginName==''){
        location.href='../../index/wantBuyArea.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }
});
//最新发布
$('div#main_nav').on('click','.newPub',function(){
    if(!loginName==''){
        location.href='../../index/newPub.html';
    }else{
        $('#model-tips4').css('display','block');
    }

});
//发布求购
$('div#main_nav').on('click','.wantBuy',function(){
    if(!loginName==''){
        location.href='../../index/wantBuy.html?loginName='+loginName;
    }else{
        $('#model-tips4').css('display','block');
    }

});

/**功能点7：点击“查看购物车”跳转到购物车详情页，传递当前登录的用户名**/
$.ajax({
        url: '../data/product_detail.php',
        data: {pid:sessionStorage['pid']},
        success: function (list) {
            if(!loginName==''){
            }else {
                $('header ul .exit').css("display", "none");
                console.log("11");
                $('header ul .login').css("display", "block");
            }
            $('#top_box span').html(sessionStorage['loginName']);
            //遍历读取到分页器对象，拼接HTML，追加到DOM树
            var html = '';
            $.each(list,function (i, d) {
                html += `
        <p class="category"><b>${d.PONE}</b>  ${d.PTWO}   <span>商品详情</span></p>
        <!--商品-->
        <div class="detail">
            <div class="detailPic">
                <h3>
                    <img id="mImg" src="../../index/${d.PIC1}" alt=""/>
                    <div id="mask"></div>
                    <div id="superMask"></div>
                </h3>
                <div id="largeDiv">
                </div>
                <ul id="icon_list">
                    <li class="curr">
                        <img src="../../index/${d.PIC1}" alt=""/>
                    </li>
                    <li>
                        <img src="../../index/${d.PIC2}" alt=""/>
                    </li>
                    <li>
                        <img src="../../index/${d.PIC3}" alt=""/>
                    </li>
                    <li>
                        <img src="../../index/${d.PIC4}" alt=""/>
                    </li>
                </ul>
            </div>
            <div class="detailDesc">
                <div class="title">${d.PNAME}
                 <span class="author"></span></div>
                <p class="owner">商品持有人： ${d.UNAME} <a href="${d.PID}" class="sellerInfo" style="float: right;margin-right: 10px;font-size: 14px;">查看卖家信息</a></p>
                <div class="price">
                    <p><label>交易价：</label><span>${d.PRICE}</span> <a href="${d.PID}" class="report"><i></i>举报该商品</a></p>
                </div>
                <p class="desc">
                    [ <span>商品介绍，以及书籍的损坏程度！</span>]${d.PDESC}
                </p>
                <p class="send">配    送：本校区当面交易，校区以外地点，可发快递，<span>快递费由双方协商！</span></p>
                <p class="serve">服    务：确认下单后，当天可以交易，如果加急，可代领，可自取</p>
                <ul>
                    <li><i></i><a href="${d.PID}" class="b_cart">加入购物车</a></li>
                    <li><i></i><a href="${d.PID}" class="favorite">收藏</a></li>
                    <li>
                    <i class="chat"></i><a href="tencent://message/?uin=${d.QQ}&Site=sc.chinaz.com&Menu=yes">在线聊天</a>
                    </li>

                    <li><a href="${d.PID}" class="${d.PRICE}"  id="sureBuy">购买</a></li>
                </ul>
                <div class="bdsharebuttonbox">
    <a href="#" class="bds_more" data-cmd="more"></a>
    <a href="#" class="bds_qzone" data-cmd="qzone"></a>
    <a href="#" class="bds_tsina" data-cmd="tsina"></a>
    <a href="#" class="bds_tqq" data-cmd="tqq"></a>
    <a href="#" class="bds_renren" data-cmd="renren"></a>
    <a href="#" class="bds_weixin" data-cmd="weixin"></a>
</div>
                <p class="prompt">温馨提示：一手交钱一手交货，支持支付宝、微信转账！</p>
            </div>
            <div class="clear"></div>
        </div>
        `;
            });
            $('#main').html(html);
            //放大镜
            var zoom={
                MSIZE:175,//保存mask的大小
                MAXLEFT:175,MAXTOP:175,//保存mask可用的最大坐标
                init:function(){
                    //为id为icon_list的ul添加鼠标进入事件代理，仅li下的img可响应事件，处理函数为changeImgs
                    $("#icon_list").on(
                        "mouseover","li>img",this.changeImgs);
                    //为id为superMask的div添加hover事件,切换mask的显示和隐藏,再绑定鼠标移动事件为moveMask
                    $("#superMask").hover(this.toggle,this.toggle)
                        .mousemove(
                        this.moveMask.bind(this));
                },
                moveMask:function(e){
                    var x=e.offsetX;//获得鼠标相对于父元素的x
                    var y=e.offsetY;//获得鼠标相对于父元素的y
                    //计算mask的left: x-MSIZE/2
                    var left=x-this.MSIZE/2;
                    //计算mask的top: y-MSIZE/2
                    var top=y-this.MSIZE/2;
                    //如果left越界，要改回边界值
                    left=left<0?0:
                        left>this.MAXLEFT?this.MAXLEFT:
                            left;
                    //如果top越界，要改回边界值
                    top=top<0?0:
                        top>this.MAXTOP?this.MAXTOP:
                            top;
                    //设置id为mask的元素的left为left,top为top
                    $("#mask").css({left:left,top:top});
                    //设置id为largeDiv的背景图片位置:
                    $("#largeDiv").css(
                        "backgroundPosition",
                        -left*16/7+"px "+-top*16/7+"px");
                },
                toggle:function(){//切换mask的显示和隐藏
                    $("#mask").toggle();
                    $("#largeDiv").toggle();
                    //如果largeDiv的display为block
                    if($("#largeDiv").css("display")=="block"){
                        //获得mImg的src
                        var src=$("#mImg").attr("src");
                        $("#largeDiv").css(
                            "backgroundImage","url("+src+")");
                    }
                },
                changeImgs:function(e){//根据小图片更换中图片
                    //获得目标元素的src属性，保存在变量src中
                    var src=$(e.target).attr("src");
                    //查找src中最后一个.的位置i
                    //设置id为mImg的元素的src为:
                    //src从开头-i 拼上-m  拼上src从i到结尾
                    $("#mImg").attr(
                        "src",src);
                }
            }
            zoom.init();


            //分享功能
            //<i class="connect"><a href="tencent://message/?uin=${auto.QQ}&Site=sc.chinaz.com&Menu=yes">联系买家</a></i>

            window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};
            with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

            //加入购物车
            $('.detail .detailDesc ul li').on('click','.b_cart',function(e){
                e.preventDefault();
                var pid = $(this).attr('href');
                //发起异步请求
                if(!loginName==''){
                    $.ajax({
                        type: 'POST',
                        url: '../data/3_cart_add.php',
                        data: {uname:loginName,pid:pid},
                        success: function(txt, msg, xhr){
                            if(txt.msg=='该商品已添加购物车!'){
                                alert('该商品已添加购物车!');

                            } else if(txt.msg=='添加购物车成功!'){
                                alert('添加购物车成功!');
                            }
                        }
                    });
                }else{
                    $('#model-tips4').css('display','block');
                }

            });
            //收藏
            $('.detail .detailDesc ul li').on('click','.favorite',function(e){
                e.preventDefault();
                var pid = $(this).attr('href');
                if(!loginName==''){
                    //发起异步请求
                    $.ajax({
                        type: 'POST',
                        url: '../data/5_favorite_add.php',
                        data: {uname:loginName,pid:pid},
                        success: function(txt, msg, xhr){
                            if(txt.msg=='已经收藏过该商品!'){
                                alert('已经收藏过该商品!');

                            } else if(txt.msg=='收藏成功!'){
                                alert('收藏成功!');
                            }
                        }
                    });
                }else{
                    $('#model-tips4').css('display','block');
                }

            });
            //购买
            $('.detail .detailDesc ul li').on('click','#sureBuy',function(e){
                e.preventDefault();
                var pid = $(this).attr('href');
                var price = $(this).attr('class');
                if(!loginName==''){
                    //发起异步请求
                    $.ajax({
                        type: 'POST',
                        url: '../data/7_order_add.php',
                        data: {uname:loginName,pid:pid,price:price},
                        success: function(txt, msg, xhr){
                            if(txt.msg=='该订单已存在!'){
                                alert('该订单已存在!');

                            } else if(txt.msg=='订单生成!'){
                                alert('订单生成!');
                            }
                        }
                    });
                }else{
                    $('#model-tips4').css('display','block');
                }

            });
            //举报
            $('.detail .detailDesc').on('click','.report',function(e){
                e.preventDefault();
                var pid = $(this).attr('href');
                console.log("举报");
                if(!loginName==''){
                    location.href='../../index/report.html?loginName='+loginName+"&pid="+pid;
                }else{
                    $('#model-tips4').css('display','block');
                }

            });
            //查看卖家信息
            $('.detail .detailDesc').on('click','.sellerInfo',function(e){
                e.preventDefault();
                var pid = $(this).attr('href');
                console.log("查看卖家信息");
                if(!loginName==''){
                    location.href='../html/sellerInfo.html?&pid='+pid;
                }else{
                    $('#model-tips4').css('display','block');
                }


            });

        }
    });

/*
<div class="bdsharebuttonbox">
    <a href="#" class="bds_more" data-cmd="more"></a>
    <a href="#" class="bds_qzone" data-cmd="qzone"></a>
    <a href="#" class="bds_tsina" data-cmd="tsina"></a>
    <a href="#" class="bds_tqq" data-cmd="tqq"></a>
    <a href="#" class="bds_renren" data-cmd="renren"></a>
    <a href="#" class="bds_weixin" data-cmd="weixin"></a>
</div>
 */


