import React, { useEffect, useState } from 'react';

import { z } from 'zod';

const isoDatePattern =
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

const DateResponse = z.object({
  data: z.string().regex(isoDatePattern),
});
// eslint-disable-next-line @typescript-eslint/no-redeclare
type DateResponse = z.infer<typeof DateResponse>;

const dateFormatter = (timeZone: string): Intl.DateTimeFormat =>
  Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone,
  });

const formatters = {
  Eastern: dateFormatter('America/New_York'),
  Central: dateFormatter('America/Chicago'),
  Mountain: dateFormatter('America/Phoenix'),
  Pacific: dateFormatter('America/Los_Angeles'),
};

function Home() {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    fetch('http://localhost:8000/date')
      .then((res) => res.json())
      .then((json) => {
        const response: DateResponse = DateResponse.parse(json);
        setDate(new Date(response.data));
      });
  }, []);

  return (
    <>
      <h1>Time and Date Info</h1>
      <ul>
        {Object.entries(formatters).map(([region, formatter]) => (
          <li key={region}>
            {region}: {formatter.format(date)}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
