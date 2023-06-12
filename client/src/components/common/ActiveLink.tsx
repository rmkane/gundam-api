import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

export type ActiveLinkProps = {
  text: string;
  to: string;
};

function ActiveLink(props: ActiveLinkProps) {
  const location = useLocation();
  const { text, to } = props;
  return (
    <li className={`nav-link ${location.pathname === to ? 'uk-active' : ''}`}>
      <Link to={to}>{text}</Link>
    </li>
  );
}

export default ActiveLink;
