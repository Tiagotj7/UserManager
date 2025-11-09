'use client'
import { useEffect, useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: number
  nome: string
  email: string
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/list.php`)
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const deleteUser = async (id: number) => {
    if (!confirm('Deseja realmente excluir este usuário?')) return
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete.php?id=${id}`, { method: 'DELETE' })
    fetchUsers()
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={18}/> Novo
        </Link>
      </div>

      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={4} className="text-center p-4">Nenhum usuário cadastrado.</td></tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border text-center">{u.id}</td>
                <td className="p-2 border">{u.nome}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border text-center space-x-3">
                  <Link href={`/edit/${u.id}`} className="text-blue-600 hover:underline inline-flex items-center gap-1">
                    <Edit size={16}/> Editar
                  </Link>
                  <button onClick={() => deleteUser(u.id)} className="text-red-600 inline-flex items-center gap-1">
                    <Trash2 size={16}/> Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
