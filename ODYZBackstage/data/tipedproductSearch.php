<?php
header('Content-Type:application/json');
@$mname=$_REQUEST['mname'];
@$uname=$_REQUEST['uname'];
@$pageNum=$_REQUEST['pageNum'];
@$kw = $_REQUEST['kw'];
if( !$mname || !$uname || !$pageNum || !$kw){ //���ͻ���δ�ύ���������
	echo "{}";
	return;	//�˳���ǰPHPҳ���ִ��
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
//sql2 ��ȡ�ܼ�¼�� ������ҳ��
$sql="select count(*) from pub where pname LIKE '%$kw%' AND UNAME = '$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$pager['recordCount']=intval($row['count(*)']);//���ַ�������Ϊ����
$pager['pageCount']=ceil(($pager['recordCount'])/($pager["pageSize"]));
//var_dump($pager['pageCount']);
//sql3 ��ȡ��ǰָ��ҳ�е�����
$count=$pager['pageSize'];
$start=($pager['pageNum']-1)*$count;
$sql="select *from pub where uname LIKE '%$kw%' OR pname LIKE '%$kw%' limit $start,$count";
$result=mysqli_query($conn,$sql);
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($pager);
echo $str;