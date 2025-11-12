<?php
require 'db.php';

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
header('Content-Type: application/json; charset=utf-8');

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'id inválido']);
    exit;
}

$sql = "DELETE FROM projects WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $conn->error]);
}
