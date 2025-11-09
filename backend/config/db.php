?>

<?php
// Mostra erros para depuração
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuração do banco (dados do painel InfinityFree)
$host = "sql311.infinityfree.com";  // seu host MySQL
$user = "if0_40369202";        // ex: if0_12345678
$pass = "25VKNnWoG0gADjk";          // senha do banco
$dbname = "usermanager_db";           // ex: if0_12345678_users

// Conexão MySQL
$conn = new mysqli($host, $user, $pass, $dbname);

// Define cabeçalhos padrão de resposta (JSON + CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Verifica conexão
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro na conexão: " . $conn->connect_error]);
    exit();
}

// Força UTF-8 (evita caracteres bugados)
$conn->set_charset("utf8");
?>
