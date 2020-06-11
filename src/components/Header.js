import React from 'react';

const Header = (props) => {
  return (
    <nav className="navbar navbar-light bg-white mb-3 d-block">
      {props.children}
    </nav>
  );
}

export default Header;
