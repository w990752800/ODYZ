<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/plain;charset=UTF-8');

//接收客户端提交的数据
@$uname = $_REQUEST['uname'];
@$currPwd = $_REQUEST['currPwd'];
@$newPwd = $_REQUEST['newPwd'];
@$confirmNewPwd = $_REQUEST['confirmNewPwd'];
if( !$uname || !$currPwd || !$newPwd || !$confirmNewPwd){ //若客户端未提交必需的数据
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

$sql= "SELECT upwd FROM oldDeal_user WHERE uid='$uid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$upwd= $row['upwd'];
 if($row&&$currPwd!=$upwd){
  echo '原密码不正确，请重新输入密码';
}else if($row&&$currPwd===$upwd&&$newPwd===$confirmNewPwd){
	$sql = "UPDATE olddeal_user SET upwd='$newPwd',corfirmupwd='$confirmNewPwd' WHERE uid='$uid'";
	mysqli_query($conn,$sql);
	echo 'ok';
}