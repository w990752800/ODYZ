<?php
/**
*接收客户端提交的用户名，查询出该用户所有的订单，
*以JSON格式返回给客户端
*/
header('Content-Type: application/json;charset=UTF-8');

//接收并处理客户端提交的请求数据
@$uname = $_REQUEST['uname'];

$time1 = strtotime(date('Y-1-1'));
$time11 = strtotime(date('Y-2-1'));
$time2 = strtotime(date('Y-2-1'));
$time22 = strtotime(date('Y-3-1'));
$time3 = strtotime(date('Y-3-1'));
$time33 = strtotime(date('Y-4-1'));
$time4 = strtotime(date('Y-4-1'));
$time44 = strtotime(date('Y-5-1'));
$time5 = strtotime(date('Y-5-1'));
$time55 = strtotime(date('Y-6-1'));
$time6 = strtotime(date('Y-6-1'));
$time66 = strtotime(date('Y-7-1'));
$time7 = strtotime(date('Y-7-1'));
$time77 = strtotime(date('Y-8-1'));
$time8 = strtotime(date('Y-8-1'));
$time88 = strtotime(date('Y-9-1'));
$time9 = strtotime(date('Y-9-1'));
$time99 = strtotime(date('Y-10-1'));
$time10 = strtotime(date('Y-10-1'));
$time1010 = strtotime(date('Y-11-1'));
$time111 = strtotime(date('Y-11-1'));
$time1111 = strtotime(date('Y-12-1'));
$time12 = strtotime(date('Y-12-1'));
$time1212 = strtotime(date('Y-12-31'));
//对时间戳进行格式化

include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL2: 根据用户名查询用户编号
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];


//SQL2：1月
$sql = "SELECT sum(price) as total1 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time1 AND orderTime < $time11";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month1=intval($row['total1']);
//$output['1月'] = intval($row['total1']);//把字符串解析为整数

//SQL2：2月
$sql = "SELECT sum(price) as total2 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time2 AND orderTime < $time22";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month2 = intval($row['total2']);//把字符串解析为整数

//SQL2：3月
$sql = "SELECT sum(price) as total3 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time3 AND orderTime < $time33";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month3 = intval($row['total3']);//把字符串解析为整数

//SQL2：4月
$sql = "SELECT sum(price) as total4 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time4 AND orderTime < $time44";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month4 = intval($row['total4']);//把字符串解析为整数

//SQL2：5月
$sql = "SELECT sum(price) as total5 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time5 AND orderTime < $time55";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month5 = intval($row['total5']);//把字符串解析为整数

//SQL2：6月
$sql = "SELECT sum(price) as total6 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time6 AND orderTime < $time66";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month6 = intval($row['total6']);//把字符串解析为整数

//SQL2：7月
$sql = "SELECT sum(price) as total7 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time7 AND orderTime < $time77";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month7 = intval($row['total7']);//把字符串解析为整数

//SQL2：8月
$sql = "SELECT sum(price) as total8 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time8 AND orderTime < $time88";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month8 = intval($row['total8']);//把字符串解析为整数

//SQL2：9月
$sql = "SELECT sum(price) as total9 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time9 AND orderTime < $time99";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month9 = intval($row['total9']);//把字符串解析为整数

//SQL2：10月
$sql = "SELECT sum(price) as total10 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time10 AND orderTime < $time1010";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month10 = intval($row['total10']);//把字符串解析为整数

//SQL2：11月
$sql = "SELECT sum(price) as total11 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time111 AND orderTime < $time1111";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month11 = intval($row['total11']);//把字符串解析为整数

//SQL2：12月
$sql = "SELECT sum(price) as total12 FROM olddeal_order WHERE userId=$uid AND orderStatus in (2,3) AND orderTime >$time12 AND orderTime < $time1212";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$month12 = intval($row['total12']);//把字符串解析为整数

$sql="select userId from payChart where userId='$uid'";
 $result = mysqli_query($conn,$sql);
 $row = mysqli_fetch_assoc($result);
 if($row){
 $sql="update payChart set month1='$month1',month2='$month2',month3='$month3',month4='$month4',month5='$month5',month6='$month6',month7='$month7',month8='$month8',month9='$month9',month10='$month10',month11='$month11',month12='$month12' where userId='$uid'";
 $result = mysqli_query($conn,$sql);
 echo "更新成功";

 }else{
 $sql = "insert into payChart VALUES('$uid','$month1','$month2','$month3','$month4','$month5','$month6','$month7','$month8','$month9','$month10','$month11','$month12')";
   $result = mysqli_query($conn,$sql);
   echo "插入成功";
 }

