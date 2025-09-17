import { useMemo } from "react";

export default function StaggerButton({
  id,
  text = "Label",
  delay = 50,
  className = "",
  inputProps = {},
}) {
  const chars = useMemo(() => Array.from(text), [text]);
  return (
    <div className={`form-control ${className}`}>
      <input
        id={id}
        // Usa text por defecto; puedes sobreescribir con inputProps
        type="text"
        required
        placeholder=" " // importante para :placeholder-shown
        autoComplete="off"
        {...inputProps}
      />

      <label htmlFor={id} style={{ "--delay": `${delay}ms` }}>
        {chars.map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            style={{
              transitionDelay: `calc(var(--i) * var(--delay))`,
              "--i": i,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </label>
    </div>
  );
}
