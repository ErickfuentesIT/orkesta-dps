import Button from "../ui/Button";
import ProjectsGrid from "./ProjectsGrids";

const demoProjects = [
  { id: 1, name: "Nombre_Proyecto", owner: "User1", createdAt: "14-09-2025" },
  {
    id: 2,
    name: "Sistema Inventario",
    owner: "User1",
    createdAt: "14-09-2025",
  },
  { id: 3, name: "Portal Clientes", owner: "User2", createdAt: "14-09-2025" },
  { id: 4, name: "App Móvil", owner: "User3", createdAt: "14-09-2025" },
  { id: 4, name: "App Móvil", owner: "User3", createdAt: "14-09-2025" },
];

export default function ProjectList() {
  return (
    <div className="project-ly">
      <ProjectsGrid
        projects={demoProjects}
        onAdd={() => alert("Agregar proyecto")}
        onEdit={(p) => alert("Editar: " + p.name)}
      />
    </div>
  );
}
