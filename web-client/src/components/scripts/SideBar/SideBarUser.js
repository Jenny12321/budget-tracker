import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../../../Auth';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/SideBar/SideBarUser.css';

class SideBarUser extends Component {
    
    static contextType = AuthContext;

    static propTypes = {}

    constructor(props) {
        super(props);


    }

    render() {
        var currentUserInfo = this.context.currentUserInfo.current;
        var fullName = null;

        if (currentUserInfo) {
            fullName = `${currentUserInfo.firstName} ${currentUserInfo.lastName}`;
        }

        return (
            <div className="sidebar-user">
                <div className="user-image">
                    { /*<Image style={{width: "150px", height: "150px", }} src='../../../../public/assets/user_icon.png' roundedCircle /> */ }
                    <FontAwesomeIcon icon={["fas", "user-circle"]} size="9x"/>
                </div>
                <div className="user-fullname">
                    {fullName}
                </div>
            </div>
        )
    }
}



export default SideBarUser;