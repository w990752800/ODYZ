<?php
error_reporting(0);
header("Content-Type: application/json;charset=UTF-8");
$pageNum=$_REQUEST['pageNum'];
$uname=$_REQUEST['uname'];
$pager=[
'recordCount'=>0,
'pageSize'=>10,
'pageCount'=>0,
'pageNum'=>intval($pageNum),
'data'=>null
];
$conn=mysqli_connect('localhost','root','','OldDeal');
$sql="set names utf8";
mysqli_query($conn,$sql);
//根据时间自动下架
//$date=date('Y-m-d h:m:s');
//echo $date;
//
//$sql="select * from pub where RETAINTIME < $date";
//$result = mysqli_query($conn,$sql);
//$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
//echo json_encode($list);
//if(mysqli_affected_rows()){
//    echo 'succ';
//}else{
//    echo'err';
//}

if(!$uname || $uname !='undefined'){
    //根据用户名查找用户id
    $sql = "SELECT uid FROM olddeal_user WHERE uname ='$uname'";
    $result = mysqli_query($conn,$sql);
    $uid = mysqli_fetch_assoc($result)['uid'];
//sql2 获取总记录数 计算总页数
    $sql="select count(*)from  olddeal_user RIGHT JoIN pub ON olddeal_user.uid = pub.userId where (STAUS=1 AND userId!='$uid')";
    $result=mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    $pager['recordCount']=intval($row['count(*)']);//把字符串解析为整数
    $pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));

//sql3 获取当前指定页中的数据
    $count=$pager['pageSize'];
    $start=($pager['pageNum']-1)*$count;
    $sql="select *from olddeal_user RIGHT JoIN pub ON olddeal_user.uid = pub.userId where (STAUS=1 AND userId!='$uid')limit $start,$count";
    $result=mysqli_query($conn,$sql);
    $pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $str=json_encode($pager);
    echo $str;
}else{
    //sql2 获取总记录数 计算总页数
    $sql="select count(*)from  olddeal_user RIGHT JoIN pub ON olddeal_user.uid = pub.userId where STAUS=1";
    $result=mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    $pager['recordCount']=intval($row['count(*)']);//把字符串解析为整数
    $pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));
//sql3 获取当前指定页中的数据
    $count=$pager['pageSize'];
    $start=($pager['pageNum']-1)*$count;
    $sql="select *from olddeal_user RIGHT JoIN pub ON olddeal_user.uid = pub.userId where STAUS=1 limit $start,$count";
    $result=mysqli_query($conn,$sql);
    $pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $str=json_encode($pager);
    echo $str;
}













