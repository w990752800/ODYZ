<?php
header('Content-Type:application/json');
@$mname=$_REQUEST['mname'];
@$pageNum=$_REQUEST['pageNum'];
@$kw = $_REQUEST['kw'];
if( !$mname || !$pageNum || !$kw){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}
$pager=[
'recordCount'=>0,
'pageSize'=>8,
'pageCount'=>0,
'pageNum'=>intval($pageNum),
'data'=>null
];
$conn=mysqli_connect('localhost','root','','OldDeal');
$sql="set names utf8";
mysqli_query($conn,$sql);
//sql2 获取总记录数 计算总页数
$sql="select count(*) from stuvalidate where stuSchool LIKE '%$kw%' OR stuCollege LIKE '%$kw%' OR stuNumber LIKE '%$kw%' OR stuName LIKE '%$kw%' AND verifyStatus=2";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$pager['recordCount']=intval($row['count(*)']);//把字符串解析为整数
$pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));
//var_dump($pager['pageCount']);
//sql3 获取当前指定页中的数据
$count=$pager['pageSize'];
$start=($pager['pageNum']-1)*$count;
$sql="select *from stuvalidate where stuSchool LIKE '%$kw%' OR stuCollege LIKE '%$kw%' OR stuNumber LIKE '%$kw%' OR stuName LIKE '%$kw%' AND verifyStatus=2 limit $start,$count";
$result=mysqli_query($conn,$sql);
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($pager);
echo $str;