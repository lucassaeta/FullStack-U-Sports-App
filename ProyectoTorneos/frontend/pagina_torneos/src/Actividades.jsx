import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Dropdown, Alert } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

function Actividades(props) {
  const [activity, setActivity] = useState([]);
  const [filteredActivity, setFilteredActivity] = useState([]);
  const [filter, setFilter] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [result, setResult] = useState("");

  const getActivities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/activity/getActivitys",
        {
          headers: {
            Authorization: `Bearer ${props.sessionToken}`,
          },
        }
      );
      setActivity(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  useEffect(() => {
    let currentDateTime = new Date();
    let filteredData = activity;

    if (filter === "finished") {
      filteredData = filteredData.filter((a) => a.result !== ""); // Aquí filtramos las actividades que ya tienen un resultado
    } else if (filter === "upcoming") {
      filteredData = filteredData.filter(
        (a) => new Date(a.date) > currentDateTime && a.result === ""
      ); // Aquí mostramos solo actividades que aún no tienen un resultado
    }

    if (sportFilter !== "") {
      filteredData = filteredData.filter((a) => a.sport === sportFilter);
    }

    setFilteredActivity(filteredData);
  }, [activity, filter, sportFilter]);

  const handleRegister = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const sport = document.getElementById("sport").value;
    const date = document.getElementById("date").value;
    const privacity = "true";
    const max_plazas = document.getElementById("max_plazas").value;
    const status = "true";
    const result = "";
    const place = document.getElementById("place").value;

    try {
      const response = await axios.post(
        "http://localhost:3001/activity/createActivity",
        {
          name,
          description,
          sport,
          date,
          privacity,
          max_plazas,
          status,
          result,
          place,
        },
        {
          headers: {
            Authorization: `Bearer ${props.sessionToken}`,
            api_key: "Api-publica-123",
          },
        }
      );
      console.log(response.data);
      alert("Actividad creada exitosamente.");
      // setShowAlert(true);
      // setAlertVariant("success");
      // setAlertMessage("Equipo creado exitosamente.");

      handleCloseModal(); // Cierra el modal
      getActivities(); // Actualiza las actividades
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("No se pudo crear el equipo.");
    }
  };

  const handleResultModalClose = () => setShowResultModal(false);

  const handleResultModalShow = (activityId) => {
    // Acepta activityId como parámetro
    setSelectedActivity(activityId);
    setShowResultModal(true);
  };

  const handleResultSubmit = async () => {
    console.log(selectedActivity);
    const url = `http://localhost:3001/activity/submitResult/${selectedActivity}`; // Usa selectedActivity aquí
    console.log(url);
    const headers = {
      Authorization: `Bearer ${props.sessionToken}`,
    };
    const data = {
      result,
    };
    try {
      await axios.put(url, data, { headers });
      setShowResultModal(false);
      const response = await axios.get(
        "http://localhost:3001/activity/getActivitys",
        {
          headers: {
            Authorization: `Bearer ${props.sessionToken}`,
          },
        }
      );
      setActivity(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSportFilterChange = (value) => {
    setSportFilter(value);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <div className="filter-container">
        <div className="d-flex justify-content-around mt-4 ml-4">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="filter-dropdown">
              Filtro
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterChange("")}>
                Todas las actividades
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange("finished")}>
                Actividades Finalizadas
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange("upcoming")}>
                Próximas Actividades
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            as="select"
            className="mr-4 ml-4"
            value={sportFilter}
            onChange={(e) => handleSportFilterChange(e.target.value)}
          >
            <option value="">Todos los deportes</option>
            <option value="Futbol">Fútbol</option>
            <option value="Tenis">Tenis</option>
            <option value="Baloncesto">Baloncesto</option>
          </Form.Control>
          <Button
            variant="primary"
            onClick={handleShowModal}
            style={{
              textAlign: "center",
              width: "30%",
              height: "30%",
              marginRight: "3%",
            }}
          >
            Crear Actividad
          </Button>
        </div>
      </div>

      <hr className="hr2"></hr>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title className="mr-4">Crear una actividad</Modal.Title>
          <button type="button" className="close" onClick={handleCloseModal}>
            <span aria-hidden="true">✕</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" id="name" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" id="description" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deporte (Ej: Futbol, Baloncesto)</Form.Label>
              <Form.Control type="text" id="sport" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="datetime-local" id="date" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Máximo de plazas</Form.Label>
              <Form.Control type="number" id="max_plazas" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lugar (Ej: Cancha de Futbol)</Form.Label>
              <Form.Control type="text" id="place" required />
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Alert
        variant={alertVariant}
        show={showAlert}
        onClose={handleAlertClose}
        dismissible
      >
        {alertMessage}
      </Alert>

      {filteredActivity.length > 0 ? (
        filteredActivity.map((actividad) => {
          // Convertir fecha de la actividad a formato legible
          const date = new Date(actividad.date);
          const formattedDate = date.toLocaleString();
          return (
            <div className="d-flex justify-content-around flex-wrap mr-5 ml-5 mb-5 mt-5">
              <div
                style={{
                  height: "100%",
                  width: "70%",
                  border: "1.5px solid #0066ef",
                  borderRadius: "30px",
                }}
              >
                <br></br>
                <h4 className="text-center">{actividad.name}</h4>
                <hr className="hr2"></hr>
                <Row>
                  <Col className="text-right font-weight-bold">
                    Descripcion:
                  </Col>
                  <Col className="text-left">{actividad.description}</Col>
                </Row>
                <Row>
                  <Col className="text-right font-weight-bold">Deporte:</Col>
                  <Col className="text-left">{actividad.sport}</Col>
                </Row>
                <Row>
                  <Col className="text-right font-weight-bold">Fecha:</Col>
                  <Col className="text-left">{formattedDate}</Col>
                </Row>
                <Row>
                  <Col className="text-right font-weight-bold">
                    Maximo de Plazas:
                  </Col>
                  <Col className="text-left">{actividad.max_plazas}</Col>
                </Row>
                <Row>
                  <Col className="text-right font-weight-bold">Lugar:</Col>
                  <Col className="text-left">{actividad.place}</Col>
                </Row>
                <Row>
                  <Col className="text-right font-weight-bold">Resultado:</Col>
                  <Col className="text-left">
                    {actividad.result ? actividad.result : "Aun no concluido"}
                  </Col>
                </Row>
                {actividad.result === "" && ( // Solo mostrar el botón si el resultado de la actividad es ""
                  <Button
                    style={{
                      textAlign: "center",
                      width: "15%",
                      height: "30%",
                      marginLeft: "auto",
                      marginRight: "0",
                      marginBottom: "2%",
                      marginTop: "1%",
                    }}
                    className="ml-auto"
                    variant="primary"
                    onClick={() => handleResultModalShow(actividad.id)} // Pasa actividad.id directamente
                  >
                    Añadir Resultado
                  </Button>
                )}
                <br></br>
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ color: "black" }}>No hay actividades disponibles...</p>
      )}
      <Modal show={showResultModal} onHide={handleResultModalClose}>
        <Modal.Header>
          <Modal.Title>Añadir Resultado</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={handleResultModalClose}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="result">
              <Form.Label>Resultado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Result"
                onChange={(e) => setResult(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={handleResultSubmit}>
              Añadir
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Actividades;
