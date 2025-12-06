<?php
// =======================================================
//  CONFIGURAÇÃO DE CORS (ACESSO ENTRE DOMÍNIOS)
// =======================================================

// Domínios permitidos a acessar sua API
$allowedOrigins = [
    'http://localhost:3000',
    'https://user-manager-red.vercel.app',
];
    
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin && in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin"); // ajuda cache
} else {
    // Para facilitar testes, libera geral.
    // Em produção real, o ideal é usar apenas a lista de allowedOrigins.
    header("Access-Control-Allow-Origin: *");
}

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json; charset=utf-8');

// Responde requisições de preflight (OPTIONS) e encerra
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// =======================================================
//  CONEXÃO COM O BANCO
// =======================================================

require __DIR__ . '/db.php'; // garante o caminho correto até db.php

$method = $_SERVER['REQUEST_METHOD'];

// Função auxiliar para ler JSON do corpo da requisição
function getJsonInput(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return [];
    }

    return $data;
}

// =======================================================
//  ROTAS / MÉTODOS (CRUD)
// =======================================================

try {
    switch ($method) {
        // ----------------- LISTAR / BUSCAR (READ) -----------------
        case 'GET':
            // GET /backend/index.php          -> lista todos
            // GET /backend/index.php?id=123   -> busca 1 item

            if (isset($_GET['id'])) {
                $id = (int) $_GET['id'];
                if ($id <= 0) {
                    http_response_code(400);
                    echo json_encode(['error' => 'ID inválido']);
                    exit;
                }

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

        // ----------------- CRIAR (CREATE) -----------------
        case 'POST':
            // Espera JSON: { "name": "...", "description": "..." }

            $input = getJsonInput();

            $name = trim($input['name'] ?? '');
            $description = $input['description'] ?? null;

            if ($name === '') {
                http_response_code(400);
                echo json_encode(['error' => 'Campo name é obrigatório']);
                exit;
            }

            $stmt = $pdo->prepare("INSERT INTO items (name, description) VALUES (?, ?)");
            $stmt->execute([$name, $description]);

            $newId = (int) $pdo->lastInsertId();

            echo json_encode([
                'id'          => $newId,
                'name'        => $name,
                'description' => $description,
            ]);
            break;

        // ----------------- ATUALIZAR (UPDATE) -----------------
        case 'PUT':
            // Espera JSON: { "id": 123, "name": "...", "description": "..." }

            $input = getJsonInput();

            $id = isset($input['id']) ? (int) $input['id'] : 0;
            $name = trim($input['name'] ?? '');
            $description = $input['description'] ?? null;

            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['error' => 'ID é obrigatório para atualização']);
                exit;
            }

            if ($name === '') {
                http_response_code(400);
                echo json_encode(['error' => 'Campo name é obrigatório']);
                exit;
            }

            // Verifica se o item existe
            $check = $pdo->prepare("SELECT id FROM items WHERE id = ?");
            $check->execute([$id]);
            if (!$check->fetch()) {
                http_response_code(404);
                echo json_encode(['error' => 'Item não encontrado']);
                exit;
            }

            $stmt = $pdo->prepare("UPDATE items SET name = ?, description = ? WHERE id = ?");
            $stmt->execute([$name, $description, $id]);

            echo json_encode([
                'id'          => $id,
                'name'        => $name,
                'description' => $description,
            ]);
            break;

        // ----------------- DELETAR (DELETE) -----------------
        case 'DELETE':
            // DELETE /backend/index.php?id=123

            $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['error' => 'ID é obrigatório para exclusão']);
                exit;
            }

            $stmt = $pdo->prepare("DELETE FROM items WHERE id = ?");
            $stmt->execute([$id]);

            echo json_encode(['success' => true]);
            break;

        // ----------------- MÉTODO NÃO PERMITIDO -----------------
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método não permitido']);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Erro no banco de dados',
        'details' => $e->getMessage(), // remova em produção se não quiser expor detalhes
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Erro inesperado no servidor',
        'details' => $e->getMessage(),
    ]);
}