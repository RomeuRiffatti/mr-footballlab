import { useState } from "react";
import { login, logout } from "../../endpoints/api";
import { useNavigate } from "react-router-dom";
const LoginAdmin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
  };
  const handleLogin = async () => {
    login(username, password);
    nav("/product-registration");
  };

  return (
    <div className="login">
      <form>
        <div className="login-input-div">
          <label htmlFor="username">Usuário: </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            type="text"
            required
          />
        </div>
        <div className="login-input-div">
          <label htmlFor="password">Senha: </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            name="password"
            id="password"
            autoComplete="senha"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="submit-login-logout-button"
        >
          Entrar
        </button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginAdmin;
