<?php
 header("Content-Type: application/text;charset=UTF-8");
 @$spid=$_REQUEST['spid'];
 @$sdate=$_REQUEST['sdate'];
 $conn=mysqli_connect('localhost','root','','OldDeal');
 $sql="set names utf8";
 mysqli_query($conn,$sql);
 $sql="UPDATE soldOrder SET status = -1,sdate='$sdate' where spid = $spid";
 $result=mysqli_query($conn,$sql);
   if($result){
        echo 'succ';
   }else{
    echo 'err';
   }