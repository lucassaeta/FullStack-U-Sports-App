import { useState, useEffect } from "react";
import axios from "axios";

function Results(props) {
  const [activity, setActivity] = useState([]);

  const getResults = async () => {
    const response = await axios.get("http://localhost:3001/activity/getActivitys", {
      headers: {
        Authorization: `Bearer ${props.sessionToken}`
      }
    });
    setActivity(response.data.reverse());
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      {activity.length > 0 ? (
        activity.map((actividad) => {
          // Convertir fecha de la actividad a formato legible
          const date = new Date(actividad.date);
          const formattedDate = date.toLocaleString();

          return (
            (actividad.result !== "" && (
              
              <div className="mr-5 ml-5 mb-5 mt-5">
                <div style={{height: "100%",width: "100%",border: "1.5px solid #0066ef",borderRadius: "30px"}}>
                  <div className="result-card" key={actividad._id}>
                    <h2 className="activity-name">{actividad.name}</h2>
                    <hr className="hr2"></hr>
                    <div className="result">
                      <h2 className="result-text">{actividad.result}</h2>
                    </div>
                    <div className="date-time">
                      <span className="date">{formattedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            )) || null
          );
        })
      ) : (
        <h2>No hay resultados disponibles...</h2>
      )}
    </div>
  );
}

export default Results;