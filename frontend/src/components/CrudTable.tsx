"use client";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CrudTable() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const fetchUsuarios = async () => {
    const res = await fetch(`${API}/read.php`);
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = editId ? `${API}/update.php` : `${API}/create.php`;
    const body = editId ? { id: editId, nome, email } : { nome, email };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setNome("");
    setEmail("");
    setEditId(null);
    fetchUsuarios();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API}/delete.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsuarios();
  };

  return (
    <div className="bg-[#2b2d31] p-6 rounded-2xl shadow-xl">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="p-2 rounded-md text-black w-full md:w-1/3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md text-black w-full md:w-1/3"
          required
        />
        <button
          type="submit"
          className="bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold px-4 py-2 rounded-md"
        >
          {editId ? "Atualizar" : "Adicionar"}
        </button>
      </form>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-600">
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="border-b border-gray-700">
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td className="space-x-2">
                <button
                  onClick={() => {
                    setEditId(u.id);
                    setNome(u.nome);
                    setEmail(u.email);
                  }}
                  className="text-yellow-400"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-400"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
