import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';
import { NavigationItems } from '../../utils/Util';
import SideBarNavigationItem from './SideBarNavigationItem';
import '../../styles/SideBar/SideBarNavigation.css';

class SideBarNavigation extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            activeKey: "home",
            navItems: []
        }

        this._onTabChange = this._onTabChange.bind(this);
    }

    componentDidMount() {
        var navItems = NavigationItems;
        
        this.setState({ navItems: navItems });

        this.onHistoryChange = this.props.history.listen((location, action) => {
            var navItem = this.state.navItems.find(item => item.link === location.pathname);

            if (navItem) {
                this.setState({ activeKey: navItem.eventKey });
            }
        })
    }

    _onTabChange(eventKey) {
        this.setState({ activeKey: eventKey });
    }

    render() {
        var activeKey = this.state.activeKey;

        return (
            <div className="sidebar-navigation">
                <Nav defaultActiveKey="home" activeKey={activeKey} className="flex-column">
                    {
                        NavigationItems && NavigationItems.map(function(navItem) {
                            var isActive = (navItem.eventKey === activeKey) ? true : false;

                            return (<SideBarNavigationItem key={navItem.eventKey} link={navItem.link} text={navItem.text} eventKey={navItem.eventKey} onTabChange={this._onTabChange} isActive={isActive} icon={navItem.icon}></SideBarNavigationItem>);
                        }.bind(this))
                    }
                </Nav>
            </div>
        )
    }
}

export default withRouter(SideBarNavigation);