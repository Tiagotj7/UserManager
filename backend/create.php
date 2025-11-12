<?php
require 'db.php';

$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';

header('Content-Type: application/json; charset=utf-8');

if (!$title || !$description) {
    echo json_encode(['success' => false, 'message' => 'Título e descrição são obrigatórios']);
    exit;
}

$sql = "INSERT INTO projects (title, description) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $title, $description);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
} else {
    echo json_encode(['success' => false, 'message' => $conn->error]);
}
