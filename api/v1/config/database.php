<?php
 DEFINE ('DBServer', 'localhost');  //127.0.0.1 or localhost
 DEFINE ('DBName', 'iot');         //資料庫名稱
 DEFINE ('DBUser', 'root');         //帳號
 DEFINE ('DBPw', '123456');      //密碼
 $conDb = mysqli_connect(DBServer,DBUser,DBPw);             
 if (!$conDb) 
 {
 die("Can not connect to DB: " . mysqli_error($conDb));
 exit(); 
 }
 $selectDb = mysqli_select_db($conDb, DBName);
 if (!$selectDb)
 {
 die("Database selection failed: " . mysqli_error($conDb));
 exit(); 
 }
?>
