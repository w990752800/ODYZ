<?php
header("Content-Type: application/json;charset=UTF-8");
$conn=mysqli_connect('localhost','root','','OldDeal');
$sql="set names utf8";
mysqli_query($conn,$sql);
$uname= $_REQUEST['uname'];
$year = date('Y');
//一月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate)=1 AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Jan']=$row['money'];
//二月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate)=2 AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Feb']=$row['money'];
//三月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '3%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Mar']=$row['money'];
//四月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '4%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Apr']=$row['money'];
//五月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '5%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['May']=$row['money'];
//六月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '6%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['June']=$row['money'];
//七月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '7%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['July']=$row['money'];
//八月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '8%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Aug']=$row['money'];
//九月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '9%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Sept']=$row['money'];
//十月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '10%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Oct']=$row['10'];
//十一月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '11%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Nov']=$row['money'];
//十二月
$sql="select year(sdate) as year,month(sdate) as month,sum(sprice) as money from soldOrder where sname='$uname' AND month(sdate) like '12%' AND year(sdate)=$year group by year(sdate),month(sdate)";
$result=mysqli_query($conn,$sql);
$row =mysqli_fetch_assoc($result);
$output['Dec']=$row['money'];
//年份
$output['year']=$year;
echo json_encode($output);