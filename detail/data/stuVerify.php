<?php
header('Content-Type: application/json;charset=UTF-8');
$uname = $_REQUEST['uname'];
$conn=mysqli_connect('localhost','root','','OldDeal');
$sql = 'set names utf8';
mysqli_query($conn,$sql);
$sql = "SELECT uid FROM olddeal_user WHERE uname ='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];
$sql ="select *from stuValidate where userId=$uid";
$result=mysqli_query($conn,$sql);
if($result){
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);
}else{
$output='';
echo json_encode($output);
}

//if($result){
//   $sql="update stuValidate set stuSchool='$school',stuCollege='$college',stuNumber='$stuId',stuName='$stuName',stuImg='$headerImg' where userId=$uid";
//   $result=mysqli_query($conn,$sql);
//   if($result){
//    $output['msg']='数据修改成功！succ';
//    echo json_encode($output);
//   }else{
//   $output['msg']='数据修改失败！2';
//   echo json_encode($output);
//   }
//
//}else{
//$sql = "insert into stuValidate values('$uid','$school','$college','$stuId','$stuName','$headerImg',1)";
// $result = mysqli_query($conn,$sql);
// if($result){
// $output['msg']='认证信息添加成功！3';
// echo json_encode($output);
// }else{
// $output['msg']='认证信息添加失败！4';
// echo json_encode($output);
// }
//}






//    if($result){}else{
//
//    }
//    $sql='select * from stuValidate where userId=$uid';
//    $result=mysqli_query($conn,$sql);
//    if($result){
//     $list = mysqli_fetch_all($result, MYSQLI_ASSOC);
//     echo json_encode($list);
//    }else{
//
//    }





