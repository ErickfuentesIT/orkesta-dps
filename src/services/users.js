export const USERS = [
  {
    id: 1,
    username: "useradmin",
    email: "demo@demo.com",
    password: "demo123",
    role: "admin",
  },
  {
    id: 2,
    username: "usernormal",
    email: "user@site.com",
    password: "user123",
    role: "user",
  },
];

export function authenticate(username, password) {
  const e = (username || "").trim().toLowerCase();
  const p = password || "";
  const user = USERS.find(
    (u) => u.username.toLowerCase() === e && u.password === p
  );
  if (!user) return { ok: false, message: "Credenciales inválidas" };
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
    })
  );
  return { ok: true, user };
}
