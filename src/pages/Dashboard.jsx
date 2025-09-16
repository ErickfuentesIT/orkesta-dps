import SideBar from "../components/common/SideBar";
import ProjectList from "../components/common/ProjectList";
import NavBar from "../components/common/NavBar";

export default function Dashboard() {
  return (
    <div className="layout">
      <NavBar />
      <div className="content-ly">
        <SideBar />
        <ProjectList />
      </div>
    </div>
  );
}
