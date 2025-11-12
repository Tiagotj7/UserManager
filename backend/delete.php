<?php
include 'config.php';
$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("DELETE FROM usuarios WHERE id=?");
$stmt->bind_param("i", $data->id);

if ($stmt->execute()) echo json_encode(["success" => true]);
else echo json_encode(["error" => $stmt->error]);
?>
