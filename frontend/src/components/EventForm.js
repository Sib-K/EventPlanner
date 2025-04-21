import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/EventForm.css';

function EventForm({ onEventSaved, initialData = null, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        start_date: initialData.start_date.slice(0, 16),
        end_date: initialData.end_date.slice(0, 16),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
    };

    if (initialData?.id) {
      api.put(`/events/${initialData.id}/`, payload).then((res) => {
        onEventSaved(res.data, true);
      });
    } else {
      api.post('/events/', payload).then((res) => {
        onEventSaved(res.data, false);
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="event-form-container">
      <h2 className="form-title">{initialData ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <label>
          Title:
          <input type="text" name="title" required value={formData.title} onChange={handleChange} />
        </label>

        <label>
          Type:
          <select name="type" required value={formData.type} onChange={handleChange}>
            <option value="">-- Select Type --</option>
            <option value="Merger">Merger</option>
            <option value="Dividends">Dividends</option>
            <option value="New Capital">New Capital</option>
            <option value="Hire">Hire</option>
          </select>
        </label>

        <label>
          Start Date:
          <input type="datetime-local" name="start_date" required value={formData.start_date} onChange={handleChange} />
        </label>

        <label>
          End Date:
          <input type="datetime-local" name="end_date" required value={formData.end_date} onChange={handleChange} />
        </label>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {initialData ? 'Update Event' : 'Save Event'}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
