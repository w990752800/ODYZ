<?php
header('Content-Type: application/json;charset=UTF-8');
$uname = $_REQUEST['uname'];
$upwd = $_REQUEST['upwd'];
$corfirmupwd = $_REQUEST['corfirmupwd'];
$QQ = $_REQUEST['QQ'];
$otherCode=$_REQUEST['otherCode'];
$safe= $_REQUEST['safe'];
$answer = $_REQUEST['answer'];
if( !$uname || !$upwd){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}
//连接数据库
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//提交SQL
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
//把数据编码为JSON字符串
$sql= "SELECT * FROM oldDeal_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row=mysqli_fetch_assoc($result);
 $output = [];
if($row){
	$output['msg'] = '该用户名已经存在,请更换用户名!';
	$output['tip'] = 'register';
	echo json_encode($output);
}else{
	$sql = "insert into OldDeal_user value (null,'$uname','$upwd','$corfirmupwd','$QQ','$otherCode','$safe','$answer','','','')";
        $result = mysqli_query($conn,$sql);
        if($result){    //执行成功
            $output['msg'] = 'succ';
            $output['uid'] = mysqli_insert_id($conn);
        }else {         //执行失败
            $output['msg'] = 'err';
            $output['sql'] = $sql;
        }
        echo json_encode($output);
}
//uname=flower&upwd=7654321&corfirmupwd=7654321&QQ=12345@qq.com&safe=1111&answer=6666