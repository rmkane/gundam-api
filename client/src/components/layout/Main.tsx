import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Contact, Home, Notifications, Time } from '../routes';

function Main() {
  return (
    <main className="uk-flex uk-flex-column uk-flex-1 uk-light uk-background-secondary uk-padding-small">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/time" element={<Time />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  );
}

export default Main;
