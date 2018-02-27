<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: application/json;charset=UTF-8');

//接收客户端提交的数据
@$pid = $_REQUEST['pid'];
if( !$pid){ //若客户端未提交必需的数据
	echo "{}";
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

//SQL2：根据uname查询uid
$sql = "SELECT userId FROM pub WHERE PID='$pid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$uid = intval($row['userId']);


$sql2= "SELECT uname,upwd,corfirmupwd,QQ,safe,answer,integral,memberLevel,headImg FROM oldDeal_user WHERE uid='$uid'";
$result = mysqli_query($conn, $sql2);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($list);
