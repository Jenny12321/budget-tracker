import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/ExpensesPage/TransactionsContainer.css';
import TransactionItem from './TransactionItem';
import ToolBar from '../Common/ToolBar';
import TransactionDialog, { TransactionDialogAction } from './TransactionDialog';
import ConfirmationDialog from '../Common/ConfirmationDialog';

class TransactionsContainer extends Component {
    static propTypes = {
        categoryExpense: PropTypes.object,
        transactionItems: PropTypes.array,
        sortSelectors: PropTypes.array,
        showToolbar: PropTypes.bool,
        addTransaction: PropTypes.func,
        updateTransaction: PropTypes.func,
        deleteTransaction: PropTypes.func,
        enableSort: PropTypes.bool,
        isExpenseHistory: PropTypes.bool
    }

    static defaultProps = {
        showToolbar: false
    }

    constructor(props) {
        super(props);

        this.state = {
            filterString: null,
            showDeleteTransactionDialog: false,
            showTransactionDialog: false,
            transactionDialogAction: TransactionDialogAction.Add,
            selectedTransaction: null
        }

        this._addTransaction = this._addTransaction.bind(this);
        this._editTransaction = this._editTransaction.bind(this);
        this._deleteTransaction = this._deleteTransaction.bind(this);
        this._onTransactionDialogClose = this._onTransactionDialogClose.bind(this);
        this._onDeleteTransactionDialogClose = this._onDeleteTransactionDialogClose.bind(this);
        this._onTransactionDialogSubmit = this._onTransactionDialogSubmit.bind(this);
        this._onDeleteTransactionDialogSubmit = this._onDeleteTransactionDialogSubmit.bind(this);
        this._searchFilterOnChange = this._searchFilterOnChange.bind(this);
    }

    _addTransaction() {
        var { categoryExpense } = this.props;

        var newTransaction = {
            categoryTypeId: categoryExpense.categoryTypeId
        }

        this.setState({
            showTransactionDialog: true,
            transactionDialogAction: TransactionDialogAction.Add,
            selectedTransaction: newTransaction
        });
    }

    _editTransaction(transactionId) {
        var { transactionItems, categoryExpense } = this.props;
        var transaction = transactionItems.find(t => t.transactionId === transactionId);

        this.setState({
            showTransactionDialog: true,
            transactionDialogAction: TransactionDialogAction.Edit,
            selectedTransaction: {
                ...transaction,
                categoryTypeId: categoryExpense.categoryTypeId
            }
        });
    }

    _deleteTransaction(transactionId) {
        var { transactionItems } = this.props;
        var transaction = transactionItems.find(t => t.transactionId === transactionId);

        this.setState({
            showDeleteTransactionDialog: true,
            selectedTransaction: transaction
        });
    }

    _onTransactionDialogClose() {
        this.setState({showTransactionDialog: false});
    }

    _onDeleteTransactionDialogClose() {
        this.setState({showDeleteTransactionDialog: false});
    }
    
    _onTransactionDialogSubmit(transaction) {
        var { addTransaction, updateTransaction } = this.props;
        var { transactionDialogAction, selectedTransaction } = this.state;

        if (transactionDialogAction === TransactionDialogAction.Add) {
            addTransaction(transaction);
        }
        else if (transactionDialogAction === TransactionDialogAction.Edit) {
            var selectedTransaction = selectedTransaction;
            transaction.transactionId = selectedTransaction.transactionId;

            updateTransaction(transaction);
        }
    }

    _onDeleteTransactionDialogSubmit(transaction) {
        var { deleteTransaction } = this.props;

        deleteTransaction(transaction);
    }

    _searchFilterOnChange(filterString) {
        this.setState( {filterString: filterString });
    }

    render() {
        var { transactionItems, sortSelectors, showToolbar, enableSort, isExpenseHistory } = this.props;
        var { filterString, showTransactionDialog, transactionDialogAction, selectedTransaction, showDeleteTransactionDialog } = this.state;
        var transactionItemsFiltered;

        if (!filterString) {
            transactionItemsFiltered = transactionItems;
        }
        else {
            transactionItemsFiltered = transactionItems.filter(function(item) {
                var transactionTitleUpperCase = item.title.toUpperCase();

                return transactionTitleUpperCase.includes(filterString.toUpperCase());
            }.bind(this));
        }

        return (
            <div className="transactions-container">
                <div className="title">Transactions</div>
                {showToolbar && <ToolBar size="small" buttonText="Add Transaction" buttonOnClick={this._addTransaction} searchFilterOnChange={this._searchFilterOnChange} sortSelectors={sortSelectors} enableSort={enableSort} enableSearchFilter enableButton={!isExpenseHistory} />}
                <div className="transactions">
                    {
                        transactionItemsFiltered && transactionItemsFiltered.map(function(transaction) {
                            return (<TransactionItem key={transaction.transactionId} id={transaction.transactionId} title={transaction.title} date={transaction.date} cost={transaction.cost} onEdit={this._editTransaction} onDelete={this._deleteTransaction} canEdit={!isExpenseHistory} canDelete={!isExpenseHistory} /> )
                        }.bind(this))
                    }
                </div>
                <TransactionDialog show={showTransactionDialog} handleClose={this._onTransactionDialogClose} onSubmit={this._onTransactionDialogSubmit} action={transactionDialogAction} data={selectedTransaction} />
                <ConfirmationDialog show={showDeleteTransactionDialog} handleClose={this._onDeleteTransactionDialogClose} action='delete' data={selectedTransaction} onSubmit={this._onDeleteTransactionDialogSubmit} />
            </div>
        )
    }
}

export default TransactionsContainer;