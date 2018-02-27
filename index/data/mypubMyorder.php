<?php
header('Content-Type: application/json;charset=UTF-8');
//接收并处理客户端提交的请求数据
@$uname = $_REQUEST['uname'];
$pageNum=$_REQUEST['pageNum'];
$conn = mysqli_connect('localhost','root', '', 'olddeal');
//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
//SQL2: 根据用户名查询用户编号
$sql = "SELECT uid FROM olddeal_user WHERE uname ='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];
//根据用户编号查询olddeal_order中的订单编号
$sql = "SELECT oid FROM olddeal_order WHERE ownerId='$uid' AND orderStatus !=1";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result);
foreach($row as $k=>$oid){
    foreach($oid as $value){
    $sql = "SELECT productId FROM olddeal_order_detail WHERE orderId = $value";
    $result = mysqli_query($conn,$sql);
    $row2 = mysqli_fetch_all($result);

    $sql = "SELECT uname FROM olddeal_order_detail WHERE orderId = $value";
    $result = mysqli_query($conn,$sql);
    $row5 = mysqli_fetch_assoc($result);
    $buyPerson = $row5['uname'];
    $status=1;
   $sql = "SELECT orderTime FROM olddeal_order WHERE oid = $value";
       $result = mysqli_query($conn,$sql);
       $row8 = mysqli_fetch_assoc($result);
       $sdate = $row8['orderTime'];
    foreach($row2 as $k2){
        foreach ($k2 as $pid2){
          $sql = "SELECT pname,price,pic1 FROM pub WHERE pid = $pid2";
          $result = mysqli_query($conn,$sql);
          $row3 = mysqli_fetch_assoc($result);
          $pname = $row3['pname'];
          $price = $row3['price'];
          $pic1 =$row3['pic1'];
          $sql = "SELECT * FROM soldOrder WHERE soid = $value";
          $result = mysqli_query($conn,$sql);
          $row6 = mysqli_fetch_assoc($result);
          if(!$row6){
           $sql = "INSERT INTO soldOrder VALUES(NULL,'$value','$pname','$pid2','$pic1','$price','$sdate','$uname','$buyPerson','$status')";
                   $result = mysqli_query($conn,$sql);
          }
        }
    }
    }
}
$pager=[
'recordCount'=>0,
'pageSize'=>4,
'pageCount'=>0,
'pageNum'=>intval($pageNum),
'data'=>null
];
$sql="select count(*)from soldOrder where sname='$uname' AND status = 1 ";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$pager['recordCount']=intval($row['count(*)']);//把字符串解析为整数
$pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));
$count=$pager['pageSize'];
$start=($pager['pageNum']-1)*$count;
$sql="select *from soldOrder where  sname='$uname' AND status = 1 limit $start,$count";
$result=mysqli_query($conn,$sql);
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($pager);
echo $str;


