<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: https://user-manager-drab.vercel.app/");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lista todos ou um item específico
        if (isset($_GET['id'])) {
            $id = (int) $_GET['id'];
            $stmt = $pdo->prepare("SELECT * FROM items WHERE id = ?");
            $stmt->execute([$id]);
            $item = $stmt->fetch();
            if ($item) {
                echo json_encode($item);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Item não encontrado']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM items ORDER BY id DESC");
            $items = $stmt->fetchAll();
            echo json_encode($items);
        }
        break;

    case 'POST':
        // Cria um novo item
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['name'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campo name é obrigatório']);
            exit;
        }

        $name = $input['name'];
        $description = $input['description'] ?? null;

        $stmt = $pdo->prepare("INSERT INTO items (name, description) VALUES (?, ?)");
        $stmt->execute([$name, $description]);

        echo json_encode([
            'id' => $pdo->lastInsertId(),
            'name' => $name,
            'description' => $description
        ]);
        break;

    case 'PUT':
        // Atualiza um item
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID é obrigatório para atualização']);
            exit;
        }

        if (empty($input['name'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campo name é obrigatório']);
            exit;
        }

        $name = $input['name'];
        $description = $input['description'] ?? null;

        $stmt = $pdo->prepare("UPDATE items SET name = ?, description = ? WHERE id = ?");
        $stmt->execute([$name, $description, $id]);

        echo json_encode([
            'id' => $id,
            'name' => $name,
            'description' => $description
        ]);
        break;

    case 'DELETE':
        // Remove um item
        $id = $_GET['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID é obrigatório para exclusão']);
            exit;
        }

        $id = (int) $id;

        $stmt = $pdo->prepare("DELETE FROM items WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        break;
}