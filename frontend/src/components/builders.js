import { format } from 'date-fns';

  const getColorByType = (type) => {
    switch (type) {
      case 'Merger':
        return '#3b82f6'; // Blue
      case 'Dividends':
        return '#ef4444'; // Red
      case 'New Capital':
        return '#10b981'; // Green
      case 'Hire':
        return '#facc15'; // Yellow
      default:
        return '#9ca3af'; // Gray
    }
  };
  
  export const buildTracksFromEvents = (events) => {
    return events.map((event, index) => {
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      const color = getColorByType(event.type);
  
      return {
        id: `track-${index}`,
        title: `${event.title} | ${event.type}`,
        elements: [
          {
            id: `element-${index}`,
            title: '',
            start,
            end,
            style: {
              backgroundColor: color,
              borderRadius: '4px',
              height: '30px',
              cursor: 'pointer',
            },
          },
        ],
      };
    });
  };


export const buildWeeklyTimebar = (weekStart) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    days.push({
      id: i,
      title: format(date, 'EEE dd'), // e.g., Sun 14
      start: new Date(date.setHours(0, 0, 0, 0)),
      end: new Date(date.setHours(23, 59, 59, 999)),
    });
  }

  return [
    {
      id: 'days',
      title: 'Day',
      cells: days,
    },
  ];
};

  