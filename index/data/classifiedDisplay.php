<?php
header('Content-Type:application/json');
@$classDispaly = $_REQUEST['classDispaly'];
if(empty($classDispaly))
{echo '[]';
    return;
}
$pageNum=$_REQUEST['pageNum'];
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

$sql="select count(*) from olddeal_user RIGHT JoIN pub ON  olddeal_user.uname = pub.uname where (pone LIKE '%$classDispaly%' OR pname LIKE '%$classDispaly%') AND STAUS=1";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);

$pager['recordCount']=intval($row['count(*)']);
$pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));

$count=$pager['pageSize'];
$start=($pager['pageNum']-1)*$count;

$sql="select *from olddeal_user RIGHT JoIN pub ON  olddeal_user.uname = pub.uname where (pone LIKE '%$classDispaly%' OR pname LIKE '%$classDispaly%') AND STAUS=1 limit $start,$count";;
$result=mysqli_query($conn,$sql);
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($pager);
echo $str;