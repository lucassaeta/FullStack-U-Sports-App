import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

function Tournaments(props) {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [sportFilter, setSportFilter] = useState("");
  const [formattedDateStart, setFormattedDateStart] = useState("");
  const [formattedDateEnd, setFormattedDateEnd] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [teamId, setTeamId] = useState(1); // Suponiendo que el id del equipo es 1
  const [teams, setTeams] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [refreshTeams, setRefreshTeams] = useState(false);
  const [equipos, setEquipos] = useState([]);
  const [matches, setMatches] = useState({});
  const [showMatchesModal, setShowMatchesModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleShowMatchesModal = () => setShowMatchesModal(true);
  const handleCloseMatchesModal = () => {
    setCurrentGroup(0);
    setShowMatchesModal(false);
  };
  const [currentGroup, setCurrentGroup] = useState(0);

  // State for form input values
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    sport: "",
    date_start: "",
    date_end: "",
    min_teams: "",
    max_teams: "",
    max_players_team: "",
    type: "",
    privacity: "",
  });

  useEffect(() => {
    console.log(matches);
    axios
      .get("http://localhost:3001/team/myTeams", {
        headers: {
          Authorization: `Bearer ${props.sessionToken}`,
        },
      })
      .then((res) => setEquipos(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubscribeTeam = async () => {
    if (!equipoSeleccionado) {
      alert("Por favor selecciona un equipo primero");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/tournament/subscribeTeamToTournament",
        {
          teamId: equipoSeleccionado.id,
          tournamentId: selectedTournament.id,
        },
        {
          headers: {
            Authorization: `Bearer ${props.sessionToken}`,
            api_key: "Api-publica-123",
          },
        }
      );

      if (response.status === 200) {
        alert("Inscripción exitosa!");
        setRefreshTeams(!refreshTeams);
      }
    } catch (error) {
      alert("Número maximo de equipos en el torneo sobrepasado.");
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/tournament/getTournaments", {
        headers: {
          Authorization: `Bearer ${props.sessionToken}`,
        },
      })
      .then((response) => {
        setTournaments(response.data);
      });
  }, []);

  useEffect(() => {
    if (selectedTournament) {
      axios
        .get(
          `http://localhost:3001/tournament/getTeamsInTournament/${selectedTournament.id}`,
          {
            headers: {
              Authorization: `Bearer ${props.sessionToken}`,
              api_key: "Api-publica-123",
            },
          }
        )
        .then((response) => {
          setTeams(response.data[0].teams);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedTournament, props.sessionToken, refreshTeams]);

  const handleSportFilterChange = (event) => {
    setSportFilter(event.target.value);
  };

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const selectTournament = (tournament) => {
    if (selectedTournament && selectedTournament.id === tournament.id) {
      setSelectedTournament(null);
      setFormattedDateStart("");
      setFormattedDateEnd("");
    } else {
      setSelectedTournament(tournament);

      // Update formatted dates
      const date1 = new Date(tournament.date_start);
      const date2 = new Date(tournament.date_end);
      setFormattedDateStart(date1.toLocaleString());
      setFormattedDateEnd(date2.toLocaleString());
    }
  };

  const handleSelect = (selectedKey) => {
    const selectedTeam = equipos.find(
      (equipo) => equipo.id === Number(selectedKey)
    );
    setEquipoSeleccionado(selectedTeam);
  };

  const filteredTournaments = sportFilter
    ? tournaments.filter((tournament) => tournament.sport === sportFilter)
    : tournaments;

  const handleCreateTournament = async (event) => {
    event.preventDefault();
    const newTournamentData = {
      ...formValues,
      min_teams: Number(formValues.min_teams),
      max_teams: Number(formValues.max_teams),
      max_players_team: Number(formValues.max_players_team),
      type: Number(formValues.type),
      privacity: Number(formValues.privacity),
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/tournament/createTournament",
        newTournamentData,
        {
          headers: {
            Authorization: `Bearer ${props.sessionToken}`,
          },
        }
      );

      if (response.status === 201) {
        const updatedTournaments = await axios.get(
          "http://localhost:3001/tournament/getTournaments",
          {
            headers: {
              Authorization: `Bearer ${props.sessionToken}`,
            },
          }
        );
        setTournaments(updatedTournaments.data);
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateTournament = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/tournament/generateTournament",
        {
          tournamentId: selectedTournament.id,
        },
        {
          headers: {
            Authorization: `Bearer ${props.sessionToken}`,
            api_key: "Api-publica-123",
          },
        }
      );

      if (response.status === 201) {
        setMatches(response.data);
      }
    } catch (error) {
      alert("No se ha cumplido el mínimo de equipos necesarios.");
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(matches);
  }, [matches]);

  return (
    <>
      <div>
        <div className="filter-container">
          <div className="d-flex justify-content-around ml-4 mt-4">
            <Form.Control
              as="select"
              className="mr-4 ml-4"
              value={sportFilter}
              onChange={handleSportFilterChange}
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
              Crear Torneo
            </Button>
          </div>
        </div>

        <hr className="hr2"></hr>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Crear nuevo torneo</Modal.Title>
            <button type="button" className="close" onClick={handleCloseModal}>
              <span aria-hidden="true">✕</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateTournament}>
              <Form.Group controlId="formTournamentName">
                <Form.Label>Nombre del torneo: </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Add additional form fields here */}
              <Form.Group controlId="formTournamentDescription">
                <Form.Label>Descripcion: </Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTournamentSport">
                <Form.Label>Deporte (Ej: Futbol, Baloncesto) </Form.Label>
                <Form.Control
                  type="text"
                  name="sport"
                  value={formValues.sport}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTournamentDateStart">
                <Form.Label>Fecha de Inicio: </Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="date_start"
                  value={formValues.date_start}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTournamentDateEnd">
                <Form.Label>Fecha de Final: </Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="date_end"
                  value={formValues.date_end}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTournamentMinTeams">
                <Form.Label>Numero minimo de Equipos: </Form.Label>
                <Form.Control
                  type="number"
                  name="min_teams"
                  value={formValues.min_teams}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTournamentMaxTeams">
                <Form.Label>Numero maximo de Equipos: </Form.Label>
                <Form.Control
                  type="number"
                  name="max_teams"
                  value={formValues.max_teams}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTournamentMaxPlayersTeam">
                <Form.Label>Maximo de jugadores por equipo: </Form.Label>
                <Form.Control
                  type="number"
                  name="max_players_team"
                  value={formValues.max_players_team}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTournamentType">
                <Form.Label>Tipo: </Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={formValues.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="1">Teams only</option>
                  <option value="2">Teams + Individual Players</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formTournamentPrivacity">
                <Form.Label>Privacidad: </Form.Label>
                <Form.Control
                  as="select"
                  name="privacity"
                  value={formValues.privacity}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Privacy</option>
                  <option value="1">Private Tournament</option>
                  <option value="2">Public Tournament</option>
                </Form.Control>
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Crear torneo
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        {filteredTournaments.map((tournament) => {
          return (
            <>
              <div className="d-flex justify-content-around flex-wrap mr-3 ml-3 mb-3 mt-3">
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    border: "1.5px solid #0066ef",
                    borderRadius: "30px",
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    className="font-weight-bold mr-3 ml-3 mb-3 mt-3"
                    key={tournament.id}
                    onClick={() => selectTournament(tournament)}
                  >
                    {tournament.name}
                  </div>
                </div>
              </div>
            </>
          );
        })}

        <hr className="hr2"></hr>

        {selectedTournament && (
          <div className="d-flex justify-content-around flex-wrap mr-5 ml-5 mb-5 mt-5">
            <div
              style={{
                height: "100%",
                width: "100%",
                border: "1.5px solid #0066ef",
                borderRadius: "30px",
              }}
            >
              <br></br>
              <h2 className="text-center font-weight-bold ">
                {selectedTournament.name}
              </h2>
              <hr className="hr2"></hr>

              <Row>
                <Col className="text-right font-weight-bold">Descripcion:</Col>
                <Col className="text-left">
                  {selectedTournament.description}
                </Col>
              </Row>
              <Row>
                <Col className="text-right font-weight-bold">Deporte:</Col>
                <Col className="text-left">{selectedTournament.sport}</Col>
              </Row>
              <Row>
                <Col className="text-right font-weight-bold">
                  Fecha de Inicio:
                </Col>
                <Col className="text-left">{formattedDateStart}</Col>
              </Row>
              <Row>
                <Col className="text-right font-weight-bold">
                  Fecha de Final:
                </Col>
                <Col className="text-left">{formattedDateEnd}</Col>
              </Row>
              <Row>
                <Col className="text-right font-weight-bold">
                  Minimo de equipos:
                </Col>
                <Col className="text-left">{selectedTournament.min_teams}</Col>
              </Row>
              <Row>
                <Col className="text-right font-weight-bold">
                  Maximo de equipos:
                </Col>
                <Col className="text-left">{selectedTournament.max_teams}</Col>
              </Row>
              <Row>
                <Col className="text-right font-weight-bold">
                  Maximo de jugadores por equipo:
                </Col>
                <Col className="text-left">
                  {selectedTournament.max_players_team}
                </Col>
              </Row>
              <br></br>
              <div className="d-flex justify-content-center">
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle variant="light" style={{border: "1px solid #0066ef"}} id="dropdown-basic">
                    {equipoSeleccionado
                      ? equipoSeleccionado.name
                      : "Selecciona un equipo"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {equipos.map((equipo) => (
                      <Dropdown.Item eventKey={equipo.id}>
                        {equipo.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  className="mb-3 ml-3"
                  style={{ borderRadius: "50px" }}
                  variant="primary"
                  onClick={handleSubscribeTeam}
                >
                  ✚
                </Button>
              </div>
              <Modal
                show={showMatchesModal}
                size="lg"
                onHide={handleCloseMatchesModal}
              >
                <Modal.Header>
                  <Modal.Title>Enfrentamientos</Modal.Title>
                  <button
                    type="button"
                    className="close"
                    onClick={handleCloseMatchesModal}
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                </Modal.Header>
                <Modal.Body>
                  {Object.keys(matches).map((group, index) => {
                    if (index === currentGroup) {
                      return (
                        <div key={index}>
                          <div className="d-flex justify-content-between">
                            <Button
                              variant="secondary"
                              onClick={() =>
                                setCurrentGroup(
                                  (currentGroup -
                                    1 +
                                    Object.keys(matches).length) %
                                    Object.keys(matches).length
                                )
                              }
                              disabled={Object.keys(matches).length === 1}
                            >
                              ◀
                            </Button>
                            <h5>
                              <b>{group}</b>
                            </h5>
                            <Button
                              variant="secondary"
                              onClick={() =>
                                setCurrentGroup(
                                  (currentGroup + 1) %
                                    Object.keys(matches).length
                                )
                              }
                              disabled={Object.keys(matches).length === 1}
                            >
                              ▶
                            </Button>
                          </div>
                          <div className="card mt-3 text-center">
                            <div className="card-header font-weight-bold h2">
                              Equipos
                            </div>
                            <ul className="list-group list-group-flush">
                              {matches[group].teams.map((team, i) => (
                                <li key={i} className="list-group-item">
                                  {team}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="card mt-3 text-center">
                            <div className="card-header font-weight-bold h2">
                              Partidos
                            </div>
                            {Object.keys(matches[group].matches).map(
                              (jornada) => (
                                <div key={jornada} className="card-body">
                                  <div className="media">
                                    <h5 className="mr-3 mt-custom">
                                      {jornada}
                                    </h5>
                                    <div className="media-body">
                                      <ul className="list-group list-group-flush">
                                        {matches[group].matches[jornada].map(
                                          (match, i) => (
                                            <li
                                              key={i}
                                              className="list-group-item"
                                            >
                                              {match[0]} vs {match[1]}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMatchesModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="d-flex justify-content-around flex-wrap mr-5 ml-5 mb-5 mt-4">
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    border: "1.5px solid #0066ef",
                    borderRadius: "30px",
                  }}
                >
                  <h2 className="mt-3 mb-3">Equipos Participantes</h2>
                  <hr className="hr2"></hr>
                  <div className="d-flex justify-content-around flex-wrap">
                    {teams.map((team) => (
                      <div key={team.id}>
                        <img
                          src={team.logo}
                          style={{
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                          }}
                          alt={team.name}
                        />
                        <h5>{team.name}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  className="mb-4"
                  variant="primary"
                  onClick={handleGenerateTournament}
                >
                  Generar Enfrentamientos
                </Button>
                {Object.keys(matches).length !== 0 && (
                  <Button
                    className="mb-4 ml-2 btn-secondary"
                    variant="primary"
                    onClick={handleShowMatchesModal}
                  >
                    Mostrar Enfrentamientos
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Tournaments;
