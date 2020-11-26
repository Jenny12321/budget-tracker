import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { CategoryStatus } from '../../utils/Util';
import '../../styles/CategoriesPage/AddCategoryDialog.css';


class AddCategoryDialog extends Component {
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
            categoryStatuses: []
        }

        this._onDialogClose = this._onDialogClose.bind(this);
        this._onDialogEnter = this._onDialogEnter.bind(this);
        this._onCheckboxChange = this._onCheckboxChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onDialogClose() {
        this.setState({ categoryStatuses: [] });

        var handleClose = this.props.handleClose;
        handleClose();
    }

    _onDialogEnter() {
        this.setState({ categoryStatuses: this.props.data });
    }

    _onCheckboxChange(e, id) {
        var newCategoryStatuses = this.state.categoryStatuses.map((category) => {
            if (category.categoryTypeId === id) {
                category.isActive = e.target.checked;

                if (category.isActive) {
                    category.state = CategoryStatus.Added;
                }
                else {
                    category.state = CategoryStatus.Unchanged;
                }
            }

            return category;
        });

        this.setState( {categoryStatuses: newCategoryStatuses });
    }

    _onSubmit() {
        var onSubmit = this.props.onSubmit;
        onSubmit(this.state.categoryStatuses);

        this._onDialogClose();
    }

    render() {
        var { show } = this.props;
        var { categoryStatuses } = this.state;

        return (
            <Modal className="add-category-dialog" show={show} onHide={this._onDialogClose} onEnter={this._onDialogEnter} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {
                            categoryStatuses && categoryStatuses.map((category) => {
                                if (!category.isActive || category.state !== CategoryStatus.Unchanged) {
                                    return (<Form.Check key={category.categoryTypeId} type='checkbox' id={category.categoryTypeId} label={category.categoryName} onClick={(e) => this._onCheckboxChange(e, category.categoryTypeId)} />);
                                }
                            })
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this._onDialogClose}>Close</Button>
                    <Button variant="primary" onClick={this._onSubmit}>Add Categories</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddCategoryDialog;