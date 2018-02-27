<?php
header('Content-Type:application/json');
@$kw = $_REQUEST['kw'];
if(empty($kw))
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

//$sql="select count(*) from pub where STAUS=1  AND  (poneLIKE '%$kw%' OR pname LIKE '%$kw%')";
$sql="select count(*) from olddeal_user RIGHT JoIN pub ON  olddeal_user.uname = pub.uname where (pone LIKE '%$kw%' OR pname LIKE '%$kw%') AND STAUS=1";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);

$pager['recordCount']=intval($row['count(*)']);
$pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));
//var_dump($pager['pageCount']);

$count=$pager['pageSize'];
$start=($pager['pageNum']-1)*$count;
//$sql="select *from pub where STAUS !=0  AND  (pone LIKE '%$kw%' OR pname LIKE '%$kw%') limit $start,$count";
$sql="select *from olddeal_user RIGHT JoIN pub ON  olddeal_user.uname = pub.uname where (pone LIKE '%$kw%' OR pname LIKE '%$kw%') AND STAUS=1 limit $start,$count";
$result=mysqli_query($conn,$sql);
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($pager);
echo $str;