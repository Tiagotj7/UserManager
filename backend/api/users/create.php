<?php
require_once("../../config/db.php");
require_once("../utils/cors.php");

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data["nome"] ?? "";
$email = $data["email"] ?? "";

if (!$nome || !$email) {
    echo json_encode(["success" => false, "message" => "Nome e email são obrigatórios"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO usuarios (nome, email) VALUES (?, ?)");
$stmt->bind_param("ss", $nome, $email);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Usuário criado com sucesso"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao criar usuário"]);
}

$stmt->close();
$conn->close();
?>
