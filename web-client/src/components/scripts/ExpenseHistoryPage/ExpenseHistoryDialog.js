import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import BasicInfoCard from '../Common/BasicInfoCard';
import ExpensesInfoContainer from '../ExpensesPage/ExpensesInfoContainer';
import TransactionsContainer from '../ExpensesPage/TransactionsContainer';
import '../../styles/ExpenseHistoryPage/ExpenseHistoryDialog.css';
import { formatDate } from '../../utils/Util';


const tempSortSelectors = [
    {
        id: 1,
        name: "Name (A-Z)"
    },
    {
        id: 2,
        name: "Date"
    },
    {
        id: 3,
        name: "Cost"
    },
]

class ExpenseHistoryDialog extends Component {
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
            selectedCategory: null,
            transactions: [],
            effectiveStart: '',
            effectiveEnd: '',
            totalTransactions: 0
        }

        this._onCategoryChange = this._onCategoryChange.bind(this);
        this._onDialogClose = this._onDialogClose.bind(this);
    }

    componentDidMount() {
        var categoryExpenses = this.props.data;

        if (categoryExpenses) {
            var selectedCategory = categoryExpenses ? categoryExpenses[0] : null;
            var effectiveStart = null;
            var effectiveEnd = null;
            var totalTransactions = 0;
    
            if (selectedCategory) {
                var parsedEffectiveStart = new Date(Date.parse(selectedCategory.effectiveStart));
                var parsedEffectiveEnd = new Date(Date.parse(selectedCategory.effectiveEnd));
    
                effectiveStart = formatDate(parsedEffectiveStart);
                effectiveEnd = formatDate(parsedEffectiveEnd);
            }
            if (categoryExpenses) {
                categoryExpenses.forEach(ce => {
                    totalTransactions = totalTransactions + ce.transactions.length;
                });
            }
    
            this.setState({
                selectedCategory: selectedCategory,
                transactions: selectedCategory.transactions,
                effectiveStart: effectiveStart,
                effectiveEnd: effectiveEnd,
                totalTransactions: totalTransactions
            });
        }
    }

    componentDidUpdate(prevProps) {
        var categoryExpenses = this.props.data;

        if (categoryExpenses && !_.isEqual(categoryExpenses, prevProps.data)) {
            var selectedCategory = categoryExpenses ? categoryExpenses[0] : null;

            if (selectedCategory && categoryExpenses) {
                var parsedEffectiveStart = new Date(Date.parse(selectedCategory.effectiveStart));
                var parsedEffectiveEnd = new Date(Date.parse(selectedCategory.effectiveEnd));
    
                var effectiveStart = formatDate(parsedEffectiveStart);
                var effectiveEnd = formatDate(parsedEffectiveEnd);

                var totalTransactions = 0;
                categoryExpenses.forEach(ce => {
                    totalTransactions = totalTransactions + ce.transactions.length;
                });
        
                this.setState({
                    selectedCategory: selectedCategory,
                    transactions: selectedCategory.transactions,
                    effectiveStart: effectiveStart,
                    effectiveEnd: effectiveEnd,
                    totalTransactions: totalTransactions
                });
            }
        }
    }

    _onCategoryChange(category) {
        var categoryExpenses = this.props.data;

        if (categoryExpenses) {
            var transactionItems = categoryExpenses.find(i => category.categoryExpenseId === i.categoryExpenseId).transactions;

            this.setState({
                selectedCategory: category,
                transactions: transactionItems
            });
        }
    }

    _onDialogClose() {
        var handleClose = this.props.handleClose;
        handleClose();
    }

    render() {
        var { show } = this.props;
        var { transactions, effectiveStart, effectiveEnd, totalTransactions } = this.state;
        var categoryExpenses = this.props.data;

        return (
            <Modal className="expense-history-dialog" show={show} onHide={this._onDialogClose} centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Expense History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="basic-info-pane">
                        <BasicInfoCard text={effectiveStart} title="Period Start Date"></BasicInfoCard>
                        <BasicInfoCard text={effectiveEnd} title="Period End Date"></BasicInfoCard>
                        <BasicInfoCard text={totalTransactions.toString()} title="Total Transactions"></BasicInfoCard>
                    </div>
                    <ExpensesInfoContainer categoryData={categoryExpenses} onCategoryChange={this._onCategoryChange} />
                    <TransactionsContainer transactionItems={transactions} sortSelectors={tempSortSelectors} showToolbar isExpenseHistory />
                </Modal.Body>
            </Modal>
        )
    }
}

export default ExpenseHistoryDialog;