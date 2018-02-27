<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/text;charset=UTF-8');

//接收客户端提交的数据
@$mname = $_REQUEST['mname'];
@$behavior = $_REQUEST['behavior'];
@$step = $_REQUEST['step'];
if( !$mname || !$behavior || !$step){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}

$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
//SQL2：根据uname查询uid
$sql = "INSERT INTO integral VALUES(NULL,'$behavior','$step')";
$result = mysqli_query($conn,$sql);
if($result){
   echo "添加积分规则成功！";
}else{
echo "添加积分规则失败，请稍后重试！";
}