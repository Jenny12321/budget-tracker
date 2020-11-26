import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BasicInfoCard from '../Common/BasicInfoCard';
import ExpensesInfoContainer from './ExpensesInfoContainer';
import TransactionsContainer from './TransactionsContainer';
import '../../styles/ExpensesPage/ExpensesPage.css';
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


class ExpensesPage extends Component {
    static propTypes = {
        categoryExpenses: PropTypes.array,
        addTransaction: PropTypes.func,
        updateTransaction: PropTypes.func,
        deleteTransaction: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: null,
            transactions: [],
            effectiveStart: '',
            effectiveEnd: '',
            daysLeft: '',
            totalTransactions: 0
        };

        this._onCategoryChange = this._onCategoryChange.bind(this);
        this._addTransaction = this._addTransaction.bind(this);
        this._updateTransaction = this._updateTransaction.bind(this);
        this._deleteTransaction = this._deleteTransaction.bind(this);
    }

    componentDidMount() {
        var { categoryExpenses } = this.props;

        var selectedCategory = categoryExpenses ? categoryExpenses[0] : null;
        var transactions = selectedCategory ? selectedCategory.transactions : [];
        var effectiveStart = null;
        var effectiveEnd = null;
        var daysLeft = 0;
        var totalTransactions = 0;

        if (selectedCategory) {
            var today = new Date();
            var parsedEffectiveStart = new Date(Date.parse(selectedCategory.effectiveStart));
            var parsedEffectiveEnd = new Date(Date.parse(selectedCategory.effectiveEnd));

            daysLeft = parsedEffectiveEnd.getDate() - today.getDate();

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
            transactions: transactions,
            effectiveStart: effectiveStart,
            effectiveEnd: effectiveEnd,
            daysLeft: daysLeft,
            totalTransactions: totalTransactions
        });
    }

    componentDidUpdate(prevProps) {
        var { selectedCategory } = this.state;
        var { categoryExpenses } = this.props;

        if (!_.isEqual(categoryExpenses, prevProps.categoryExpenses)) {
            if (selectedCategory && categoryExpenses) {
                var updatedCategory = categoryExpenses.find(ce => ce.categoryExpenseId === selectedCategory.categoryExpenseId);
    
                if (!_.isEqual(selectedCategory, updatedCategory)) {
                    var today = new Date();
                    var parsedEffectiveStart = new Date(Date.parse(updatedCategory.effectiveStart));
                    var parsedEffectiveEnd = new Date(Date.parse(updatedCategory.effectiveEnd));
        
                    var daysLeft = parsedEffectiveEnd.getDate() - today.getDate();
        
                    var effectiveStart = formatDate(parsedEffectiveStart);
                    var effectiveEnd = formatDate(parsedEffectiveEnd);

                    var totalTransactions = 0;
                    categoryExpenses.forEach(ce => {
                        totalTransactions = totalTransactions + ce.transactions.length;
                    });
    
                    this.setState({
                        selectedCategory: updatedCategory,
                        transactions: updatedCategory.transactions,
                        effectiveStart: effectiveStart,
                        effectiveEnd: effectiveEnd,
                        daysLeft: daysLeft,
                        totalTransactions: totalTransactions
                    });
                }
            }
            else if (!selectedCategory) {
                var selectedCategory = categoryExpenses ? categoryExpenses[0] : null;
                var transactions = selectedCategory ? selectedCategory.transactions : [];
                var effectiveStart = null;
                var effectiveEnd = null;
                var daysLeft = 0;
                var totalTransactions = 0;
        
                if (selectedCategory) {
                    var today = new Date();
                    var parsedEffectiveStart = new Date(Date.parse(selectedCategory.effectiveStart));
                    var parsedEffectiveEnd = new Date(Date.parse(selectedCategory.effectiveEnd));
        
                    daysLeft = parsedEffectiveEnd.getDate() - today.getDate();
        
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
                    transactions: transactions,
                    effectiveStart: effectiveStart,
                    effectiveEnd: effectiveEnd,
                    daysLeft: daysLeft,
                    totalTransactions: totalTransactions
                });
            }
        }
    }

    _onCategoryChange(category) {
        var { categoryExpenses } = this.props;

        if (categoryExpenses) {
            var transactionItems = categoryExpenses.find(i => category.categoryExpenseId === i.categoryExpenseId).transactions;

            this.setState({
                selectedCategory: category,
                transactions: transactionItems
            });
        }
    }

    _addTransaction(newTransaction) {
        var { addTransaction } = this.props;
        newTransaction.categoryExpenseId = this.state.selectedCategory.categoryExpenseId;

        addTransaction(newTransaction);
    }

    _updateTransaction(transaction) {
        var { updateTransaction } = this.props;

        updateTransaction(transaction);
    }

    _deleteTransaction(transaction) {
        var { deleteTransaction } = this.props;

        deleteTransaction(transaction);
    }

    render() {
        var { transactions, effectiveStart, effectiveEnd, daysLeft, totalTransactions, selectedCategory } = this.state;
        var { categoryExpenses } = this.props;

        return (
            <div className="expenses-page">
                <div className="basic-info-pane">
                    <BasicInfoCard text={effectiveStart} title="Period Start Date" />
                    <BasicInfoCard text={effectiveEnd} title="Period End Date" />
                    <BasicInfoCard text={daysLeft.toString()} title="Days Left in Period" />
                    <BasicInfoCard text={totalTransactions.toString()} title="Total Transactions" />
                </div>
                <ExpensesInfoContainer categoryData={categoryExpenses} onCategoryChange={this._onCategoryChange} />
                <TransactionsContainer categoryExpense={selectedCategory} transactionItems={transactions} sortSelectors={tempSortSelectors} showToolbar enableSort addTransaction={this._addTransaction} updateTransaction={this._updateTransaction} deleteTransaction={this._deleteTransaction} />
            </div>
        )
    }
}

export default ExpensesPage;