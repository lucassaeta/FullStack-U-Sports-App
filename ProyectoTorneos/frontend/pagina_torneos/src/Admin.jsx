import React, { useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import bell_logo from "./bell_icon.png";
import usports_logo_mini from "./mini_usports.png";
import calendar_logo from "./calendar_icon.jpg";
import web_icon from "./web-globe-icon-23.png";
import chat from "./chat.png";
import "@fontsource/montserrat";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import Chat from "./Chat";
import Teams from "./Teams";
import Calendar from "./Calendar";
import Tournaments from "./Tournaments";
import Results from "./Results";
import Profile from "./Profile";
import Notificaciones from "./Notificaciones";
import Actividades from "./Actividades";
import Anuncios from "./Anuncios";
import AdminPanel from "./AdminPanel";

function Admin (props) {
  const [showContent, setShowContent] = useState(false);
  const [userImage, setUserImage] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/getUser", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      setUserImage(response.data.profilePic); // Nueva línea para la imagen
    } catch (err) {
      console.error(err);
    }
  };

  function handleButtonClick(buttonId) {
    switch (buttonId) {
      case "btn-1":
        setShowContent(<Anuncios sessionToken={props.token}></Anuncios>);
        break;
      case "btn-2":
        setShowContent(<Teams sessionToken={props.token}></Teams>);
        break;
      case "btn-3":
        setShowContent(<Tournaments sessionToken={props.token}></Tournaments>);
        break;
      case "btn-4":
        setShowContent(<Actividades sessionToken={props.token}></Actividades>);
        break;
      case "btn-5":
        setShowContent(<Results sessionToken={props.token}></Results>);
        break;
      case "Admin":
        setShowContent(<AdminPanel sessionToken={props.token}></AdminPanel>);
        break;
      case "Profile":
        setShowContent(<Profile setUserImage={setUserImage} sessionToken={props.token}></Profile>);
        break;
      case "Logs":
        setShowContent(<Notificaciones sessionToken={props.token}></Notificaciones>);
        break;
      case "Chat":
        setShowContent(<Chat sessionToken={props.token}></Chat>);
        break;
      case "Calendar":
        setShowContent(<Calendar sessionToken={props.token}></Calendar>);
        break;
      case "cerrarsesion":
        break;
      default:
        setShowContent(null);
    }
  }

  const handleLogout = async () => {
    localStorage.clear();
    props.setLogued(false);
  };

  useEffect(() => {
    setShowContent(<Calendar sessionToken={props.token}></Calendar>);
    getUserDetails();
  }, [props.token]);

  return (
    <>
      <Navbar>
        <img
          className="mr-3 mt-3 responsive-image"
          src={usports_logo_mini}
          style={{ width: "20%", height: "10%", marginLeft: "auto" }}
        />
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text
              className="mr-4"
              style={{ maxWidth: "3%", maxHeight: "3%" }}
            >
              <img
                src={calendar_logo}
                id="imgCalendar"
                onClick={() => handleButtonClick("Calendar")}
              ></img>
            </Navbar.Text>
            <Navbar.Text
              className="mr-4"
              style={{ maxWidth: "3%", maxHeight: "3%" }}
            >
              <img
                src={bell_logo}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  cursor: "pointer",
                }}
                onClick={() => handleButtonClick("Logs")}
              ></img>
            </Navbar.Text>
            <Navbar.Text
              className="mr-4"
              style={{ maxWidth: "3%", maxHeight: "3%" }}
            >
              <img
                src={chat}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  cursor: "pointer",
                }}
                onClick={() => handleButtonClick("Chat")}
              ></img>
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
                        src={userImage}
                        width="40"
                        height="40"
                        className="rounded-circle"
                      />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleButtonClick("Profile")}
                      >
                        Mi perfil
                      </a>

                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleLogout}
                      >
                        Cerrar sesion
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="d-flex justify-content-center mb-2">
        <hr />
      </div>
      <div
        className="d-flex justify-content-center containerPrincipal"
        style={{ minHeight: "100hv", height: "79%" }}
      >
        <div
          className="mr-2"
          style={{
            width: "20%",
          }}
        >
          <Button
            className="rounded-blue-button btn btn-primary"
            id="btn-1"
            onClick={() => handleButtonClick("btn-1")}
            style={{ width: "100%", height: "10%" }}
          >
            <b>ANUNCIOS</b>
          </Button>
          <Button
            className="rounded-blue-button btn btn-primary"
            id="btn-2"
            onClick={() => handleButtonClick("btn-2")}
            style={{ width: "100%", height: "10%" }}
          >
            <b>EQUIPOS</b>
          </Button>
          <Button
            className="rounded-blue-button btn btn-primary"
            id="btn-3"
            onClick={() => handleButtonClick("btn-3")}
            style={{ width: "100%", height: "10%" }}
          >
            <b>TORNEOS</b>
          </Button>
          <Button
            className="rounded-blue-button btn btn-primary"
            id="btn-4"
            onClick={() => handleButtonClick("btn-4")}
            style={{ width: "100%", height: "10%" }}
          >
            <b>ACTIVIDADES</b>
          </Button>
          <Button
            className="rounded-blue-button btn btn-primary"
            id="btn-5"
            onClick={() => handleButtonClick("btn-5")}
            style={{ width: "100%", height: "10%" }}
          >
            <b>ULTIMOS RESULTADOS</b>
          </Button>
          <Button
            className="rounded-red-button btn btn-danger"
            id="btn-5"
            onClick={() => handleButtonClick("Admin")}
            style={{ width: "100%", height: "10%" }}
          >
            <b>PANEL DE ADMINISTRADOR</b>
          </Button>
        </div>
        <div
          className="scrollable"
          style={{
            width: "80%",
            border: "1.5px solid #0066ef",
            borderRadius: "30px",
          }}
        >
          {/* cosas a cargar en el cuadrado grande*/}
          {showContent}
        </div>
      </div>
    </>
  );
}

export default Admin;
