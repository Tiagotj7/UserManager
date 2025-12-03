<?php
$host = 'sql311.infinityfree.com'; // MySQL Hostname do painel
$db   = 'if0_40369202_db_admin';   // nome completo do banco
$user = 'if0_40369202';            // usuário MySQL
$pass = '25VKNnWoG0gADjk';         // senha que você escolheu
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Erro na conexão com o banco: ' . $e->getMessage()]);
    exit;
}