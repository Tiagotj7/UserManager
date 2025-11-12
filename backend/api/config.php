<?php
$DB_HOST = 'sql311.infinityfree.com';
$DB_USER = 'if0_40369202';
$DB_PASS = '25VKNWnG0gADjk';
$DB_NAME = 'if0_40369202_usermanager_db';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Conexão falhou: " . $conn->connect_error);
}

// Libera acesso ao domínio da Vercel
header("Access-Control-Allow-Origin: https://SEU_SITE.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
?>