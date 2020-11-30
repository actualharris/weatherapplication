import React from 'react';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <header className="header-style">
        {/* <img className="logo" src="https://logo-logos.com/wp-content/uploads/2017/07/Linux_Logo_02.png" alt="Some logo" height="40" width="40"/>         */}
        <div>Weather App</div>
      </header>
    );
  }
}

export default Header;