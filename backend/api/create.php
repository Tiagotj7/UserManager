<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));
if (!$data) { echo json_encode(["error" => "Dados inválidos"]); exit; }

$stmt = $conn->prepare("INSERT INTO usuarios (nome, email) VALUES (?, ?)");
$stmt->bind_param("ss", $data->nome, $data->email);

if ($stmt->execute()) echo json_encode(["success" => true]);
else echo json_encode(["error" => $stmt->error]);
?>
