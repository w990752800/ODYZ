<?php
/**
*接收客户端提交的用户名，查询出该用户所有的订单，
*以JSON格式返回给客户端
*/
header('Content-Type: application/json;charset=UTF-8');

//接收并处理客户端提交的请求数据
@$uname = $_REQUEST['uname'];
@$pageNum=$_REQUEST['pageNum'];
$pager=[
'recordCount'=>0,
'pageSize'=>4,
'pageCount'=>0,
'pageNum'=>intval($pageNum),
'data'=>null
];

include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL2: 根据用户名查询用户编号
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];


//SQL2：获取总记录数，并计算总页数
$sql = "SELECT COUNT(*) FROM olddeal_order WHERE userId=$uid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$pager['recordCount'] = intval($row['COUNT(*)']);//把字符串解析为整数
$pager['pageCount'] = ceil(($pager['recordCount'])/($pager['pageSize']));  //计算总页数

//SQL3：获取当前指定页中的记录
$start = ($pager['pageNum']-1)*$pager['pageSize']; //从哪一行开始读取记录
$count = $pager['pageSize']; //读取多少行
/*
$oid = $pager['data']['oid'];
$sql = "SELECT pid,pname,uname,pic1,price FROM pub WHERE pid IN (SELECT productId FROM olddeal_order_detail WHERE orderId=$oid) LIMIT $start,$count";
$result = mysqli_query($conn, $sql);

//读取所有的产品记录
$pager['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);


//把分页对象编码为JSON字符串并输出
echo json_encode($pager);

*/


//SQL3: 根据用户编号查询其对应的订单
$sql = "SELECT * FROM olddeal_order WHERE userId=$uid  LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
$pager['data'] = mysqli_fetch_all($result,MYSQLI_ASSOC);

//遍历每个订单对象，添加一个新的属性:productList
foreach($pager['data'] as $i=>$o){
  //$o['productList'] = []; //订单的产品列表是个数组
  //$o是每个元素的副本，不是元素本身
  //$orderList[$i]['productList'] = [];
  //根据当前订单编号查询出它所购买的产品
  $oid = $pager['data'][$i]['oid'];
  $sql = "SELECT pid,pname,uname,pic1,price FROM pub WHERE pid IN (SELECT productId  FROM olddeal_order_detail WHERE orderId=$oid);
  $result = mysqli_query($conn,$sql);
  $plist = mysqli_fetch_all($result,MYSQLI_ASSOC);//查得订单对应的产品列表
  $pager['data'][$i]['productList'] = $plist;
}
echo $start;
echo $count;
//把PHP数组编码为JSON字符串，输出给客户端
echo json_encode($pager);
