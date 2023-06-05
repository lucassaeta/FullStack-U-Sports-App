import React from "react";
import "./App.css";
import utad_logo from "./img.swapcard.png";
import usports_logo from "./U-sports_logo.png";
import web_icon from "./web-globe-icon-23.png";
import Home from "./Home";
import axios from "axios";
import { useState, useEffect } from "react";
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

import "@fontsource/montserrat";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Admin from "./Admin";

function App() {
  const [logued, setLogued] = useState(false);
  const [show, setShow] = useState(false);
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [emailUser, setEmailUser] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validación de los campos de inicio de sesión
    if (!username || !password) {
      alert("Por favor, rellene todos los campos.");
      return;
    }
    if (!username.includes("@live.u-tad.com")) {
      alert("Por favor, introduzca un correo electrónico válido de U-Tad.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      console.log(response.data);
      setEmailUser(username);
      localStorage.setItem("email", username);

      // Comprobamos si la respuesta es un mensaje de error
      if (response.data === "User or Password incorrect") {
        alert(
          "Usuario o contraseña incorrectos. Por favor, intente nuevamente."
        );
        return;
      }

      const respUser = response.data;
      var user = respUser.substring(0, respUser.indexOf("@"));
      localStorage.setItem("user", user);
      const comienzo =
        respUser.indexOf("Sesion token: ") + "Sesion token: ".length;
      const token = respUser.slice(comienzo);
      localStorage.setItem("token", token);
      setLogued(true);
    } catch (error) {
      console.error("ERROR", error);
      alert("Usuario o contraseña incorrectos. Por favor, intente nuevamente.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const nickname = document.getElementById("nickname").value;
    const sport = document.getElementById("sport").value;
    const schedule = document.getElementById("schedule").value;
    const password = document.getElementById("password_r").value;
    const conf_password = document.getElementById("conf_password").value;

    // Validación de los campos de registro
    if (
      !name ||
      !email ||
      !nickname ||
      !sport ||
      !schedule ||
      !password ||
      !conf_password
    ) {
      alert("Por favor, rellene todos los campos.");
      return;
    }
    if (password !== conf_password) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    if (!email.includes("@") || !email.endsWith("live.u-tad.com")) {
      alert("Por favor, introduzca un correo electrónico válido de U-Tad.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        name,
        email,
        nickname,
        sport,
        schedule,
        password,
        conf_password,
      });
      // aaa@live.u-tad.com
      console.log(response.data);
      setEmailUser(email);
      var userR = email.substring(0, email.indexOf("@"));
      localStorage.setItem("email", email);
      localStorage.setItem("user", userR);

      if (response.data === "Necesitas un correo corporativo de U-Tad") {
        alert("Necesitas un correo corporativo de U-Tad");
      } else if (response.data.startsWith("¡User created!")) {
        // localStorage.setItem("user", userR);
        const comienzo = response.data.indexOf("token: ") + "token: ".length;
        let token = response.data.slice(comienzo);
        // Eliminar comillas dobles del token si existen
        token = token.replace(/"/g, "");
        localStorage.setItem("token", token);
        setLogued(true);
        alert("Usuario creado con exito");
        console.log(token);
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleStart = async (event) => {
    const user = localStorage.getItem("user");

    if (user && user.trim() !== "") {
      setLogued(true);
    } else {
      alert("Por favor, inicie sesión.");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (user && token) {
      setEmailUser(email);
      setLogued(true);
    } else {
      setLogued(false);
    }
  }, []);

  const isLogued = () => {
    if (logued) {
      if (emailUser === "admin@live.u-tad.com") {
        return (
          <Admin setLogued={setLogued} token={localStorage.getItem("token")} />
        );
      } else {
        return (
          <Home setLogued={setLogued} token={localStorage.getItem("token")} />
        );
      }
    } else {
      return (
        <>
          <Navbar>
            <img
              className="mr-4 responsive-image"
              src={utad_logo}
              style={{ maxWidth: "200px", maxHeight: "100px", margin: "auto" }}
            />
            <Container>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="mr-3">
                  <Nav.Link
                    href="#link"
                    style={{ color: "#0066ef" }}
                    onClick={handleShow}
                  >
                    Iniciar sesion
                  </Nav.Link>
                </Navbar.Text>
                <Navbar.Text>
                  <div className="collapse navbar-collapse" id="navbar-list-4">
                    <ul className="navbar-nav">
                      <li className="nav-item dropdown" align="end">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img
                            src={web_icon}
                            width="40"
                            height="40"
                            className="rounded-circle"
                          />
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="navbarDropdownMenuLink"
                          style={{ position: "absolute", right: 0 }}
                        >
                          <a className="dropdown-item" href="#">
                            Ingles
                          </a>
                          <a className="dropdown-item" href="#">
                            Español
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="d-flex justify-content-center mb-5">
            <hr />
          </div>
          <br></br>
          <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header>
              <Modal.Title>Inicia sesion</Modal.Title>
              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">✕</span>
              </button>
            </Modal.Header>
            <Modal.Body>
              {/* cuerpo del modal, aqui despliega el login y register */}
              <MDBContainer className="d-flex flex-column justify-content-center">
                <MDBTabs
                  pills
                  justify
                  className="mb-3 d-flex flex-row justify-content-between"
                >
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab1")}
                      active={justifyActive === "tab1"}
                    >
                      Iniciar sesion
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab2")}
                      active={justifyActive === "tab2"}
                    >
                      Registrarse
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                  <MDBTabsPane show={justifyActive === "tab1"}>
                    <br></br>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="E-mail"
                      id="username"
                      type="text"
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Contraseña"
                      id="password"
                      type="password"
                    />

                    <div className="d-flex justify-content-between mx-4 mb-4">
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheckDefault"
                        label="Recordarme"
                      />
                      <a href="!#">Olvide mi contraseña</a>
                    </div>
                    <Button
                      className="mb-4 w-100"
                      id="login-form"
                      onClick={handleLogin}
                    >
                      Iniciar Sesion
                    </Button>
                  </MDBTabsPane>

                  <MDBTabsPane show={justifyActive === "tab2"}>
                    <br></br>
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Nombre"
                      id="name"
                      type="text"
                    />
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Correo electronico"
                      id="email"
                      type="email"
                    />
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Nombre de usuario"
                      id="nickname"
                      type="text"
                    />
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Deporte(s) (Ej: Futbol, Baloncesto)"
                      id="sport"
                      type="text"
                    />
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Horario (Ej: 14:00-15:00)"
                      id="schedule"
                      type="text"
                    />
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Contraseña"
                      id="password_r"
                      type="password"
                    />
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Confirmar contraseña"
                      id="conf_password"
                      type="password"
                    />

                    <div className="d-flex justify-content-center mb-4">
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheckDefault"
                        label="Acepto terminos y condiciones"
                      />
                    </div>

                    <Button
                      className="mb-4 w-100"
                      id="register-form"
                      onClick={handleRegister}
                    >
                      Sign up
                    </Button>
                  </MDBTabsPane>
                </MDBTabsContent>
              </MDBContainer>
            </Modal.Body>
          </Modal>
          <div
            className="mt-5 justify-content-start"
            style={{ minHeight: "65%" }}
          >
            <div className="display-4">
              <p
                className="mr-auto"
                style={{ color: "#0066ef", fontFamily: "montserrat" }}
              >
                <b>Bienvenido a</b>
              </p>
              <img
                className="responsive-image"
                src={usports_logo}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            <br></br>
            <div className="d-block gap-2">
              <Button
                variant="primary"
                style={{ borderRadius: "20px", width: "150px" }}
                onClick={handleStart}
              >
                ¡Comienza!
              </Button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="App">
      {/* <Router>
        <Route exact path="/admin" component={AdminPanel} />
      </Router> */}
      {/* Aqui va la mitad de la pagina: welcome, home... */}
      <>{isLogued()}</>
      {/* parte de abajo */}
      <div id="holder">
        {/* <Link to="/calendar">
          <button>
            <img src="ruta_de_tu_imagen" alt="calendar_icon.jpg" />
          </button>
        </Link> */}
        <footer className="d-flex justify-content-center">
          <hr />
        </footer>
      </div>
    </div>
  );
}

export default App;
