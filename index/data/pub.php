<?php
error_reporting(0);
header('Content-Type:application/text;charset=UTF-8');
$uname= $_REQUEST['uname'];
$pname = $_REQUEST['pname'];
$pone = $_REQUEST['pone'];
$ptwo = $_REQUEST['ptwo'];
$price = $_REQUEST['price'];
$newold = $_REQUEST['newold'];
$pubtime = $_REQUEST['pubtime'];
$retaintime = $_REQUEST['retaintime'];
$pdesc = $_REQUEST['pdesc'];
$pres = $_REQUEST['pres'];
$pic1 = $_REQUEST['pic1'];
$pic2 = $_REQUEST['pic2'];
$pic3 = $_REQUEST['pic3'];
$pic4 = $_REQUEST['pic4'];
$status=1;
if( !$uname||!$pname||!$price||!$pic1||!$pic2||!$pic3||!$pic4){ //若客户端未提交必需的数据
	echo "商品信息不完整，发布失败！";
	return;	//退出当前PHP页面的执行
}
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
$sql = 'set names utf8';
mysqli_query($conn,$sql);
$sql = "SELECT uid FROM olddeal_user WHERE uname ='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];

$sql = "SELECT memberLevel FROM olddeal_user WHERE uname ='$uname'";
$result = mysqli_query($conn,$sql);
$memberLevel = mysqli_fetch_assoc($result)['memberLevel'];
 if($memberLevel==1){
     $sql = "SELECT reason FROM report WHERE tipName ='$uname'";
     $result = mysqli_query($conn,$sql);
     $reason = mysqli_fetch_assoc($result)['reason'];
 	echo '由于“'.$reason.'”您的账号已被禁止发布！请解禁后再发布！';
 }else{
 	$sql = "insert into pub values(null,$uid,'$uname','$pname','$pone','$ptwo','$price','$newold','$pubtime','$retaintime','$status','$pdesc','$pres','$pic1','$pic2','$pic3','$pic4','','')";
    $result = mysqli_query($conn,$sql);
    if($result){ //SQL语句执行成功
    	$sql="UPDATE olddeal_user SET integral=integral+5 where uname ='$uname'";
        $result=mysqli_query($conn,$sql);
        if($result){
        echo '发布成功！积分+5！';
        }else{
        echo '发布成功!积分未增加！';
        }
    }else {  //SQL语句执行失败
    echo '发布失败！';
    }
 }

