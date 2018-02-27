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
//sql2 ��ȡ�ܼ�¼�� ������ҳ��
$sql="select count(*)from soldOrder where status = 2 AND sname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);

$pager['recordCount']=intval($row['count(*)']);//���ַ�������Ϊ����
$pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));

$count=$pager['pageSize'];
$start=($pager['pageNum']-1)*$count;
$sql="select * from soldOrder where status = 2 AND  sname='$uname' limit $start,$count";
$result=mysqli_query($conn,$sql);
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($pager);
echo $str;