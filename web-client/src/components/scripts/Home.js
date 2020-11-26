import React, { Component } from 'react';
import SideBar from './SideBar/SideBar';
import MainBody from './MainBody/MainBody';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <SideBar />
        <MainBody />
      </React.Fragment>
    )
  }
}


export default Home;
