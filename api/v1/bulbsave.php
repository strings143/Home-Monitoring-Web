<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    require '../v1/config/database.php';
    $data = json_decode(file_get_contents('php://input'));
    $state="$data->state";
    $menber="$data->bulb";
    $query = "UPDATE `json` SET `bulb`='$state' where `menber`='$menber'"; 
    $result = mysqli_query($conDb, $query);
    echo json_encode( $result);
    mysqli_close($conDb);
    
?>