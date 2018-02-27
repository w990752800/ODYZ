<?php
if (isset($_POST['upload'])) {
  move_uploaded_file($_FILES['upfile3']['tmp_name'], 'pubImg/'.time().'.jpg');
  echo 'data/pubImg/'.time().'.jpg';
}
?>