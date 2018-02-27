<?php
echo(date("Y-m-d",time()));
echo "br";
//获取时间戳
$time = time();
//对时间戳进行格式化
$month = date('m',$time);
//输出月份
echo $month;
echo '<br />';
echo date('Y-1-31');
echo '<br />';
$daybegin=strtotime(date('Y-1-31'));
echo date('Y-2-28');
echo '<br />';
$daybegin=strtotime(date('Y-1-31'));
echo '<br />';
echo $daybegin;
echo '<br />';
$dayend=$daybegin+28*24*60*60;
echo $dayend;
echo '<br />';
echo strtotime(date('Y-2-28'));
/*
$output;
$i=0;
$outputs;
output[$i]["label"]=>"1月";
output[$i]["value"]="200";
output[$i+1]["label"]="2月";
output[$i+1]["value"]="400";
output[$i+2]["label"]="3月";
output[$i+2]["value"]="300";
$outputs[$i++]=$output;
echo json_encode($outputs);
*/
$arr=array("key"=>array("key2"=>"value"));
//访问二维数组“key2”元素
echo $arr["key"]["key2"];

$myphonebook   =   array   (
  array("label","1234"),
  array("efgh","5678"),
  array("ijkl","9012")
  );
  echo json_encode($myphonebook);
     echo   $myphonebook[0][0];//   abcd
  echo   $myphonebook[0][1];

  $temp = "hello" ;
  echo "$temp world";