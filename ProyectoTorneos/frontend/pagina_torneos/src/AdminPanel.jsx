import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function AdminPanel(props) {
  const [entityType, setEntityType] = useState("User");
  const [entityId, setEntityId] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (entityType) => {
    try {
      let response;
      switch (entityType) {
        case "User":
          response = await axios.get(`http://localhost:3001/auth/getUsers`, {
            headers: {
              Authorization: `Bearer ${props.sessionToken}`,
            },
          });
          break;
        case "Team":
          response = await axios.get(`http://localhost:3001/team/getTeams`, {
            headers: {
              Authorization: `Bearer ${props.sessionToken}`,
            },
          });
          break;
        case "Tournament":
          response = await axios.get(
            `http://localhost:3001/tournament/getTournaments`,
            {
              headers: {
                Authorization: `Bearer ${props.sessionToken}`,
              },
            }
          );
          break;
        case "Activity":
          response = await axios.get(
            `http://localhost:3001/activity/getActivitys`,
            {
              headers: {
                Authorization: `Bearer ${props.sessionToken}`,
              },
            }
          );
          break;
        default:
          return;
      }

      setResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdminAction = async () => {
    if (!entityId) return;
    try {
      await axios.delete(
        `http://localhost:3001/Auth/${entityType}/${entityId}`,
        {
          headers: {
            Authorization: `Bearer ${props.sessionToken}`,
          },
        }
      );
      alert(`${entityType} con ID: ${entityId} ha sido borrado.`);
      handleSearch(entityType);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="mt-5" style={{ marginTop: "1%" }}>Panel de administrador</h2>
      <br />
      <hr className="hr2" />
      <div className="d-flex justify-content-center">
        <Button
          style={{ marginRight: "1%" }}
          onClick={() => handleSearch("User")}
        >
          Buscar usuarios
        </Button>
        <Button
          style={{ marginRight: "1%" }}
          onClick={() => handleSearch("Team")}
        >
          Buscar equipos
        </Button>
        <Button
          style={{ marginRight: "1%" }}
          onClick={() => handleSearch("Tournament")}
        >
          Buscar torneos
        </Button>
        <Button
          style={{ marginRight: "15%" }}
          onClick={() => handleSearch("Activity")}
        >
          Buscar actividades
        </Button>
        <select
          value={entityType}
          className="mr-2"
          onChange={(e) => setEntityType(e.target.value)}
        >
          <option value="User">Usuario</option>
          <option value="Team">Equipo</option>
          <option value="Tournament">Torneo</option>
          <option value="Activity">Actividad</option>
        </select>
        <input
          type="text"
          value={entityId}
          onChange={(e) => setEntityId(e.target.value)}
          placeholder="ID de la entidad"
        />
        <Button className="ml-2 btn btn-danger" onClick={handleAdminAction}>
          Borrar entidad
        </Button>
      </div>

      {/* <div className="d-flex justify-content-end">
        
      </div> */}
      <hr className="hr2" />
      <div className="mr-4 ml-4 mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AdminPanel;
