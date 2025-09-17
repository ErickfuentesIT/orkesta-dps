import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({
  projects = [],
  onAdd,
  onEdit,
  title = "Panel administrativo",
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.owner ?? "").toLowerCase().includes(q)
    );
  }, [projects, query]);

  return (
    <section className="admin">
      <header className="admin__head">
        <h2 className="admin__title">{title}</h2>
        <div className="admin__tools">
          <input
            type="search"
            placeholder="Buscar proyecto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input"
          />
          <button className="btn btn--success" onClick={onAdd}>
            + Agregar Proyecto
          </button>
        </div>
      </header>

      <div className="admin__box">
        {filtered.length ? (
          <div className="grid">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onEdit={onEdit} />
            ))}
          </div>
        ) : (
          <div className="empty">
            No se encontraron proyectos para “{query}”.
          </div>
        )}
      </div>
    </section>
  );
}
