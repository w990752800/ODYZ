<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: application/json;charset=UTF-8');

//接收客户端提交的数据
@$pid = $_REQUEST['pid'];
if( !$pid){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}
$total = [];

/*********************************/

//连接数据库
include('0_config.php'); //包含指定文件的内容在当前位置
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL2：根据uname查询uid
$sql = "SELECT UNAME FROM pub WHERE pid='$pid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$uname = $row['UNAME'];

//SQL2：根据uname查询发布商品数量
$sql = "SELECT COUNT(*) FROM pub WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$total['publish'] = intval($row['COUNT(*)']);

//SQL3：根据uname查询商品数求购量
$sql = "SELECT COUNT(*) FROM wantBuy WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$total['wantBuy'] = intval($row['COUNT(*)']);

//SQL4：根据uname查询uid
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];

$sql = "SELECT COUNT(*) FROM olddeal_order WHERE userId=$uid AND orderStatus=1";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$total['beingTraded'] = intval($row['COUNT(*)']);

$sql = "SELECT COUNT(*) FROM olddeal_order WHERE userId=$uid AND orderStatus=2";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$total['traded'] = intval($row['COUNT(*)']);

$sql = "SELECT COUNT(*) FROM olddeal_order WHERE userId=$uid AND orderStatus=3";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$total['comment'] = intval($row['COUNT(*)']);
$total['order'] = $total['beingTraded']+$total['traded']+$total['comment'];
echo json_encode($total);
