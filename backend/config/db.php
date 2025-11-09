<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "meu_banco";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro na conexão: " . $conn->connect_error]));
}
?>
