import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa el archivo de localización en español
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configura moment en español
moment.locale("es");
const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [events, setEvents] = useState([]);

  const messages = {
    allDay: "Todo el día",
    previous: "Atrás",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    showMore: (total) => `+ Ver más (${total})`,
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res1 = await axios.get(
          "http://localhost:3001/activity/getActivitys",
          {
            headers: {
              Authorization: `Bearer ${props.sessionToken}`,
            },
          }
        );
        const activities = res1.data.map((e) => ({
          start: new Date(e.date),
          end: new Date(e.date),
          title: e.name,
          type: 'activity',
          color: '#0066ef'  // color para las actividades
        }));

        const res2 = await axios.get(
          "http://localhost:3001/tournament/getTournaments",
          {
            headers: {
              Authorization: `Bearer ${props.sessionToken}`,
            },
          }
        );
        const tournaments = res2.data.map((e) => ({
          start: new Date(e.date_start),
          end: new Date(e.date_end),
          title: e.name,
          type: 'tournament',
          color: '#5bd8c3',
          textColor: 'black'  // color para los torneos
        }));

        setEvents([...activities, ...tournaments]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '5px',
        opacity: 1,
        color: 'white',
        border: '0px',
        display: 'block',
        fontWeight: 'bold'
    };
    return {
        style: style
    };
  }

  return (
    <div style={{ height: "100%" }}>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        messages={messages}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;
