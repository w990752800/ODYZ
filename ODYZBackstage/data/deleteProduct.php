<?php
/**接收客户端提交的uname和pid，把相关信息保存入需要的表，返回：{"msg": "ok","uid":1,"cid":100,"pid":10,"count":4}**/
header('Content-Type: text/plain;charset=UTF-8');

//接收客户端提交的数据
$mname = $_REQUEST['mname'];
$pid = $_REQUEST['pid'];
//连接数据库
if( !$mname || !$pid){ //若客户端未提交必需的数据
	echo "{}";
	return;	//退出当前PHP页面的执行
}
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//SQL1：设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
//SQL2：根据uname查询uid
$sql = "DELETE FROM pub where pid='$pid'";
$result = mysqli_query($conn,$sql);

	$sql="select UNAME from pub where pid='$pid'";
   $result=mysqli_query($conn,$sql);
   $row = mysqli_fetch_assoc($result);
   $uname = $row['UNAME'];
   if($result){ //SQL语句执行成功
         $sql="UPDATE olddeal_user SET integral=integral-5 where uname ='$uname'";
         $result=mysqli_query($conn,$sql);
          if($result){
             echo '删除商品成功！积分-5！';
             $sql="select integral from olddeal_user where uname='$uname'";
                $result = mysqli_query($conn, $sql);
                $row=mysqli_fetch_assoc($result);
               $integral = $row['integral'];
               if($integral<0){
               	$integral=0;
              	$sql = "update olddeal_user set integral='$integral' where uname='$uname'";
                 $result = mysqli_query($conn,$sql);
               }
          }else{
             echo '删除商品成功!积分未增加！';
          }
   }else {  //SQL语句执行失败
             echo '删除商品失败！';
}