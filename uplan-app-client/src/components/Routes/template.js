import React from 'react';
import HtmlMeta from '../components/HtmlMeta/HtmlMeta';
import NavBar from '../components/Navbar/Navbar.container';

export const renderView = (view, title, isAuth) => {
  return (
    <HtmlMeta subtitle={title}>
      <NavBar />
      {view}
    </HtmlMeta>
  );
};
