import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {app, AuthContext} from '../../../Auth';
import '../../styles/SideBar/SideBar.css';
import SideBarUser from './SideBarUser';
import SideBarNavigation from './SideBarNavigation';
import Logo from '../../../res/logo/logo.png';

class SideBar extends Component {

    static contextType = AuthContext;

    static propTypes = {

    }

    constructor(props) {
        super(props);

        this._onLogoutClick = this._onLogoutClick.bind(this);
    }

    _onLogoutClick() {
        app.auth().signOut().then(result => {
            this.context.isUserSignedOut.current = true;
        });
    }

    render() {

        return (
            <div className="sidebar">
                <div className="sidebar-content">
                    <div className="logo-div">
                        <img className="logo" src={Logo} />
                    </div>
                    <SideBarUser />
                    <SideBarNavigation />
                    <div className="logout" onClick={this._onLogoutClick}>
                        Logout
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar;