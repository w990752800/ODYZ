<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"fid":10,"pid":10}**/
header('Content-Type: application/json;charset=UTF-8');

//接收客户端提交的数据
@$uname = $_REQUEST['uname'];
@$pid = $_REQUEST['pid'];
if( !$uname || !$pid){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}

/***将要向客户端输出对象****/
$ouput = [
	'msg'=>null,
	'uid'=>0,
	'fid'=>0,
	'pid'=>intval($pid)
];
/*********************************/

//连接数据库
include('0_config.php'); //包含指定文件的内容在当前位置
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL2：根据uname查询uid
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$uid = intval($row['uid']);
$output['uid'] = $uid;

//SQL3: 根据用户编号查询收藏夹编号
$sql = "SELECT fid FROM olddeal_favorite WHERE userId='$uid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if($row){  //对应用户已有收藏夹
	$fid = $row['fid'];
}else {	//对用用户没有收藏夹
	//SQL4：收藏夹表中插入一行记录
	$sql = "INSERT INTO olddeal_favorite VALUES(NULL, '$uid')";
	$result = mysqli_query($conn,$sql);
	$fid = mysqli_insert_id($conn);
}
$fid = intval($fid);
$output['fid'] = $fid;

//SQL5：根据收藏夹编号和产品编号，查询是否已经购买过该产品
$sql = "SELECT * FROM olddeal_favorite_detail WHERE favoriteId='$fid' AND productId='$pid'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){ //已经收藏过该商品
	$output['msg'] = '已经收藏过该商品!';
   	echo json_encode($output);

}else {  //没有购买过该商品
	//SQL7: 插入一行购买记录
	$sql = "INSERT INTO olddeal_favorite_detail VALUES(NULL,'$fid','$pid')";
	mysqli_query($conn,$sql);
	//把对象编码为JSON字符串并输出
	$output['msg'] = '收藏成功!';
   echo json_encode($output);
}