import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Profile(props) {
  const [user, setUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false); // Para el modal
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [teams, setTeams] = useState([]);
  const [sport, setSport] = useState("");
  const [publications, setPublications] = useState([]);

  const getUserPublications = async (userNickname) => {
    try {
      const response = await axios.get("http://localhost:3001/logs/getLogs", {
        headers: {
          Authorization: `Bearer ${props.sessionToken}`,
        },
      });

      const userPublications = response.data
        .reverse()
        .filter((pub) => pub.message.includes(userNickname));

      setPublications(userPublications);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/getUser", {
        headers: {
          Authorization: `Bearer ${props.sessionToken}`,
        },
      });
      setName(response.data.name);
      setNickname(response.data.nickname);
      setSport(response.data.sport);
      setUser(response.data.email);
      setImage(response.data.profilePic); // Nueva línea para la imagen
      getUserPublications(response.data.sport);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserTeams = async () => {
    try {
      const response = await axios.get("http://localhost:3001/team/myTeams", {
        headers: {
          Authorization: `Bearer ${props.sessionToken}`,
        },
      });
      setTeams(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModal = () => {
    // Para manejar el modal
    setShowModal(!showModal);
  };

  const updateProfile = async () => {
    // Función para actualizar el perfil
    const body = {
      name,
      nickname,
      profilePic: image,
      sport,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/update",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            api_key: "Api-publica-123",
            Authorization: `Bearer ${props.sessionToken}`,
          },
        }
      );
      if (response.status === 200) {
        handleModal();
        getUserDetails();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserDetails();
    getUserTeams();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.value);
    props.setUserImage(e.target.value);
  };

  return (
    <>
      <div className="scrollable" style={{ height: "auto" }}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "30vh" }}
        >
          <div
            className=""
            style={{
              width: "20%",
            }}
          >
            <img
              src={image} // Imagen del usuario
              width="200"
              height="200"
              style={{ border: "1px solid #0066ef" }}
              className="rounded-circle"
            />
          </div>
          <div
            className="mt-3 ml-5 d-flex flex-column align-items-start"
            style={{
              width: "50%",
            }}
          >
            <h2>
              <b>Apodo:</b> {nickname}
            </h2>
            <h2>
              <b>Nombre:</b> {name}
            </h2>
            <h2>
              <b>Deporte(s):</b> {sport}
            </h2>
          </div>
          <div
            className="d-flex flex-column align-items-center mt-5"
            style={{
              width: "20%",
            }}
          >
            <Button className="btn btn-primary" onClick={handleModal}>
              Editar
            </Button>
            <Modal show={showModal} onHide={handleModal}>
              <Modal.Header>
                <Modal.Title>Editar Perfil</Modal.Title>
                <button type="button" className="close" onClick={handleModal}>
                  <span aria-hidden="true">✕</span>
                </button>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apodo</Form.Label>
                    <Form.Control
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Deporte(s) (Ej: Futbol, Baloncesto)</Form.Label>
                    <Form.Control
                      type="text"
                      value={sport}
                      onChange={(e) => setSport(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Foto de Perfil (URL de la imagen)</Form.Label>
                    <Form.Control
                      type="text"
                      value={image}
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModal}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={updateProfile}>
                  Guardar Cambios
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <hr className="hr"></hr>
        <br></br>
        {/* 
            MIS EQUIPOS */}

        <div className="d-flex justify-content-around flex-wrap mr-5 ml-5 mb-5 mt-5">
          <div
            style={{
              height: "100%",
              width: "100%",
              border: "1.5px solid #0066ef",
              borderRadius: "30px",
            }}
          >
            <h2 style={{ paddingTop: "2%" }}>Mis equipos</h2>
            <hr className="hr2"></hr>
            <br></br>
            <div className="d-flex justify-content-center">
              {teams.map((team) => (
                <div key={team._id} style={{ padding: "2%" }}>
                  <img
                    src={team.logo} // Imagen del equipo
                    width="100"
                    height="100"
                    className="rounded-circle"
                    style={{ border: "1px solid #0066ef" }}
                  />
                  <h5>{team.name}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mis Publicaciones */}
        <div className="d-flex justify-content-around flex-wrap mr-5 ml-5 mb-5 mt-5">
          <div
            style={{
              height: "100%",
              width: "100%",
              border: "1.5px solid #0066ef",
              borderRadius: "30px",
            }}
          >
            <h2 style={{ paddingTop: "2%" }}>Mis notificaciones</h2>
            <hr className="hr2"></hr>
            <br></br>
            <div className="d-flex flex-column align-items-center">
              {publications.map((pub) => (
                <div key={pub._id}>
                  <strong>{pub.message}</strong>
                  <h6>
                    {new Date(pub.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h6>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
