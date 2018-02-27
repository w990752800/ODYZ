<?php
 header("Content-Type: application/text;charset=UTF-8");
 $pid=$_REQUEST['pid'];
  $conn=mysqli_connect('localhost','root','','OldDeal');
  $sql="set names utf8";
  mysqli_query($conn,$sql);
 $output=[];
 mysqli_query($conn,$sql);
 $sql="UPDATE pub SET STAUS=0 where PID = $pid";
 $result=mysqli_query($conn,$sql);
  if($result){
  $sql="UPDATE soldOrder SET status = 2 where spid = $pid";
    $result=mysqli_query($conn,$sql);
    if($result){
         $output['mgs']= '接单成功！商品已下架succ';
         echo json_encode($output);
     }else{
        $output['mgs']='接单成功下架失败err!';
        echo json_encode($output);
    }
  }else{
  $output['mgs']='无语err!';
    echo json_encode($output);
  }





