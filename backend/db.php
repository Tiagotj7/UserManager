<?php
// db.php - configure conforme seu ambiente
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$DB_HOST = 'sql311.infinityfree.com';
$DB_USER = 'if0_40369202';
$DB_PASS = '25VKNWnG0gADjk';
$DB_NAME = 'if0_40369202_usermanager_db';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}
$conn->set_charset('utf8mb4');

