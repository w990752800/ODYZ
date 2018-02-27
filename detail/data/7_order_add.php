<?php
header('Content-Type: application/json;charset=UTF-8');

//接收客户端提交的数据
@$uname = $_REQUEST['uname'];
@$pid = $_REQUEST['pid'];
@$price = $_REQUEST['price'];
$orderTime = time();   //服务器端当前系统时间
$orderStatus = 1;    //刚生成的订单状态都是'等待付款'
$comment="";
if( !$uname || !$pid || !$price){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT userId FROM pub WHERE PID='$pid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$ownerId = intval($row['userId']);
//SQL2: 根据用户名查询用户编号
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$output = [];
$uid = intval($row['uid']);
$output['uid'] = $uid;
$sql = "SELECT orderId FROM olddeal_order_detail WHERE productId='$pid'AND uname='$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$orderId = intval($row['orderId']);

if($row){
   $sql = "SELECT oid FROM olddeal_order WHERE oid='$orderId'";
   $result = mysqli_query($conn,$sql);
   $row = mysqli_fetch_assoc($result);
   if($row){
      $output['msg'] = '该订单已存在!';
      echo json_encode($output);
   }else{
      $sql="delete from olddeal_order_detail where orderId='$orderId'";
      mysqli_query($conn,$sql);
      $output['delete'] = '删除成功';
      $row = mysqli_fetch_assoc($result);
      //echo json_encode($output);

      $sql = "UPDATE olddeal_order_detail";
      mysqli_query($conn,$sql);
      $output['update'] = '更新成功';
      //echo json_encode($output);
      //SQL3: 向订单表插入一行记录，得到自增的订单编号
     $sql = "INSERT INTO olddeal_order VALUES(NULL,'$uid','$orderTime','$price','$orderStatus','$ownerId','$score','$comment')";
     $result = mysqli_query($conn,$sql);
     $oid = mysqli_insert_id($conn);

     $sql = "INSERT INTO olddeal_order_detail VALUES(NULL,'$oid','$pid','$uname')";
     mysqli_query($conn,$sql);
      $output['msg'] = '订单生成!';
     	echo json_encode($output);
   }

}else{
   //SQL3: 向订单表插入一行记录，得到自增的订单编号
$sql = "INSERT INTO olddeal_order VALUES(NULL,'$uid','$orderTime','$price','$orderStatus','$ownerId',null,'$comment')";
   $result = mysqli_query($conn,$sql);
   $oid = mysqli_insert_id($conn);


   $sql = "INSERT INTO olddeal_order_detail VALUES(NULL,'$oid','$pid','$uname')";
	mysqli_query($conn,$sql);
	  $output['msg'] = '订单生成!';
	echo json_encode($output);
}

