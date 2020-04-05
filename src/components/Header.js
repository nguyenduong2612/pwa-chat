import React from 'react';

const Header = (props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <h2 className="navbar-brand">Chatastrophe</h2>
      {props.children}
    </nav>
  );
}

export default Header;
