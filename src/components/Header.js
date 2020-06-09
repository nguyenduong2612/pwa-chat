import React from 'react';

const Header = (props) => {
  return (
    <nav className="navbar navbar-light bg-white mb-3 pr-0 d-block">
      {props.children}
    </nav>
  );
}

export default Header;
