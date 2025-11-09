<?php
echo json_encode([
    "status" => "API PHP funcionando 🚀",
    "endpoints" => [
        "GET /api/users/list.php"    => "Lista usuários",
        "POST /api/users/create.php" => "Cria usuário",
        "PUT /api/users/update.php"  => "Atualiza usuário",
        "DELETE /api/users/delete.php" => "Remove usuário"
    ]
]);
?>
