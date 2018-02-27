<?php
$datetime1 = date_create('2017-4-11');
$datetime2 = date_create('2017-5-1');
$interval = date_diff($datetime1, $datetime2);
echo $interval->format('%R%a days');
?>