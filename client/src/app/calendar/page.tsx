'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './page.module.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

export default function CalendarPage() {
  // Example events - you can replace these with actual events from your API
  const [events] = useState<Event[]>([
    {
      title: 'Sample Event',
      start: new Date(2025, 4, 7),
      end: new Date(2025, 4, 7),
      allDay: true,
    },
  ]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Event Calendar</h1>
      <div className={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          popup
          selectable
          onSelectSlot={(slotInfo) => {
            console.log('Selected slot:', slotInfo);
          }}
          onSelectEvent={(event) => {
            console.log('Selected event:', event);
          }}
        />
      </div>
    </main>
  );
}
