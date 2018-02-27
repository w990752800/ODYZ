<?php
 header("Content-Type: application/text;charset=UTF-8");
 @$spid=$_REQUEST['spid'];
 @$sdate= $_REQUEST['sdate'];
 $uname= $_REQUEST['uname'];
 $conn=mysqli_connect('localhost','root','','OldDeal');
 $sql="set names utf8";
 mysqli_query($conn,$sql);

 $sql="UPDATE soldOrder SET status = 3 where spid = $spid";
 $result=mysqli_query($conn,$sql);
 if($result){
  $sql="UPDATE soldOrder SET sdate = '$sdate' where spid = $spid";
  $result=mysqli_query($conn,$sql);
  if($result){
       $sql="UPDATE olddeal_user SET integral=integral+5 where uname ='$uname'";
       $result=mysqli_query($conn,$sql);
      if($result){
        echo '订单已确认！积分+5！';
     }else{
       echo '订单已确认!积分未增加！';
     }
 }else{
     echo '时间更新失败！';
 }
 }else{
     echo '确认失败！';
}

