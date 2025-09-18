import SideBar from "../components/common/SideBar";
import ProjectList from "../components/common/ProjectList";
import NavBar from "../components/common/NavBar";

const projects = [
  { id: 1, name: "Nombre_Proyecto" },
  { id: 2, name: "Otro_Proyecto" },
  { id: 3, name: "Proyecto Largo con nombre" },
];

export default function Dashboard() {
  return (
    <div className="layout">
      <div className="content-ly">
        <SideBar
          projects={projects}
          activeId={2}
          onSelect={(id) => console.log("ir a:", id)}
          onLogout={() => console.log("logout")}
        />
        <ProjectList />
      </div>
    </div>
  );
}
