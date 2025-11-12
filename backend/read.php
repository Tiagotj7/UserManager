<?php
require 'db.php';

$sql = "SELECT id, title, description, image, created_at FROM projects ORDER BY id DESC";
$stmt = $conn->prepare($sql);
$projects = [];
if ($stmt->execute()) {
    $res = $stmt->get_result();
    while ($row = $res->fetch_assoc()) {
        $projects[] = $row;
    }
}
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => true, 'projects' => $projects]);
