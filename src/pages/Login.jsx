import logo from "../assets/logo_orkesta.png";
import FirstForm from "../components/common/FirstForm";
export default function Login() {
  return (
    <div>
      <div className="wrapper">
        <aside className="left">
          <section>
            <img src={logo} width="700" height="500" />
          </section>
        </aside>
        <main className="right">
          <div class="login-wrap">
            <FirstForm title="Iniciar Sesión" isLogin={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
