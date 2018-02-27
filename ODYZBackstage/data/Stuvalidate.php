<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/plain;charset=UTF-8');

//接收客户端提交的数据
$mname = $_REQUEST['mname'];
$userId = $_REQUEST['userId'];
$stuNumber = $_REQUEST['stuNumber'];
//连接数据库
if( !$mname || !$userId || !$stuNumber){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
//SQL2：根据uname查询uid
$sql = "select verifySchool,verifyCollege,stuName from stuverify where stuNumber='$stuNumber'";
$result = mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);

$verifySchool=$row['verifySchool'];
$verifyCollege=$row['verifyCollege'];
$stuName=$row['stuName'];

if($row){
	$sql = "select verifyStatus from stuvalidate where stuNumber='$stuNumber' AND stuSchool ='$verifySchool' AND stuCollege ='$verifyCollege' AND stuName ='$stuName'";
   $result = mysqli_query($conn,$sql);
   $row=mysqli_fetch_assoc($result);
 	 if($row){
		 $sql = "update stuvalidate set verifyStatus=0 where userId='$userId'";
		 $result = mysqli_query($conn,$sql);
			 echo "认证通过";
	 }else{
 	 	$sql = "update stuvalidate set verifyStatus=2 where userId='$userId'";
      $result = mysqli_query($conn,$sql);
      			 echo "认证未通过";
 	 }
}else{
	 $sql = "update stuvalidate set verifyStatus=2 where userId='$userId'";
          $result = mysqli_query($conn,$sql);
          			 echo "认证未通过";
}