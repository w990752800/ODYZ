<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/json;charset=UTF-8');
//接收客户端提交的数据
@$uname = $_REQUEST['uname'];
@$productId = $_REQUEST['productId'];
if( !$uname || !$productId){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}
/*********************************/
//连接数据库
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
//SQL5：根据购物车编号和产品编号，查询是否已经购买过该产品
$sql = "SELECT * FROM pub WHERE  PID='$productId' AND uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
echo json_encode($row);
