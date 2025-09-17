export default function ProjectCard({ project, onEdit }) {
  const { name, owner, createdAt } = project;

  return (
    <article className="card">
      <h3 className="card__title">{name}</h3>
      <p className="card__text">
        <span className="card__label">Propietario:</span> {owner}
      </p>
      <p className="card__text">
        <span className="card__label">Creado:</span> {createdAt}
      </p>

      <div className="card__actions">
        <button className="btn btn--primary" onClick={() => onEdit?.(project)}>
          Editar
        </button>
      </div>
    </article>
  );
}
