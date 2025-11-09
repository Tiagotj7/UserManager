<?php
require_once("../../config/db.php");
require_once("../utils/cors.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? 0;
$nome = $data["nome"] ?? "";
$email = $data["email"] ?? "";

if (!$id || !$nome || !$email) {
    echo json_encode(["success" => false, "message" => "Dados incompletos"]);
    exit;
}

$stmt = $conn->prepare("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?");
$stmt->bind_param("ssi", $nome, $email, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Usuário atualizado com sucesso"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao atualizar usuário"]);
}

$stmt->close();
$conn->close();
?>
