import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import Button from "react-bootstrap/Button";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      setLoggedIn(true);
    } else {
      console.log("Datos de inicio de sesión incorrectos");
    }
  };

  if (loggedIn) {
    // setTimeout(() => {
    //   navigate("/admin"); // Redirige a la ruta '/admin' tus muertos
    // }, 0);
  }

  return (
    <div>
      <br></br>
      <h2>Inicio de Sesión Administrador</h2>
      <form>
        <div>
          <label htmlFor="username">Usuario: </label>
          <MDBInput
            wrapperClass="mb-3"
            label=""
            id="name"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña: </label>
          <MDBInput
            wrapperClass="mb-3"
            label=""
            id="password_r"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="mb-4 w-100 btn btn-secondary btn-square"
          id="login-form"
          onClick={handleLogin}
        >
          Sign in
        </Button>
      </form>
      <br></br>
      <br></br>
    </div>
  );
}

export default LoginAdmin;
