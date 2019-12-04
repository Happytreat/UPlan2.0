import React from 'react';
import HtmlMeta from '../HtmlMeta/HtmlMeta';
import NavBar from '../Navbar/Navbar.container';

export const renderView = (view, title, handleThemeChange=null) => {
  return (
    <HtmlMeta subtitle={title}>
      <NavBar handleThemeChange={handleThemeChange}/>
      {view}
    </HtmlMeta>
  );
};
