<?php
// backend/db.php
$host = 'mysql-usermanager.alwaysdata.net'; // MySQL Hostname do painel
$db   = 'usermanager_db';   // nome completo do banco
$user = '444829';            // usuário MySQL
$pass = 'Senha123..';         // senha que você escolheu
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