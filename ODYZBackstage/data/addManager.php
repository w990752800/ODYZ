<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/text;charset=UTF-8');

//接收客户端提交的数据
@$mname = $_REQUEST['mname'];
@$managerName = $_REQUEST['managerName'];
@$managerPwd = $_REQUEST['managerPwd'];
@$rootLevel = 1;
if( !$mname || !$managerName || !$managerPwd || !$rootLevel){ //若客户端未提交必需的数据
	echo "信息填写不完整，请重新输入";
	return;	//退出当前PHP页面的执行
}

$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
//SQL2：根据uname查询uid
$sql="select mname from manager where mname='$managerName'";
$result = mysqli_query($conn, $sql);
$row=mysqli_fetch_assoc($result);
if($row){
	echo "该用户名已存在，请重新输入";
}else{
	$sql = "INSERT INTO manager VALUES(NULL,'$managerName','$managerPwd','$rootLevel')";
   $result = mysqli_query($conn,$sql);
   if($result){
      echo "添加积管理员成功！";
   }else{
   echo "添加管理员失败，请稍后重试！";
   }
}
