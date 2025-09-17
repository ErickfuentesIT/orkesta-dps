export default function ProjectCard({ project, onEdit }) {
  const { name, owner, createdAt } = project;

  return (
    <section className="card" onClick={() => onEdit?.(project)}>
      <article className="content">
        <h1>{name}</h1>
      </article>
    </section>
  );
}
