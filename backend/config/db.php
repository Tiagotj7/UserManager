<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "sql311.infinityfree.com";   // Hostname exato
$user = "if0_40369202";              // Username do painel
$pass = "25VKNWnG0gADjk";            // Senha do painel
$dbname = "if0_40369202_usermanager"; // Nome completo do banco

$conn = new mysqli($host, $user, $pass, $dbname);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro na conexão: " . $conn->connect_error]);
    exit();
}

$conn->set_charset("utf8");
echo json_encode(["success" => true, "message" => "Conexão OK!"]);
?>
