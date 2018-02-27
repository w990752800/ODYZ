<?php
error_reporting(0);
header('Content-Type:application/text;charset=UTF-8');
$productId= $_REQUEST['productId'];
$pname = $_REQUEST['pname'];
$pone = $_REQUEST['pone'];
$ptwo = $_REQUEST['ptwo'];
$price = $_REQUEST['price'];
$newold = $_REQUEST['newold'];
$pdesc = $_REQUEST['pdesc'];
$pres = $_REQUEST['pres'];
$pic1 = $_REQUEST['pic1'];
$pic2 = $_REQUEST['pic2'];
$pic3 = $_REQUEST['pic3'];
$pic4 = $_REQUEST['pic4'];
if( !$pname||!$price||!$pic1||!$pic2||!$pic3||!$pic4||!$newold ||!$pone ||!$ptwo ||!$pdesc ||!$pres){ //���ͻ���δ�ύ���������
	echo "修改失败，信息不完整！";
	return;	//�˳���ǰPHPҳ���ִ��
}
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
$sql = 'set names utf8';
mysqli_query($conn,$sql);

$sql="update pub set PNAME='$pname',PONE='$pone',PTWO='$ptwo',PRICE='$price',NEWOLD='$newold',PDESC='$pdesc',PRES='$pres',PIC1='$pic1',PIC2='$pic2',PIC3='$pic3',PIC4='$pic4'where PID= '$productId'";
$result=mysqli_query($conn,$sql);
if($result){
echo '修改成功！';
}else{
echo '修改失败！';
}



