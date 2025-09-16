import { useState } from "react";
import Button from "../ui/Button";

export default function FirstForm({ title = "Form title", isLogin = true }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <h2>{title}</h2>

      <form class="form-grid" autocomplete="on">
        <label for="user" className="muted">
          Usuario:
        </label>
        <input
          id="user"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Ingresa tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label for="pass" className="muted">
          Contraseña:
        </label>
        <input
          id="pass"
          name="password"
          type="password"
          autocomplete="current-password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <>
            <label for="pass" className="muted">
              Confirmar Contraseña:
            </label>
            <input
              id="pass"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        <div class="grid-column-2">
          <label class="check">
            <input id="remember" type="checkbox" />
            <span className="muted">Recordarme</span>
          </label>
        </div>

        <Button className="grid-column-2 btn-sweep" type="submit">
          {isLogin ? "INICIAR SESIÓN" : "REGISTRARSE"}
        </Button>

        <p class="muted grid-column-2">
          {!isLogin && (
            <>
              ¿Ya tienes una cuenta?
              <a href="/login">Inicia Sesión</a>
            </>
          )}
          {isLogin && (
            <>
              ¿No tienes una cuenta?
              <a href="/register">Regístrate</a>
            </>
          )}
        </p>
      </form>
    </>
  );
}
