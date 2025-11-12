'use client'
import { useEffect, useState } from 'react'
import type { Project } from '../../../types'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/impact-api'

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ id: '', title: '', description: '' })

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/read.php`)
      const json = await res.json()
      setProjects(json.projects || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = form.id ? `${API_BASE}/update.php` : `${API_BASE}/create.php`
    const body = new URLSearchParams()
    if (form.id) body.append('id', form.id)
    body.append('title', form.title)
    body.append('description', form.description)

    try {
      const res = await fetch(url, { method: 'POST', body })
      const json = await res.json()
      if (json.success) {
        setForm({ id: '', title: '', description: '' })
        fetchProjects()
      } else {
        alert(json.message || 'Erro')
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao conectar com o servidor')
    }
  }

  const handleEdit = (p: Project) => setForm({ id: String(p.id), title: p.title, description: p.description || '' })

  const handleDelete = async (id: number | string) => {
    if (!confirm('Remover esse programa?')) return
    const body = new URLSearchParams({ id: String(id) })
    const res = await fetch(`${API_BASE}/delete.php`, { method: 'POST', body })
    const json = await res.json()
    if (json.success) fetchProjects()
    else alert(json.message || 'Erro')
  }

  return (
    <main className="container admin">
      <h2>Admin — Gerenciar Programas</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          value={form.title}
          placeholder="Título"
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          value={form.description}
          placeholder="Descrição"
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">{form.id ? 'Atualizar' : 'Criar'}</button>
          {form.id && <button type="button" onClick={() => setForm({ id: '', title: '', description: '' })}>Cancelar</button>}
        </div>
      </form>

      <div className="list">
        {loading ? <p className="muted">Carregando...</p> : projects.map(p => (
          <div className="list-item" key={String(p.id)}>
            <div>
              <strong>{p.title}</strong>
              <p className="muted small">{p.description}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(p)}>Editar</button>
              <button onClick={() => handleDelete(p.id)} className="danger">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
