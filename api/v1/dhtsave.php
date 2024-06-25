<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    require '../v1/config/database.php';
    $temperature=$_GET["temperature"];
    $humidity =$_GET["humidity"];
    $query = "UPDATE `dht` SET `temperature`='$temperature',`humidity`='$humidity' WHERE `id`= 0"; 
    $result = mysqli_query($conDb, $query);
    echo json_encode( $result);
    mysqli_close($conDb);
    
?>