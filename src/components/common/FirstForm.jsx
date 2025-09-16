import Button from "../ui/Button";
import { authenticate } from "../../services/users";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function FirstForm({ title = "Form title", isLogin = true }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { username: "", password: "", confirmPassword: "" },
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const onSubmit = async ({ username, password, confirmPassword }) => {
    if (!isLogin) {
      if (password !== confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Las contraseñas no coinciden",
        });
        return;
      }
    }

    const res = authenticate(username, password);
    if (res.ok) {
      navigate("/app/projects", { replace: true });
    } else {
      setError("root", { type: "manual", message: "Credenciales inválidas" });
    }
  };

  return (
    <>
      <h2>{title}</h2>

      <form
        class="form-grid"
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="user" className="muted">
          Usuario:
        </label>
        <input
          id="user"
          type="text"
          autoComplete="username"
          placeholder="Ingresa tu usuario"
          {...register("username", {
            required: "Ingresa tu usuario",
            minLength: { value: 3, message: "Mínimo de 3 caracteres" },
          })}
        />

        <label htmlFor="pass" className="muted">
          Contraseña:
        </label>
        <input
          id="pass"
          type="password"
          autoComplete="current-password"
          placeholder="Ingresa tu contraseña"
          {...register("password", {
            required: "Ingresa tu contraseña",
            minLength: {
              value: 6,
              message: "La contraseña debe tener un mínimo de 6 caracteres",
            },
          })}
        />

        {!isLogin && (
          <>
            <label htmlFor="pass" className="muted">
              Confirmar Contraseña:
            </label>
            <input
              id="confirm-pass"
              type="password"
              autoComplete="confirm-password"
              placeholder="Confirma tu contraseña"
              {...register("confirmPassword", {
                required: "Ingresa la confirmación de tu contraseña",
                minLength: {
                  value: 6,
                  message:
                    "La confirmación de contraseña debe tener un mínimo de 6 caracteres",
                },
              })}
            />
          </>
        )}

        <div class="grid-column-2">
          <label class="check">
            <input id="remember" type="checkbox" />
            <span className="muted">Recordarme</span>
          </label>
        </div>

        <Button
          className="grid-column-2 btn-sweep"
          type="submit"
          disabled={isSubmitting}
        >
          {isLogin ? "INICIAR SESIÓN" : "REGISTRARSE"}
        </Button>

        <p class="muted grid-column-2">
          {!isLogin && (
            <>
              ¿Ya tienes una cuenta?
              <Link to="/app/login">Inicia Sesión</Link>
            </>
          )}
          {isLogin && (
            <>
              ¿No tienes una cuenta?
              <Link to="/app/register">Regístrate</Link>
            </>
          )}
        </p>
      </form>
      {Object.keys(errors).length > 0 && (
        <section className="form-validations">
          <ul>{errors.username && <small>{errors.username.message}</small>}</ul>
          <ul>{errors.password && <small>{errors.password.message}</small>}</ul>
          <ul>
            {errors.confirmPassword && (
              <small>{errors.confirmPassword.message}</small>
            )}
          </ul>
        </section>
      )}
    </>
  );
}
