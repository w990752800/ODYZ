<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: application/json;charset=UTF-8');

//接收客户端提交的数据
@$uname = $_REQUEST['uname'];
if( !$uname){ //若客户端未提交必需的数据
	echo "没有获取到当前用户名！";
	return;	//退出当前PHP页面的执行
}
$output = [];

/*********************************/

//连接数据库
include('0_config.php'); //包含指定文件的内容在当前位置
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$list;
//SQL2：根据uname查询uid
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$uid = intval($row['uid']);


$sql2= "SELECT * FROM oldDeal_user WHERE uid='$uid'";
$result = mysqli_query($conn, $sql2);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($list);
