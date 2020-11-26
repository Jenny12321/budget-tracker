import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import '../../styles/CategoriesPage/AddCategoryDialog.css';
import { formatNumberWithTwoDecimals, restrictInputToTwoDecimals, parseToNumber, CategoryTypeToTitleMap } from '../../utils/Util';


class EditCategoryDialog extends Component {
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
            categoryExpense: null,
            categoryName: '',
            lowerBudgetAmount: '',
            upperBudgetAmount: '',
            validateForm: false,
            lowerBudgetInputInvalidText: '',
            upperBudgetInputInvalidText: ''
        }

        this.formRef = React.createRef();
        this.upperBudgetBoundRef = React.createRef();

        this._onDialogClose = this._onDialogClose.bind(this);
        this._onDialogEnter = this._onDialogEnter.bind(this);
        this._onLowerBudgetAmountChange = this._onLowerBudgetAmountChange.bind(this);
        this._onUpperBudgetAmountChange = this._onUpperBudgetAmountChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onDialogClose() {
        this.setState({ 
            categoryExpense: null,
            categoryName: '',
            lowerBudgetAmount: '',
            upperBudgetAmount: ''
         });

        var handleClose = this.props.handleClose;
        handleClose();
    }

    _onDialogEnter() {
        var categoryExpense = this.props.data;

        var categoryName = CategoryTypeToTitleMap[categoryExpense.categoryTypeId];

        this.setState({ 
            categoryExpense: categoryExpense,
            categoryName: categoryName,
            lowerBudgetAmount: formatNumberWithTwoDecimals(categoryExpense.lowerBudgetAmount),
            upperBudgetAmount: formatNumberWithTwoDecimals(categoryExpense.upperBudgetAmount),
            validateForm: false
         });
    }

    _onLowerBudgetAmountChange(e) {
        this.setState({
            lowerBudgetAmount: restrictInputToTwoDecimals(e.target.value),
            validateForm: false
        });

        var upperBudgetAmountElement = this.upperBudgetBoundRef.current;
        if (upperBudgetAmountElement.validity && upperBudgetAmountElement.validity.customError) {
            upperBudgetAmountElement.setCustomValidity('');
        }
    }

    _onUpperBudgetAmountChange(e) {
        this.setState({
            upperBudgetAmount: restrictInputToTwoDecimals(e.target.value),
            validateForm: false
        });

        var upperBudgetAmountElement = this.upperBudgetBoundRef.current;
        if (upperBudgetAmountElement.validity && upperBudgetAmountElement.validity.customError) {
            upperBudgetAmountElement.setCustomValidity('');
        }
    }

    _onSubmit(e) {
        e.preventDefault();
        var onSubmit = this.props.onSubmit;
        var formElement = this.formRef.current;
        var { lowerBudgetAmount, upperBudgetAmount } = this.state;
        var emptyFieldValidationText = "Please provide a numerical value.";
        var invalidValueValidationText = "Upper budget bound cannot be smaller than lower budget bound.";

        if (!!!lowerBudgetAmount) {
            this.setState({ lowerBudgetInputInvalidText: emptyFieldValidationText });
        }
        if (!!!upperBudgetAmount) {
            this.setState({ upperBudgetInputInvalidText: emptyFieldValidationText });
        }
        if (lowerBudgetAmount && upperBudgetAmount) {
            var parsedLowerBudget = parseToNumber(lowerBudgetAmount);
            var parsedUpperBudget = parseToNumber(upperBudgetAmount);

            if (parsedUpperBudget < parsedLowerBudget) {
                this.setState({ upperBudgetInputInvalidText: invalidValueValidationText });

                var upperBudgetAmountElement = this.upperBudgetBoundRef.current;
                if (upperBudgetAmountElement) {
                    upperBudgetAmountElement.setCustomValidity(invalidValueValidationText);
                }
            }
        }

        this.setState({ validateForm: true });
        
        if (formElement.checkValidity()) {
            var categoryExpense = this.props.data;

            categoryExpense.lowerBudgetAmount = parseToNumber(lowerBudgetAmount);
            categoryExpense.upperBudgetAmount = parseToNumber(upperBudgetAmount);

            onSubmit(categoryExpense);
            this._onDialogClose();
        }
    }

    render() {
        var { show } = this.props;
        var { categoryName, lowerBudgetAmount, upperBudgetAmount, lowerBudgetInputInvalidText, upperBudgetInputInvalidText, validateForm } = this.state;

        return (
            <Modal className="edit-category-expense-dialog" show={show} onHide={this._onDialogClose} onEnter={this._onDialogEnter} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={this.formRef} validated={validateForm}>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control value={categoryName} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formCategoryLowerBudgetBound">
                            <Form.Label>Lower Budget Bound</Form.Label>
                            <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon-1">$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="number" onChange={this._onLowerBudgetAmountChange} value={lowerBudgetAmount} min="0" step="0.01" required />
                                    <Form.Control.Feedback type="invalid">{lowerBudgetInputInvalidText}</Form.Control.Feedback>
                                </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formCategoryUpperBudgetBound">
                            <Form.Label>Upper Budget Bound</Form.Label>
                            <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon-1">$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control ref={this.upperBudgetBoundRef} type="number" onChange={this._onUpperBudgetAmountChange} value={upperBudgetAmount} min="0" step="0.01" required />
                                    <Form.Control.Feedback type="invalid">{upperBudgetInputInvalidText}</Form.Control.Feedback>
                                </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this._onDialogClose}>Close</Button>
                    <Button variant="primary" onClick={this._onSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditCategoryDialog;