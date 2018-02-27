<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/plain;charset=UTF-8');

//接收客户端提交的数据
@$uname = $_REQUEST['uname'];
@$pid = $_REQUEST['pid'];
@$score = $_REQUEST['score'];
@$comment = $_REQUEST['comment'];
if( !$uname || !$pid ||!$score || !$comment){ //若客户端未提交必需的数据
	echo "信息填写不完整，请重新填写";
	return;	//退出当前PHP页面的执行
}

/*********************************/

//连接数据库
include('0_config.php'); //包含指定文件的内容在当前位置
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL5：根据购物车编号和产品编号，查询是否已经购买过该产品
$sql = "SELECT orderId FROM olddeal_order_detail WHERE  productId='$pid' AND uname='$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$oid = intval($row['orderId']);
if($row){ //已经购买过该商品
	//SQL6：修改购买数量
	$orderStatus=3;
	$sql="update olddeal_order set orderStatus='$orderStatus',score='$score',comment='$comment' where oid='$oid'";
	$result = mysqli_query($conn,$sql);
 if($result){ //SQL语句执行成功
       $sql="UPDATE olddeal_user SET integral=integral+5 where uname ='$uname'";
       $result=mysqli_query($conn,$sql);
        if($result){
           echo '评论交易成功！积分+5！';
        }else{
           echo '评论交易成功!积分未增加！';
        }
    }else {  //SQL语句执行失败
           echo '评论交易失败！';
    }
 }