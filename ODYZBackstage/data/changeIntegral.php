<?php
header('Content-Type: text/plain;charset=UTF-8');

//接收客户端提交的数据
@$mname = $_REQUEST['mname'];
@$inId = $_REQUEST['inId'];
@$behavior = $_REQUEST['behavior'];
@$step = $_REQUEST['step'];
if( !$mname || !$inId || !$behavior || !$step){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}


/*********************************/

//连接数据库
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//更新积分规则
$sql = "UPDATE integral SET behavior='$behavior',step='$step' WHERE inId='$inId'";
$result=mysqli_query($conn,$sql);
if($result){
	echo '积分规则修改成功！';
}else{
	echo '积分规则修改失败，请稍后重试！';
}
