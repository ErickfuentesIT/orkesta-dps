import "./styles.css";
import logo from "../assets/logo_orkesta.png";

function App() {
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
            <h1>Iniciar Sesión</h1>

            <form class="form-grid" autocomplete="on">
              <label for="user">Usuario:</label>
              <input
                id="user"
                name="username"
                type="text"
                autocomplete="username"
              />

              <label for="pass">Contraseña:</label>
              <input
                id="pass"
                name="password"
                type="password"
                autocomplete="current-password"
              />

              <div class="row span-2">
                <label class="check">
                  <input id="remember" type="checkbox" />
                  <span>Recordarme</span>
                </label>
              </div>

              <button class="span-2" type="submit">
                Iniciar Sesión
              </button>

              <p class="muted span-2">
                ¿No tienes una cuenta?
                <a href="/register">Regístrate</a>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
