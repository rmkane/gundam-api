import * as React from 'react';

import { ActiveLink } from '../common';

function Header() {
  return (
    <header className="uk-navbar-container">
      <div className="uk-container uk-container-expand">
        <nav className="uk-navbar uk-flex uk-flex-1">
          <div className="uk-navbar-left uk-flex">
            <a
              className="uk-navbar-item uk-logo"
              href="/"
              aria-label="Back to Home"
              role="menuitem"
            >
              <span
                className="uk-icon-nut uk-icon-large"
                data-uk-icon="icon:nut"
              />
              React + Express App
            </a>
          </div>
          <div className="uk-navbar-right uk-flex uk-flex-right uk-flex-1">
            <ul className="uk-navbar-nav uk-visible">
              <ActiveLink to="/" text="Home" />
              <ActiveLink to="/notifications" text="Notifications" />
              <ActiveLink to="/time" text="Time" />
              <ActiveLink to="/contact" text="Contact" />
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
