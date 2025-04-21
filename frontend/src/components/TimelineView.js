import React, { useEffect, useState } from "react";
import api from '../api';
import { buildWeeklyTimebar, buildTracksFromEvents } from "./builders";
import Timelines from "react-timelines";
import { startOfWeek, endOfWeek, addWeeks, format, isWithinInterval } from "date-fns";
import "react-timelines/lib/css/style.css";

const TimelineView = () => {
  const [events, setEvents] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedWeekStartDate, setSelectedWeekStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [timebar, setTimebar] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/");
        const allEvents = response.data;
  
        const weekStart = startOfWeek(selectedWeekStartDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(selectedWeekStartDate, { weekStartsOn: 0 });
  
        const weeklyEvents = allEvents.filter((event) => {
          const eventStart = new Date(event.start_date);
          const eventEnd = new Date(event.end_date);
          return (
            isWithinInterval(eventStart, { start: weekStart, end: weekEnd }) ||
            isWithinInterval(eventEnd, { start: weekStart, end: weekEnd }) ||
            (eventStart <= weekStart && eventEnd >= weekEnd)
          );
        });
  
        setEvents(weeklyEvents);
        setTracks(buildTracksFromEvents(weeklyEvents));
        setTimebar(buildWeeklyTimebar(weekStart));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
  
    fetchEvents();
  }, [selectedWeekStartDate]);

  const changeWeek = (direction) => {
    setSelectedWeekStartDate((prev) => addWeeks(prev, direction));
  };

  const now = new Date();
  const start = new Date(selectedWeekStartDate);
  const end = addWeeks(start, 1);
  const zoom = 2;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="event-list-title">📋 Your Events</h2>
      <div className="flex justify-between mb-6 items-center">
        <button
          onClick={() => changeWeek(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          ⬅ Previous Week
        </button>
        <span className="text-2xl font-semibold">
          {format(selectedWeekStartDate, "MMMM dd, yyyy")}
        </span>
        <button
          onClick={() => changeWeek(1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Next Week ➡
        </button>
      </div>

      <Timelines
        timebar={timebar}
        tracks={tracks}
        now={now}
        enableSticky
        scrollToNow
        scale={{
          start,
          end,
          zoom,
          zoomMin: 2,
          zoomMax: 100,
        }}
      />
    </div>
  );
};

export default TimelineView;
