<?php
if (isset($_POST['upload'])) {
  move_uploaded_file($_FILES['upfile']['tmp_name'], 'photoHeader/'.time().'.jpg');
  echo 'data/photoHeader/'.time().'.jpg';
}
?>
