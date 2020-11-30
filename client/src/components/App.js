import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import '../index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div id="container">
        <Header />
        {/* Header component */}
        
        {/* A location search field inside the Locations menu item */}
        {/* Main content */}
        <MainContent />
        {/* Footer component */}
        <Footer />
      </div>
    );
  }
}

export default App;