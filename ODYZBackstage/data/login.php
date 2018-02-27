<?php
/**接收客户端提交的用户名和密码，验证是否正确，向客户端输出ok或err**/
header('Content-Type: text/plain');
@$mname = $_REQUEST['uname'];
@$mpwd = $_REQUEST['mpwd'];
if(empty($mname)){
	echo "用户名不能为空";
	return;
}else if(empty($mpwd)){
    echo "密码不能为空";
    return;
}
$conn = mysqli_connect('localhost','root','','olddeal');
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql= "SELECT mid FROM manager WHERE mname='$mname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$mid=intval($row['mid']);
$sql2= "SELECT mpwd FROM manager WHERE mid='$mid'";
$result2 = mysqli_query($conn, $sql2);
$row2 = mysqli_fetch_assoc($result2);
$mpwd1= $row2['mpwd'];
if($result===false){
echo 'sqlerr';
}else if(!$row){
  echo '用户名不存在';
}else if($row&&$mpwd!=$mpwd1){
  echo '密码不正确，请重新输入密码';
}else if($row&&$mpwd===$mpwd1){
	echo 'ok';
}
