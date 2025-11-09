'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id?: number
  nome: string
  email: string
}

export default function UserForm({ id }: { id?: number }) {
  const [user, setUser] = useState<User>({ nome: '', email: '' })
  const router = useRouter()

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/list.php?id=${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = id
      ? `${process.env.NEXT_PUBLIC_API_URL}/update.php`
      : `${process.env.NEXT_PUBLIC_API_URL}/create.php`

    const formData = new FormData()
    if (id) formData.append('id', id.toString())
    formData.append('nome', user.nome)
    formData.append('email', user.email)

    await fetch(url, { method: 'POST', body: formData })
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <div>
        <label className="block mb-1 font-medium">Nome</label>
        <input
          type="text"
          value={user.nome}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        {id ? 'Salvar Alterações' : 'Cadastrar'}
      </button>
    </form>
  )
}
