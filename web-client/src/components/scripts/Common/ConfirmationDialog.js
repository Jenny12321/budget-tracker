import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


class ConfirmationDialog extends Component {
    static propTypes = {
        show: PropTypes.bool,
        handleClose: PropTypes.func,
        action: PropTypes.string,
        data: PropTypes.any,
        onSubmit: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            text: []
        }

        this._onDialogClose = this._onDialogClose.bind(this);
        this._onDialogEnter = this._onDialogEnter.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onDialogClose() {
        this.setState({ text: '' });

        var handleClose = this.props.handleClose;
        handleClose();
    }

    _onDialogEnter() {
        var { action } = this.props;
        var text = '';

        if (action === 'delete') {
            text = "Are you sure you want to permanently delete this item?";
        }

        this.setState({ text: text });
    }

    _onSubmit() {
        var onSubmit = this.props.onSubmit;
        onSubmit(this.props.data);

        this._onDialogClose();
    }

    render() {
        var { show } = this.props;
        var { text } = this.state;

        return (
            <Modal className="confirmation-dialog" show={show} onHide={this._onDialogClose} onEnter={this._onDialogEnter} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Please Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Label>{text}</Form.Label>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this._onDialogClose}>Cancel</Button>
                    <Button variant="primary" onClick={this._onSubmit}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ConfirmationDialog;