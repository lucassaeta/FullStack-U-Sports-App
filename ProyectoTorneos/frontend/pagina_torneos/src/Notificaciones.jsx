import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notificaciones.css';

const Notificaciones = (props) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotificaciones = async () => {
      try {
        const response = await axios.get("http://localhost:3001/logs/getLogs", {
          headers: {
            Authorization: `Bearer ${props.sessionToken}`
          }
        });
        setNotificaciones(response.data.reverse());
      } catch (error) {
        setError('Error al cargar las notificaciones');
      }
    };

    getNotificaciones();
  }, [props.sessionToken]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const getImage = (message) => {
    if (message.includes("equipo")) {
      return "https://img.freepik.com/vector-premium/deporte-trabajo-equipo-celebracion-concepto-ganador_140689-1142.jpg";
    } else if (message.includes("actividad")) {
      return "https://tecolotito.elsiglodetorreon.com.mx/i/2021/07/1456925.jpeg";
    } else if (message.includes("torneo")) {
      return "https://e7.pngegg.com/pngimages/918/40/png-clipart-sports-team-others-miscellaneous-sport.png";
    } else if (message.includes("actualizado")) {
      return "https://i.pinimg.com/originals/fd/3b/de/fd3bde6ba2d10e5395ad7ed2fdf76231.png";
    }
     else {
      return null;
    }
  }

  return (
    <div className="notificaciones">
      <h2>Notificaciones</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        notificaciones.map((notif, index) => (
          <div key={index} className="notificacion">
            {getImage(notif.message) && (
              <img src={getImage(notif.message)} alt="notificacion-img" className="notificacion-img" />
            )}
            <div className="notificacion-content">
              <p style={{color:"black"}} className="notificacion-message">
                <strong>{notif.message}</strong>
              </p>
              <p style={{color:"black"}} className="notificacion-date">
                {formatDate(notif.date)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notificaciones;