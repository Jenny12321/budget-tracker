import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from 'react-datepicker';
import { Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/ExpensesPage/TransactionDialog.css';
import Button from 'react-bootstrap/Button';
import { formatNumberWithTwoDecimals, parseToNumber, restrictInputToTwoDecimals, formatMilitaryTime, CategoryTypeToTitleMap } from '../../utils/Util';

export const TransactionDialogAction = {
    Add: 0,
    Edit: 1
}

class TransactionDialog extends Component {
    static propTypes = {
        show: PropTypes.bool,
        handleClose: PropTypes.func,
        action: PropTypes.any,
        data: PropTypes.any,
        onSubmit: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            categoryTypeId: null,
            title: '',
            date: new Date(),
            cost: '',
            displayTime: '',
            displayTimeAsDate: null,
            minDate: '',
            maxDate: ''
        }

        this.timeRef = React.createRef();

        this._onFormTransactionNameChange = this._onFormTransactionNameChange.bind(this);
        this._onFormTransactionDateChange = this._onFormTransactionDateChange.bind(this);
        this._onFormTransactionCostChange = this._onFormTransactionCostChange.bind(this);
        this._onFormTransactionTimeChange = this._onFormTransactionTimeChange.bind(this);
        this._onDialogClose = this._onDialogClose.bind(this);
        this._onDialogEnter = this._onDialogEnter.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onFormTransactionCostChange(e) {
        this.setState({cost: restrictInputToTwoDecimals(e.target.value)});
    }

    _onFormTransactionNameChange(e) {
        this.setState({title: e.target.value});
    }

    _onFormTransactionDateChange(date) {
        this.setState({date: date});
    }

    _onFormTransactionTimeChange(date) {
        var timeRef = this.timeRef.current;
        this.setState({
            displayTime: timeRef.value,
            displayTimeAsDate: timeRef.valueAsDate
        });
    }

    _onDialogClose() {
        this.setState({
            categoryTypeId: null,
            title: '',
            date: new Date(),
            cost: '',
            displayTime: '',
            displayTimeAsDate: null
        });

        var handleClose = this.props.handleClose;
        handleClose();
    }

    _onDialogEnter() {
        var today = new Date();
        var currentMonth = today.getMonth();
        var currentYear = today.getFullYear();
        var daysInMonth = (new Date(currentYear, (currentMonth + 1), 0)).getDate();

        var minDate = new Date(currentYear, currentMonth, 1);
        var maxDate = new Date(currentYear, currentMonth, daysInMonth);

        if (this.props.action === TransactionDialogAction.Edit) {
            var data = this.props.data;

            var date = new Date(Date.parse(data.date));
            var displayTime = formatMilitaryTime(date);

            this.setState({
                categoryTypeId: data.categoryTypeId,
                title: data.title,
                date: date,
                cost: formatNumberWithTwoDecimals(data.cost),
                displayTime: displayTime,
                displayTimeAsDate: null,
                minDate: minDate,
                maxDate: maxDate
            });
        }
        else if (this.props.action === TransactionDialogAction.Add) {
            var data = this.props.data;

            this.setState({
                categoryTypeId: data.categoryTypeId,
                minDate: minDate,
                maxDate: maxDate
            });
        }
    }

    _onSubmit() {
        var onSubmit = this.props.onSubmit;
        var { title, date, cost, displayTimeAsDate } = this.state;

        // displayTimeAsDate set as null and only updated when user uses time picker
        // If time picker not used, get hours and minutes from date instead
        var selectedHours = displayTimeAsDate ? displayTimeAsDate.getUTCHours() : date.getHours();
        var selectedMinutes = displayTimeAsDate ? displayTimeAsDate.getUTCMinutes() : date.getMinutes();
        var dateYear = date.getFullYear();
        var dateMonth = date.getMonth();
        var dateDay = date.getDate();

        var dateTime = new Date(dateYear, dateMonth, dateDay, selectedHours, selectedMinutes, 0);
        
        var submissionData = {
            title: title,
            date: dateTime.toISOString(),
            cost: parseToNumber(cost)
        }
        
        onSubmit(submissionData);

        this._onDialogClose();
    }

    render() {
        var { show, action } = this.props;
        var { categoryTypeId, title, date, cost, displayTime, minDate, maxDate } = this.state;

        var primaryButtonText = (action === TransactionDialogAction.Add) ? "Add Transaction" : "Save Transaction";
        var dialogTitle = (action === TransactionDialogAction.Add) ? "Add New Transaction" : "Edit Transaction";
        var categoryTitle = categoryTypeId ? CategoryTypeToTitleMap[categoryTypeId] : "";

        return (
            <Modal className="add-transaction-dialog" show={show} onHide={this._onDialogClose} onEnter={this._onDialogEnter} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{dialogTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTransactionCategoryName">
                            <Form.Label>Transaction Category</Form.Label>
                            <Form.Control placeholder="Category name" value={categoryTitle} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formTransactionName">
                            <Form.Label>Transaction Name</Form.Label>
                            <Form.Control placeholder="Enter a transaction name" value={title} onChange={this._onFormTransactionNameChange} maxLength="100" readOnly={action === TransactionDialogAction.Add ? false : true} />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formTransactionDate">
                                <Form.Label>Transaction Date</Form.Label>
                                <DatePicker className="transaction-date-picker" selected={date} onChange={this._onFormTransactionDateChange} minDate={minDate} maxDate={maxDate} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formTransactionTime">
                                <Form.Label>Transaction Time</Form.Label>
                                <input ref={this.timeRef} className="transaction-time-picker" type="time" value={displayTime} onChange={this._onFormTransactionTimeChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={6} controlId="formTransactionCost">
                                <Form.Label>Transaction Cost</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon-1">$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="number" onChange={this._onFormTransactionCostChange} value={cost} min="0" step="0.01"></Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this._onDialogClose}>Close</Button>
                    <Button variant="primary" onClick={this._onSubmit}>{primaryButtonText}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default TransactionDialog;