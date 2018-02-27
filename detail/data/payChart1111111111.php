<?php
/**
*接收客户端提交的用户名，查询出该用户所有的订单，
*以JSON格式返回给客户端
*/
header('Content-Type: application/json;charset=UTF-8');

//接收并处理客户端提交的请求数据
@$uname = $_REQUEST['uname'];
include('0_config.php');
$conn = mysqli_connect($db_url, $db_user, $db_pwd, $db_name, $db_port);

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//SQL2: 根据用户名查询用户编号
$sql = "SELECT uid FROM olddeal_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];
$output;

//SQL2: 根据用户名查询用户编号
$sql = "SELECT * FROM paychart WHERE userId='$uid'";
$result = mysqli_query($conn,$sql);
$infor = mysqli_fetch_assoc($result);

 //初始化变量
if($infor){
  $output = [
      ['label'=>'1月', 'value'=>$infor['month1']],
      ['label'=>'2月', 'value'=>$infor['month2']],
      ['label'=>'3月', 'value'=>$infor['month3']],
      ['label'=>'4月', 'value'=>$infor['month4']],
      ['label'=>'5月', 'value'=>$infor['month5']],
      ['label'=>'6月', 'value'=>$infor['month6']],
      ['label'=>'7月', 'value'=>$infor['month7']],
      ['label'=>'8月', 'value'=>$infor['month8']],
      ['label'=>'9月', 'value'=>$infor['month9']],
      ['label'=>'10月', 'value'=>$infor['month10']],
      ['label'=>'11月', 'value'=>$infor['month11']],
      ['label'=>'12月', 'value'=>$infor['month12']]
  ];


    }

echo json_encode($output);
