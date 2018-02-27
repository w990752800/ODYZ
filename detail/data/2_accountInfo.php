<?php
header('Content-Type: text/plain;charset=UTF-8');

//接收客户端提交的数据
@$uname = $_REQUEST['uname'];
@$QQ = $_REQUEST['QQ'];
@$safe = $_REQUEST['safe'];
@$answer = $_REQUEST['answer'];
if( !$uname || !$QQ || !$safe || !$answer){ //若客户端未提交必需的数据
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

//SQL2：根据uname查询uid
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$uid = intval($row['uid']);

$sql = "UPDATE olddeal_user SET QQ='$QQ',safe='$safe',answer='$answer' WHERE uid='$uid'";
$result=mysqli_query($conn,$sql);
	echo 'ok';
