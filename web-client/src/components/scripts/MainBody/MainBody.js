import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MainHeader from './MainHeader';
import MainContentContainer from './MainContentContainer';
import '../../styles/MainBody/MainBody.css';

class MainBody extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="mainbody">
                <MainHeader />
                <MainContentContainer />
            </div>
        )
    }
}

export default MainBody;