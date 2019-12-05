import React from 'react';
import HtmlMeta from '../HtmlMeta/HtmlMeta';
import NavBar from '../Navbar/Navbar.container';

export const renderView = (view, title) => {
  return (
    <HtmlMeta subtitle={title}>
      {view}
    </HtmlMeta>
  );
};
