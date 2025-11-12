<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php';

$sql = "SELECT * FROM items";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>