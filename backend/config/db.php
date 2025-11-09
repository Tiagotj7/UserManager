<?php
$host = "sql311.infinityfree.com";
$user = "if0_40369202";
$pass = "25VKNnWoG0gADjk";
$dbname = "usermanager_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro na conexão: " . $conn->connect_error]));
}
?>
