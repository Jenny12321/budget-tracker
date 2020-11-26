import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavigationItems } from '../../utils/Util';
import { withRouter } from 'react-router-dom';
import '../../styles/HomePage/HomePage.css';
import HomeNavigationItem from './HomeNavigationItem';


class HomePage extends Component {
    static propTypes = {
    }

    constructor(props) {
        super(props);

        this.state = {

        }

        this._onClick = this._onClick.bind(this);
    }

    _onClick(link) {
        this.props.history.push(link);
    }

    render() {
        return (
            <div className="home-page">
                <div className="home-page-content">
                    {
                        NavigationItems && NavigationItems.map(navItem => {
                            if (navItem.renderOnHomePage) {
                                return (<HomeNavigationItem key={`home-nav-${navItem.eventKey}`} icon={navItem.icon} title={navItem.homePageText} link={navItem.link} onClick={this._onClick} />)
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HomePage);