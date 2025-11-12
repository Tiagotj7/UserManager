'use client'
import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import type { Project } from '../types.d'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/impact-api'

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/read.php`)
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data.projects)) setProjects(data.projects)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="container">
      <Hero />
      <section className="cards" id="programs">
        {loading ? (
          <p className="muted">Carregando programas...</p>
        ) : projects.length === 0 ? (
          <p className="muted">Nenhum programa cadastrado.</p>
        ) : (
          projects.map(p => <ProjectCard key={String(p.id)} project={p} />)
        )}
      </section>
    </main>
  )
}
