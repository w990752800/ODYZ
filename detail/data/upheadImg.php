<?php
if (isset($_POST['upload'])) {
  move_uploaded_file($_FILES['upheadImg']['tmp_name'], 'photoHeader/'.time().'.jpg');
  $src='data/photoHeader/'.time().'.jpg';
   echo $src;
  $conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
  $sql = 'set names utf8';
  mysqli_query($conn,$sql);
  $uname= $_REQUEST['uname'];
  echo $uname;
  $sql = "update olddeal_user set headImg='$src' WHERE uname ='$uname'";
  $result=mysqli_query($conn,$sql);
  if($result){
        echo 'succ';
    }else{
          echo 'err';
    }
}
?>