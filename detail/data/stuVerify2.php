<?php
error_reporting(0);
header('Content-Type: application/json;charset=UTF-8');
$uname = $_REQUEST['uname'];
$school = $_REQUEST['school'];
$college = $_REQUEST['college'];
$stuId = $_REQUEST['stuId'];
$stuName = $_REQUEST['stuName'];
$headerImg = $_REQUEST['headerImg'];

$output=[];
$conn=mysqli_connect('localhost','root','','OldDeal');
$sql = 'set names utf8';
mysqli_query($conn,$sql);

$sql = "SELECT uid FROM olddeal_user WHERE uname ='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];
$sql ="select *from stuValidate where userId=$uid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){
if( !$uname||!$school||!$college||!$stuId||!$headerImg||!$stuName){ //若客户端未提交必需的数据
	$output['msg']='更新信息不完整，更新失败！';
            echo json_encode($output);
	return;	//退出当前PHP页面的执行
}else{
 $sql="update stuValidate set stuSchool='$school',stuCollege='$college',stuNumber='$stuId',stuName='$stuName',stuImg='$headerImg' where userId=$uid";
       $result=mysqli_query($conn,$sql);
          if($result){
          $output['msg']='认证信息更新成功';
             echo json_encode($output);
          }else{
          $output['msg']='认证信息更改失败！';
          echo json_encode($output);
          }
}


}else{
if( !$uname||!$school||!$college||!$stuId||!$headerImg||!$stuName){ //若客户端未提交必需的数据
	$output['msg']='认证信息不完整，提交失败！';
            echo json_encode($output);
	return;	//退出当前PHP页面的执行
}else{
 $sql = "insert into stuValidate values(null,'$uid','$school','$college','$stuId','$stuName','$headerImg',1)";
     $result = mysqli_query($conn,$sql);
     if($result){
      $output['msg']='认证信息提交成功！';
      echo json_encode($output);
     }else{

       $output['msg']='认证信息提交失败！';
        echo json_encode($output);
     }
}
}










