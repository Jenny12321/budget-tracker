import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/HomePage/HomeNavigationItem.css';

class HomeNavigationItem extends Component {
    static propTypes = {
        icon: PropTypes.string,
        link: PropTypes.string,
        title: PropTypes.string,
        onClick: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {}

        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        var { onClick, link } = this.props;

        if (link && onClick) {
            onClick(link);
        }
    }

    render() {
        var { icon, title } = this.props;

        return (
            <div className={`home-navigation-item navigation-item-${title}`} onClick={this._onClick}>
                <div className="home-navigation-item-content">
                    <div className="navigation-item-icon">
                        <FontAwesomeIcon icon={icon} size="8x" />
                    </div>
                    <div className="navigation-item-title">{title}</div>
                </div>
            </div>
        )
    }
}

export default HomeNavigationItem;