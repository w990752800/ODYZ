<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/plain;charset=UTF-8');

//接收客户端提交的数据
@$uname = $_REQUEST['uname'];
@$pid = $_REQUEST['pid'];
if( !$uname || !$pid){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}

/*********************************/

//连接数据库
include('0_config.php'); //包含指定文件的内容在当前位置
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL2：根据uname查询uid
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$uid = intval($row['uid']);
$output['uid'] = $uid;

//SQL3: 根据用户编号查询购物车编号
$sql = "SELECT cid FROM olddeal_cart WHERE userId='$uid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if($row){  //对应用户已有购物车
	$cid = $row['cid'];
}else {	//对用用户没有购物车
	//SQL4：购物车表中插入一行记录
	$sql = "INSERT INTO olddeal_cart VALUES(NULL, '$uid')";
	$result = mysqli_query($conn,$sql);
	$cid = mysqli_insert_id($conn);
}
$cid = intval($cid);
$output['cid'] = $cid;

//SQL5：根据购物车编号和产品编号，查询是否已经购买过该产品
$sql = "SELECT * FROM olddeal_cart_detail WHERE cartId='$cid' AND productId='$pid'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){ //已经购买过该商品
	//SQL6：修改购买数量
	$sql="delete from olddeal_cart_detail where productId='$pid'";
	mysqli_query($conn,$sql);
   echo "删除成功";
}else{
echo "删除失败";
}