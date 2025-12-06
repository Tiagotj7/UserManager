"use client";

import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  description: string | null;
};

const API_URL = "https://usermanager.infinityfreeapp.com/backend/index.php";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Erro ao buscar itens");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError("Erro ao carregar itens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const body: any = { name, description };
    if (editingId) body.id = editingId;

    try {
      const res = await fetch(API_URL, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erro ao salvar");

      await fetchItems();
      setName("");
      setDescription("");
      setEditingId(null);
    } catch (err) {
      setError("Erro ao salvar item");
    }
  };

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description ?? "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;

    try {
      const res = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir");

      await fetchItems();
    } catch (err) {
      setError("Erro ao excluir item");
    }
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>CRUD Next.js + PHP (XAMPP)</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <h2>{editingId ? "Editar item" : "Novo item"}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ marginBottom: 10 }}>
          <label>
            Nome:
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Descrição:
            <br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: "8px 16px", marginRight: 8 }}>
          {editingId ? "Atualizar" : "Cadastrar"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{ padding: "8px 16px" }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h2>Lista de itens</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table
          width="100%"
          border={1}
          cellPadding={8}
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Nenhum item cadastrado
                </td>
              </tr>
            )}

            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ marginRight: 8 }}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}