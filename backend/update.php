<?php
require 'db.php';

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';

header('Content-Type: application/json; charset=utf-8');

if (!$id || !$title || !$description) {
    echo json_encode(['success' => false, 'message' => 'Campos inválidos']);
    exit;
}

$sql = "UPDATE projects SET title = ?, description = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssi', $title, $description, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $conn->error]);
}
