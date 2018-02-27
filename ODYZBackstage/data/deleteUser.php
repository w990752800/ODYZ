<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/text;charset=UTF-8');

//接收客户端提交的数据
$mname = $_REQUEST['mname'];
$uname = $_REQUEST['uname'];
//连接数据库
if( !$mname || !$uname){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
//SQL2：根据uname查询uid
$sql = "update olddeal_user set memberLevel= 0,integral=integral-20 where uname='$uname'";
$result = mysqli_query($conn,$sql);
if($result){
   echo "该用户封号成功！积分-20";
   $sql = "select integral from olddeal_user where uname='$uname'";
      $result = mysqli_query($conn, $sql);
      $row=mysqli_fetch_assoc($result);
     $integral = $row['integral'];
     if($integral<0){
     	$integral=0;
    	$sql = "update olddeal_user set integral='$integral' where uname='$uname'";
       $result = mysqli_query($conn,$sql);
     }
}else{
echo "该用户封号失败！";
}