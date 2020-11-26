import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/SideBar/SideBarNavigationItem.css';

class SideBarNavigationItem extends Component {
    static propTypes = {
        link: PropTypes.string,
        text: PropTypes.string,
        eventKey: PropTypes.string,
        onTabChange: PropTypes.func,
        isActive: PropTypes.bool,
        icon: PropTypes.string
    }

    constructor(props) {
        super(props);

        this._onSelect = this._onSelect.bind(this);
    }

    _onSelect(eventKey) {
        var onTabChange = this.props.onTabChange;
        onTabChange(eventKey);
    }

    render() {
        var { link, text, eventKey, isActive, icon } = this.props;

        var className = (isActive) ? "sidebar-navigation-item active" : "sidebar-navigation-item";
        return (
            <div className={className}>
                <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
                <Nav.Link as={Link} to={link} eventKey={eventKey} onSelect={this._onSelect}>{text}</Nav.Link>
            </div>
        )
    }
}

export default SideBarNavigationItem;