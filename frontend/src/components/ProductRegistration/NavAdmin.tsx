import "../ProductRegistration/NavAdmin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../endpoints/api";

const NavAdmin: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/admin-login");
  };

  return (
    <div>
      <nav className="nav-admin-container">
        <ul className="login-logout-container">
          <li>
            <button
              className="submit-login-logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavAdmin;
