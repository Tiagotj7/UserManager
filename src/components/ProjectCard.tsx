import type { Project } from '../../types.d'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <div className="card-body">
        <h3>{project.title}</h3>
        <p className="muted small">{project.description}</p>
      </div>
    </article>
  )
}
