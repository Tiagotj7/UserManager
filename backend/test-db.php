<?php
include __DIR__ . '/config/db.php'; // assume que db.php define $conn

if (isset($conn) && $conn->ping()) {
    echo json_encode(["success" => true, "message" => "Conexão OK!"]);
} else {
    $err = isset($conn) ? $conn->connect_error : "Variável \$conn não definida";
    echo json_encode(["success" => false, "message" => $err]);
}
?>
