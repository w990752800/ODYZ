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
if($upwd != $corfirmupwd){
    $output['msg'] = '确认密码与密码不一致!';
	$output['tip'] = 'register';
	echo json_encode($output);
}else{
	$sql = "insert into OldDeal_user value (null,'$uname','$upwd','$corfirmupwd','$QQ','$otherCode','$safe','$answer','',2,'')";
        $result = mysqli_query($conn,$sql);
        if($result){    //执行成功
            $output['msg'] = '注册成功！点击<a href="login.html" style="padding:5px 10px border:1px solid #ddd">登录</a>按钮进入登录页面！';
            $output['uid'] = mysqli_insert_id($conn);
        }else {         //执行失败
            $output['msg'] = '注册失败！';
            $output['sql'] = $sql;
        }
        echo json_encode($output);
   }
}
//uname=flower&upwd=7654321&corfirmupwd=7654321&QQ=12345@qq.com&safe=1111&answer=6666