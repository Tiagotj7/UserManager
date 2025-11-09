<?php
require_once("../../config/db.php");
require_once("../utils/cors.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? 0;

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID inválido"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Usuário excluído com sucesso"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao excluir usuário"]);
}

$stmt->close();
$conn->close();
?>
