import React, { useEffect, useState } from 'react';
import api from '../api';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/EventList.css';

const badgeColors = {
  Merger: 'badge-blue',
  Dividends: 'badge-green',
  Hire: 'badge-orange',
  'New Capital': 'badge-purple',
};

const EventList = ({ events = [], onEdit }) => {
  const [localEvents, setLocalEvents] = useState(events);

  useEffect(() => {
    if (events.length === 0) {
      api.get('/events/')
        .then(res => setLocalEvents(res.data))
        .catch(err => console.error(err));
    } else {
      setLocalEvents(events);
    }
  }, [events]);

  const deleteEvent = (id) => {
    if (window.confirm('Delete this event?')) {
      api.delete(`/events/${id}/`).then(() => {
        api.get('/events/').then(res => setLocalEvents(res.data));
      });
    }
  };

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">📋 Your Events</h2>

      <div className="event-grid">
        {localEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-card-header">
              <div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-dates">
                  🗓️ {new Date(event.start_date).toLocaleString()} → {new Date(event.end_date).toLocaleString()}
                </p>
                <span className={`event-badge ${badgeColors[event.type] || 'badge-default'}`}>
                  {event.type}
                </span>
              </div>

              <div className="event-actions">
                <button
                  className="event-btn edit"
                  onClick={() => onEdit && onEdit(event)}
                  title="Edit Event"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="event-btn delete"
                  title="Delete Event"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}

        {localEvents.length === 0 && (
          <p className="event-empty">No events yet. So empty… 🥲</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
