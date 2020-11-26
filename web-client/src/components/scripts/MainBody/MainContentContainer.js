import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HomePage from '../HomePage/HomePage';
import CategoriesPage from '../CategoriesPage/CategoriesPage';
import ExpensesPage from '../ExpensesPage/ExpensesPage';
import ExpenseHistoryPage from '../ExpenseHistoryPage/ExpenseHistoryPage';
import { Route, Switch } from 'react-router-dom';
import '../../styles/MainBody/MainContentContainer.css';
import Axios from 'axios';
import {AuthContext} from '../../../Auth';
import LoadingMask from '../Common/LoadingMask';
import Toast from 'react-bootstrap/Toast';
import { Button } from 'react-bootstrap';

const OperationType = {
    UpdateCategoryStatusesSuccess: 1,
    UpdateCategoryStatusesFail: 2,
    UpdateCategoryExpenseBudgetLimitsSuccess: 3,
    UpdateCategoryExpenseBudgetLimitsFail: 4,
    AddTransactionSuccess: 5,
    AddTransactionFail: 6,
    UpdateTransactionSuccess: 7,
    UpdateTransactionFail: 8,
    DeleteTransactionSuccess: 9,
    DeleteTransactionFail: 10,
    GetMonthExpendituresByYearSuccess: 11,
    GetMonthExpendituresByYearFail: 11
};

const ToasterType = {
    Success: "toaster-success",
    Error: "toaster-error",
    Information: "toaster-info"
};

const ToasterMessages = {
    [OperationType.UpdateCategoryStatusesSuccess]: "Successfully updated category settings.",
    [OperationType.UpdateCategoryStatusesFail]: "Failed to update category settings.",
    [OperationType.UpdateCategoryExpenseBudgetLimitsSuccess]: "Successfully updated category settings.",
    [OperationType.UpdateCategoryExpenseBudgetLimitsFail]: "Failed updated category settings.",
    [OperationType.AddTransactionSuccess]: "Successfully added new transaction.",
    [OperationType.AddTransactionFail]: "Failed to add new transaction.",
    [OperationType.UpdateTransactionSuccess]: "Successfully updated transaction.",
    [OperationType.UpdateTransactionFail]: "Failed to update transaction.",
    [OperationType.DeleteTransactionSuccess]: "Successfully deleted transaction.",
    [OperationType.DeleteTransactionFail]: "Failed to delete transaction.",
    [OperationType.GetMonthExpendituresByYearSuccess]: "Successfully fetched month expenditures.",
    [OperationType.GetMonthExpendituresByYearFail]: "Failed to fetch month expenditures."
};

class MainContentContainer extends Component {
    static contextType = AuthContext;

    static propTypes = {
    }

    constructor(props) {
        super(props);

        this.state = {
            activeMonthExpenditure: null,
            monthExpenditures: [],
            categoryStatuses: [],
            availableYears: [],
            showLoadingMask: false,
            showToaster: false,
            toasterType: ToasterType.Success,
            toasterText: ""
        }

        this.hasFetchedInitialDataRef = React.createRef(false);
        this.hasInitiatedInitialDataFetchRef = React.createRef(false);

        this._updateCategoryStatuses = this._updateCategoryStatuses.bind(this);
        this._updateCategoryExpenseBudgetLimits = this._updateCategoryExpenseBudgetLimits.bind(this);
        this._addTransaction = this._addTransaction.bind(this);
        this._updateTransaction = this._updateTransaction.bind(this);
        this._deleteTransaction = this._deleteTransaction.bind(this);
        this._getMonthExpendituresByYear = this._getMonthExpendituresByYear.bind(this);
    }

    componentDidMount() {
        var isUserAuthenticated = (this.context.currentUser && this.context.isUserAuthenticated) ? true : false;
        
        if (isUserAuthenticated && !this.hasInitiatedInitialDataFetchRef.current && !this.hasFetchedInitialDataRef.current) {
            this.hasInitiatedInitialDataFetchRef.current = true;

            var getMonthExpendituresUrl = process.env.REACT_APP_GET_MONTH_EXPENDITURES_URL;
            var getCategoryStatusesUrl = process.env.REACT_APP_GET_CATEGORY_STATUSES_URL;
            var getActiveYearsUrl = process.env.REACT_APP_GET_ACTIVE_YEARS_URL;

            Axios.get(getMonthExpendituresUrl, { withCredentials: true } ).then((response) => {
                if (response.data && response.data.success) {
                    this.hasFetchedInitialDataRef.current = true;
                    this.hasInitiatedInitialDataFetchRef.current = false;

                    var result = response.data.result;

                    var activeMonthExpenditure = result.find(me => me.isActive === true);

                    this.setState({
                        activeMonthExpenditure: activeMonthExpenditure,
                        monthExpenditures: result
                    });
                }
            }).catch(error => {

            });

            Axios.get(getCategoryStatusesUrl, { withCredentials: true } ).then((response) => {
                if (response.data && response.data.success) {
                    this.hasFetchedInitialDataRef.current = true;
                    this.hasInitiatedInitialDataFetchRef.current = false;

                    var result = response.data.result;

                    this.setState({
                        categoryStatuses: result
                    });
                }
            }).catch(error => {

            });

            Axios.get(getActiveYearsUrl, { withCredentials: true} ).then((response) => {
                if (response.data && response.data.success) {
                    this.hasFetchedInitialDataRef.current = true;
                    this.hasInitiatedInitialDataFetchRef.current = false;

                    var result = response.data.result;

                    this.setState({
                        availableYears: result
                    });
                }
            }).catch(error => {

            });
        }
    }
    
    _updateCategoryStatuses(categoryStatuses) {
        debugger;
        var updateCategoryStatusesUrl = process.env.REACT_APP_UPDATE_CATEGORY_STATUSES_URL;

        if (updateCategoryStatusesUrl) {
            var monthExpenditureId = this.state.activeMonthExpenditure.monthExpenditureId;

            Axios.post(updateCategoryStatusesUrl, categoryStatuses, {
                withCredentials: true
            }).then(response => {
                if (response.data && response.data.success) {
                    debugger;
                    var result = response.data.result;
                    var activeMonthExpenditure = this.state.activeMonthExpenditure;
                    activeMonthExpenditure.categoryExpenses = result.categoryExpenses;

                    this.setState({
                        activeMonthExpenditure: activeMonthExpenditure,
                        categoryStatuses: result.categoryStatuses,
                        toasterText: ToasterMessages[OperationType.UpdateCategoryStatusesSuccess],
                        showToaster: true,
                        toasterType: ToasterType.Success
                    });
                }
                else {
                    this.setState({
                        toasterText: ToasterMessages[OperationType.UpdateCategoryStatusesFail],
                        showToaster: true,
                        toasterType: ToasterType.Error
                    });
                }
            }).catch(error => {
                this.setState({
                    toasterText: ToasterMessages[OperationType.UpdateCategoryStatusesFail],
                    showToaster: true,
                    toasterType: ToasterType.Error
                });
            })
        }
    }

    _updateCategoryExpenseBudgetLimits(updatedCategoryExpense) {
        debugger;
        var updateCategoryExpenseBudgetLimitsUrl = process.env.REACT_APP_UPDATE_CATEGORY_EXPENSE_BUDGET_LIMITS_URL;

        if (updateCategoryExpenseBudgetLimitsUrl) {
            Axios.post(updateCategoryExpenseBudgetLimitsUrl, updatedCategoryExpense, {
                withCredentials: true
            }).then(response => {
                if (response.data && response.data.success) {
                    debugger;
                    var result = response.data.result;
                    var activeMonthExpenditure = this.state.activeMonthExpenditure;

                    var updatedCategoryExpenses = activeMonthExpenditure.categoryExpenses.map(ce => {
                        if (ce.categoryExpenseId === result.categoryExpenseId) {
                            return result;
                        }
                        return ce;
                    });

                    activeMonthExpenditure.categoryExpenses = updatedCategoryExpenses;
                    this.setState({
                        activeMonthExpenditure: activeMonthExpenditure,
                        toasterText: ToasterMessages[OperationType.UpdateCategoryExpenseBudgetLimitsSuccess],
                        showToaster: true,
                        toasterType: ToasterType.Success
                    });
                }
                else {
                    this.setState({
                        toasterText: ToasterMessages[OperationType.UpdateCategoryExpenseBudgetLimitsFail],
                        showToaster: true,
                        toasterType: ToasterType.Error
                    });
                }
            }).catch(error => {
                this.setState({
                    toasterText: ToasterMessages[OperationType.UpdateCategoryExpenseBudgetLimitsFail],
                    showToaster: true,
                    toasterType: ToasterType.Error
                });
            })
        }
    }

    _addTransaction(transaction) {
        var addTransactionUrl = process.env.REACT_APP_ADD_TRANSACTION_URL;

        if (addTransactionUrl) {
            Axios.post(addTransactionUrl, {}, {
                params: {
                    categoryExpenseId: transaction.categoryExpenseId,
                    title: transaction.title,
                    date: transaction.date,
                    cost: transaction.cost
                },
                withCredentials: true
            }).then((response) => {
                if (response.data && response.data.success) {
                    var result = response.data.result;
                    var activeMonthExpenditure = this.state.activeMonthExpenditure;

                    var updatedCategoryExpenses = activeMonthExpenditure.categoryExpenses.map(ce => {
                        if (ce.categoryExpenseId === result.categoryExpenseId) {
                            return result;
                        }
                        return ce;
                    });

                    activeMonthExpenditure.categoryExpenses = updatedCategoryExpenses;
                    this.setState({
                        activeMonthExpenditure: activeMonthExpenditure,
                        toasterText: ToasterMessages[OperationType.AddTransactionSuccess],
                        showToaster: true,
                        toasterType: ToasterType.Success
                    });
                }
                else {
                    this.setState({
                        toasterText: ToasterMessages[OperationType.AddTransactionFail],
                        showToaster: true,
                        toasterType: ToasterType.Error
                    });
                }
            }).catch(error => {
                this.setState({
                    toasterText: ToasterMessages[OperationType.AddTransactionFail],
                    showToaster: true,
                    toasterType: ToasterType.Error
                });
            })
        }
    }

    _updateTransaction(transaction) {
        var updateTransactionUrl = process.env.REACT_APP_UPDATE_TRANSACTION_URL;

        if (updateTransactionUrl) {
            Axios.post(updateTransactionUrl, transaction, {
                    withCredentials: true
            }).then((response) => {
                if (response.data && response.data.success) {
                    var result = response.data.result;
                    var activeMonthExpenditure = this.state.activeMonthExpenditure;

                    var updatedCategoryExpenses = activeMonthExpenditure.categoryExpenses.map(ce => {
                        if (ce.categoryExpenseId === result.categoryExpenseId) {
                            return result;
                        }
                        return ce;
                    });

                    activeMonthExpenditure.categoryExpenses = updatedCategoryExpenses;
                    this.setState({
                        activeMonthExpenditure: activeMonthExpenditure,
                        toasterText: ToasterMessages[OperationType.UpdateTransactionSuccess],
                        showToaster: true,
                        toasterType: ToasterType.Success
                    });
                }
                else {
                    this.setState({
                        toasterText: ToasterMessages[OperationType.UpdateTransactionFail],
                        showToaster: true,
                        toasterType: ToasterType.Error
                    });
                }
            }).catch(error => {
                this.setState({
                    toasterText: ToasterMessages[OperationType.UpdateTransactionFail],
                    showToaster: true,
                    toasterType: ToasterType.Error
                });
            })
        }
    }

    _deleteTransaction(transaction) {
        var deleteTransactionUrl = process.env.REACT_APP_DELETE_TRANSACTION_URL;

        if (deleteTransactionUrl) {
            Axios.post(deleteTransactionUrl, transaction, {
                withCredentials: true
            }).then((response) => {
                if (response.data && response.data.success) {
                    var result = response.data.result;
                    var activeMonthExpenditure = this.state.activeMonthExpenditure;

                    var updatedCategoryExpenses = activeMonthExpenditure.categoryExpenses.map(ce => {
                        if (ce.categoryExpenseId === result.categoryExpenseId) {
                            return result;
                        }
                        return ce;
                    });

                    activeMonthExpenditure.categoryExpenses = updatedCategoryExpenses;
                    this.setState({
                        activeMonthExpenditure: activeMonthExpenditure,
                        toasterText: ToasterMessages[OperationType.DeleteTransactionSuccess],
                        showToaster: true,
                        toasterType: ToasterType.Success
                    });
                }
                else {
                    this.setState({
                        toasterText: ToasterMessages[OperationType.DeleteTransactionFail],
                        showToaster: true,
                        toasterType: ToasterType.Error
                    });
                }
            }).catch(error => {
                this.setState({
                    toasterText: ToasterMessages[OperationType.DeleteTransactionFail],
                    showToaster: true,
                    toasterType: ToasterType.Error
                });
            })
        }
    }

    _getMonthExpendituresByYear(year) {
        var getMonthExpendituresByYearUrl = process.env.REACT_APP_GET_MONTH_EXPENDITURES_BY_YEAR_URL;

        if (getMonthExpendituresByYearUrl) {
            Axios.get(getMonthExpendituresByYearUrl, { 
                params: {
                    year: year
                },
                withCredentials: true
            }).then((response) => {
                if (response.data && response.data.success) {
                    var result = response.data.result;

                    this.setState({
                        monthExpenditures: result,
                        toasterText: ToasterMessages[OperationType.GetMonthExpendituresByYearSuccess],
                        showToaster: true,
                        toasterType: ToasterType.Success
                    });
                }
                else {
                    this.setState({
                        toasterText: ToasterMessages[OperationType.GetMonthExpendituresByYearFail],
                        showToaster: true,
                        toasterType: ToasterType.Error
                    });
                }
            }).catch(error => {
                this.setState({
                    toasterText: ToasterMessages[OperationType.GetMonthExpendituresByYearFail],
                    showToaster: true,
                    toasterType: ToasterType.Error
                });
            });
        }
    }

    render() {
        var { activeMonthExpenditure, monthExpenditures, availableYears, categoryStatuses, showLoadingMask, showToaster, toasterText, toasterType } = this.state;

        return (
            <React.Fragment>
                <LoadingMask show={showLoadingMask} />       
                <div className="mainbody-content-container">
                    <Switch>
                        <Route path="/authenticated/home">
                            <HomePage />
                        </Route>
                        <Route path="/authenticated/categories">
                            <CategoriesPage categoryExpenses={activeMonthExpenditure ? activeMonthExpenditure.categoryExpenses : []} categoryStatuses={categoryStatuses} updateCategoryExpense={this._updateCategoryExpenseBudgetLimits} updateCategoryStatuses={this._updateCategoryStatuses} />
                        </Route>
                        <Route path="/authenticated/expenses">
                            <ExpensesPage categoryExpenses={activeMonthExpenditure ? activeMonthExpenditure.categoryExpenses : []} addTransaction={this._addTransaction} updateTransaction={this._updateTransaction} deleteTransaction={this._deleteTransaction} />
                        </Route>
                        <Route path="/authenticated/expense-history">
                            <ExpenseHistoryPage monthExpenditures={monthExpenditures} availableYears={availableYears} getMonthExpendituresByYear={this._getMonthExpendituresByYear} />
                        </Route>
                    </Switch>
                </div>
                <div className="feedback-toaster">
                    <Toast className={toasterType} show={showToaster} onClose={() => this.setState({ showToaster: false })} delay={3000} autohide>
                        <Toast.Body>{toasterText}</Toast.Body>
                    </Toast>
                </div>
            </React.Fragment>
        )
    }
}

export default MainContentContainer;