import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

import './index.css';

const root: HTMLElement = document.querySelector<HTMLElement>('#root')!;

root.classList.add('uk-light');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
