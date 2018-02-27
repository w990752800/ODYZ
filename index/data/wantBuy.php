<?php
header('Content-Type: text/plain;charset=UTF-8');
@$uname = $_REQUEST['uname'];
@$pname = $_REQUEST['pname'];
@$pdesc = $_REQUEST['pdesc'];
@$wantPrice = $_REQUEST['wantPrice'];
@$eTime= 30;
$wantBuyTime = time()*1000;   //服务器端当前系统时间
$buyStatus = 1;    //刚生成的求购状态都是'正在求购'
if( !$uname || !$pname || !$pdesc || !$wantPrice){ //若客户端未提交必需的数据
	echo "信息填写不完整，请重新填写！";
	return;	//退出当前PHP页面的执行
}
//连接数据库
$conn = mysqli_connect('localhost', 'root', '', 'OldDeal');
//提交SQL
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
//把数据编码为JSON字符串

$sql = "SELECT memberLevel FROM olddeal_user WHERE uname ='$uname'";
$result = mysqli_query($conn,$sql);
$memberLevel = mysqli_fetch_assoc($result)['memberLevel'];
 if($memberLevel==1){
   $sql = "SELECT cancel FROM report WHERE tipName ='$uname'";
   $result = mysqli_query($conn,$sql);
   $cancel = mysqli_fetch_assoc($result)['cancel'];
   if($cancel){
      echo "您已经被举报 $cancel,所以您现在不能发布商品！";
   }else{
   echo '您的账号已被禁止发布！请解禁后再发布！';
   }

 }else{
    $sql = "insert into wantBuy value (null,'$uname','$pname','$pdesc','$wantPrice','$wantBuyTime','$eTime','$buyStatus')";
    $result = mysqli_query($conn,$sql);
    if($result){ //SQL语句执行成功
      $sql="UPDATE olddeal_user SET integral=integral+5 where uname ='$uname'";
      $result=mysqli_query($conn,$sql);
        if($result){
          echo '发布求购成功！积分+5！';
        }else{
          echo '发布求购成功!积分未增加！';
        }
    }else {  //SQL语句执行失败
       echo '发布失败！';
    }
 }