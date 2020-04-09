import React from 'react';

const Header = (props) => {
  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <h2 className="navbar-brand">Chatastrophe</h2>
      {props.children}
    </nav>
  );
}

export default Header;
