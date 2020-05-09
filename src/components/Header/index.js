import React from 'react';

import { NavLink } from 'react-router-dom';
import { NavWrapper, NavList } from './styles';

const Nav = () => (
  <nav>
    <NavWrapper>
      <NavList>
        <NavLink activeClassName="activee" to="/">
          Home
        </NavLink>
      </NavList>
      <NavList>
        <NavLink activeClassName="active" to="/youtube-downloader">
          Youtube Downloader
        </NavLink>
      </NavList>
      <NavList>
        <NavLink activeClassName="active" to="/youtube-search">
          Youtube Search
        </NavLink>
      </NavList>
      <NavList>
        <NavLink activeClassName="active" to="/lib-gen">
          Library Genesis
        </NavLink>
      </NavList>
      <NavList>
        <NavLink activeClassName="active" to="/pomodoro">
          Pomodoro
        </NavLink>
      </NavList>
      <NavList>
        <NavLink activeClassName="active" to="/evernote">
          Evernote
        </NavLink>
      </NavList>
    </NavWrapper>
  </nav>
);

const Header = () => <Nav />;

export default Header;
