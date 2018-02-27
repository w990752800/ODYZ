<?php
header("Content-Type: application/json;charset=UTF-8");
$uname=$_REQUEST['uname'];
$pageNum=$_REQUEST['pageNum'];
$pager=[
'recordCount'=>0,
'pageSize'=>4,
'pageCount'=>0,
'pageNum'=>intval($pageNum),
'data'=>null
];
$conn=mysqli_connect('localhost','root','','OldDeal');
$sql="set names utf8";
mysqli_query($conn,$sql);
//sql2 获取总记录数 计算总页数
$sql="select count(*)from pub where uname='$uname' AND STAUS=0";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$result=mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$pager['recordCount']=intval($row['count(*)']);//把字符串解析为整数
$pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));
//var_dump($pager['pageCount']);
//sql3 获取当前指定页中的数据
$count=$pager['pageSize'];
$start=($pager['pageNum']-1)*$count;
$sql="select * from pub where uname='$uname' AND STAUS=0 limit $start,$count";
$result=mysqli_query($conn,$sql);
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($pager);
echo $str;