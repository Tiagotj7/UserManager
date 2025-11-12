<?php
include 'config.php';
$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("UPDATE usuarios SET nome=?, email=? WHERE id=?");
$stmt->bind_param("ssi", $data->nome, $data->email, $data->id);

if ($stmt->execute()) echo json_encode(["success" => true]);
else echo json_encode(["error" => $stmt->error]);
?>
