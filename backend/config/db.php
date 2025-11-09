<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host   = "sql311.infinityfree.com";      // do painel
$user   = "if0_40369202";                 // do painel
$pass   = "25VKNWnG0gADjk";         // do painel (cole exato)
$dbname = "if0_40369202_usermanager";     // do painel

// tenta conexão (sem suprimir erros)
$conn = new mysqli($host, $user, $pass, $dbname);

header("Content-Type: application/json; charset=UTF-8");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro na conexão: " . $conn->connect_error]);
    exit();
}

$conn->set_charset("utf8");
// echo json_encode(["success" => true, "message" => "Conexão OK!"]); // opcional para teste
?>
