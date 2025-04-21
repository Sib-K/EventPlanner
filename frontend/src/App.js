import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import TimelineView from './components/TimelineView';
import EventForm from './components/EventForm';
import api from './api';

function App() {
  const [view, setView] = useState('list');
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    api.get('/events/').then(res => setEvents(res.data));
  }, []);

  const handleCreateClick = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEventCreatedOrUpdated = (event, isEdit = false) => {
    if (isEdit) {
      setEvents(prev => prev.map(e => (e.id === event.id ? event : e)));
    } else {
      setEvents(prev => [...prev, event]);
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Event Planner</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView('list')}
          >
            📋 List
          </button>
          <button
            onClick={() => setView('timeline')}
          >
            🕒 Timeline
          </button>
          <button
            onClick={handleCreateClick}
          >
            ➕ Create Event
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6">
          <EventForm
            onEventSaved={handleEventCreatedOrUpdated}
            initialData={editingEvent}
            onCancel={handleCancel}
          />
        </div>
      )}

      {view === 'list' ? (
        <EventList events={events} onEdit={handleEdit} />
      ) : (
        <TimelineView events={events} />
      )}
    </div>
  );
}

export default App;
