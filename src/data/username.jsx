const users = [{ user: "user", pass: "pass", role: "admin", token: "user" }];

export function verifyUser(user, pass) {
  const userFound = users.find(
    (u) => u.user === user && u.pass === pass
  );
  return userFound ? { token: userFound.token, role: userFound.role } : null;
}