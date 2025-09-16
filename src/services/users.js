export const USERS = [
  {
    id: 1,
    name: "Demo Admin",
    email: "demo@demo.com",
    password: "demo123",
    role: "admin",
  },
  {
    id: 2,
    name: "User Básico",
    email: "user@site.com",
    password: "user123",
    role: "user",
  },
];

export function authenticate(email, password) {
  const e = (email || "").trim().toLowerCase();
  const p = password || "";
  const user = USERS.find(
    (u) => u.email.toLowerCase() === e && u.password === p
  );
  if (!user) return { ok: false, message: "Credenciales inválidas" };
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  );
  return { ok: true, user };
}
