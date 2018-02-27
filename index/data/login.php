<?php
/**接收客户端提交的用户名和密码，验证是否正确，向客户端输出ok或err**/
header('Content-Type: text/plain');
$uname = $_REQUEST['uname'];
$upwd = $_REQUEST['upwd'];

if(empty($uname)){
	echo "用户名不能为空!";
	return;
}else if(empty($upwd)){
    echo "密码不能为空!";
    return;
}
$conn = mysqli_connect('localhost','root','','olddeal');
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

$sql= "SELECT *FROM oldDeal_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if(!$row){
 echo '用户名不存在！';
 return;
}else{
$sql2= "SELECT upwd FROM oldDeal_user WHERE uname ='$uname'";
$result2 = mysqli_query($conn, $sql2);
$row2 = mysqli_fetch_assoc($result2);
$upwd1= $row2['upwd'];
if($upwd1!=$upwd){
echo '密码不正确！';
return;
}else{
$sql = "SELECT memberLevel FROM olddeal_user WHERE uname ='$uname'";
$result = mysqli_query($conn,$sql);
$memberLevel = mysqli_fetch_assoc($result)['memberLevel'];
if($memberLevel==0){
$sql = "SELECT reason FROM report WHERE tipName ='$uname'";
$result = mysqli_query($conn,$sql);
$reason = mysqli_fetch_assoc($result)['reason'];
echo '由于“'.$reason.'”您的帐号已被封，请解封后登陆！';
}else{
echo 'ok';
}

}
}



