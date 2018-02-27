<?php
header("Content-Type: application/text;charset=UTF-8");
$pid=$_REQUEST['pid'];
$conn=mysqli_connect('localhost','root','','OldDeal');
$sql="set names utf8";
mysqli_query($conn,$sql);
$sql="UPDATE pub SET STAUS=1 where PID = $pid";
$result=mysqli_query($conn,$sql);
if($result){
echo 'succ';
}else{
echo 'err';
}