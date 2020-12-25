import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MainHeader from './MainHeader';
import MainContentContainer from './MainContentContainer';
import {app, AuthContext} from '../../../Auth';
import '../../styles/MainBody/MainBody.css';

class MainBody extends Component {

    static contextType = AuthContext;

    static propTypes = {

    }

    constructor(props) {
        super(props);

        this._beforeUnload = this._beforeUnload.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this._beforeUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this._beforeUnload);
    }

    _beforeUnload(e) {
        e.preventDefault();
        e.returnValue = '';
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