import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import '../../styles/Common/LoadingMask.css';


class LoadingMask extends Component {
    static propTypes = {
        show: PropTypes.bool
    }

    constructor(props) {
        super(props);
    }

    render() {
        var { show } = this.props;

        return (
            <Modal className="loading-mask-dialog" show={show} backdrop="static" keyboard={false} animation={false} size='sm' centered>
                <Modal.Body className="loading-mask">
                    <div className="loading-mask-content">
                        <Spinner animation='grow' variant='info' />
                        <Spinner animation='grow' variant='info' />
                        <Spinner animation='grow' variant='info' />
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default LoadingMask;