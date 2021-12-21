<?php
$json=file_get_contents('../items.json');
$json=json_decode($json, true);

$message='<html><body>';
$message.='<p> Размер кроссовок:  '.$_POST['buyer_size'].'</p>';
$message.='<p> Mail: '.$_POST['buyer_email'].'</p>';
$message.='<p> Name: '.$_POST['buyer_name'].'</p>';

$cart=$_POST['cart'];
$sum=0;

foreach ($cart as $id => $count){
	$message.=$json[$id]['item_name'].':';
	$message.=$count.'шт. по цене: ';
	$message.=$json[$id]['item_price'].'p. <br>';
	$sum=$sum+$count*$json[$id]['item_price'];
}
$message.='Всего: '.$sum;

$to='coloteroritata@gmail.com';
$to.=$_POST['email'];

$headers='MIME-Version: 1.0'."\r\n";
$headers.='Content-type: text/html; charset=utf8'."\r\n";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, content-type");
$m=mail($to, 'Заказ в магазине', $message, $headers);
	if ($m)
		{echo 1;}
	else 
		{echo 0;}
?>