import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import BasicInfoCard from '../Common/BasicInfoCard';
import ExpenseHistoryDialog from './ExpenseHistoryDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/ExpenseHistoryPage/ExpenseHistoryPage.css';
import { getYear, sortNumberArrayDesc, getMonthName } from '../../utils/Util';

export const Month = {
    January: new Date(2000, 0, 1),
    February: new Date(2000, 1, 1),
    March: new Date(2000, 2, 1),
    April: new Date(2000, 3, 1),
    May: new Date(2000, 4, 1),
    June: new Date(2000, 5, 1),
    July: new Date(2000, 6, 1),
    August: new Date(2000, 7, 1),
    September: new Date(2000, 8, 1),
    October: new Date(2000, 9, 1),
    November: new Date(2000, 10, 1),
    December: new Date(2000, 11, 1)
}

class ExpenseHistoryPage extends Component {
    static propTypes = {
        monthExpenditures: PropTypes.array,
        availableYears: PropTypes.array,
        getMonthExpendituresByYear: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            showExpenseHistoryDialog: false,
            allMonthExpenditures: [],
            monthExpendituresOnDisplay: [],
            selectedYear: '',
            yearsFetched: [],
            selectedMonthExpenditure: null
        }

        this._onExpenditurePeriodClick = this._onExpenditurePeriodClick.bind(this);
        this._onExpenseHistoryDialogClose = this._onExpenseHistoryDialogClose.bind(this);
        this._onSelect = this._onSelect.bind(this);
    }

    componentDidMount() {
        var { availableYears, monthExpenditures } = this.props;
        var { yearsFetched, allMonthExpenditures } = this.state;

        var currentYear = getYear(new Date());
        var selectedYear = availableYears.find(year => year === currentYear);

        if (selectedYear) {
            yearsFetched.push(selectedYear);
        }

        if (monthExpenditures && allMonthExpenditures.length === 0) {
            allMonthExpenditures.push(...monthExpenditures);
        }

        this.setState({
            selectedYear: selectedYear,
            yearsFetched: yearsFetched,
            allMonthExpenditures: allMonthExpenditures,
            monthExpendituresOnDisplay: monthExpenditures
        });
    }
    
    componentDidUpdate(prevProps) {
        var { monthExpenditures } = this.props;
        var { allMonthExpenditures } = this.state;

        if (prevProps.monthExpenditures !== monthExpenditures) {
            allMonthExpenditures.push(...monthExpenditures);

            this.setState({
                monthExpendituresOnDisplay: monthExpenditures,
                allMonthExpenditures: allMonthExpenditures
            });
        }
    }

    _onSelect(eventKey) {
        var { availableYears, getMonthExpendituresByYear } = this.props;
        var { allMonthExpenditures, yearsFetched, selectedYear } = this.state;

        var newSelectedYear = availableYears[eventKey];

        if (newSelectedYear !== selectedYear) {
            var isYearFetched = yearsFetched.includes(newSelectedYear);

            // If month expenditures for selected year has already been fetched, then filter for them
            // Else, make a get request
            if (isYearFetched) {
                var newMonthExpendituresOnDisplay = allMonthExpenditures.filter(me => {
                    var year = getYear((new Date(me.effectiveDate)));
                    return (year === newSelectedYear);
                });

                this.setState({
                    selectedYear: newSelectedYear,
                    monthExpendituresOnDisplay: newMonthExpendituresOnDisplay
                });
            }
            else {
                yearsFetched.push(newSelectedYear);
                this.setState({
                    selectedYear: newSelectedYear,
                    yearsFetched: yearsFetched
                });
    
                getMonthExpendituresByYear(newSelectedYear);
            }
        }
    }

    _onExpenditurePeriodClick(monthKey) {
        var {monthExpendituresOnDisplay} = this.state;

        var month = Month[monthKey].getMonth();

        var selectedMonthExpenditure = monthExpendituresOnDisplay.find(me => {
            var monthExpenditureMonth = (new Date(me.effectiveDate)).getMonth();
            return (monthExpenditureMonth === month);
        });

        if (selectedMonthExpenditure) {
            this.setState({
                showExpenseHistoryDialog: true,
                selectedMonthExpenditure: selectedMonthExpenditure
            });
        }
    }

    _onExpenseHistoryDialogClose() {
        this.setState({
            showExpenseHistoryDialog: false,
            selectedMonthExpenditure: null
        });
    }

    render() {
        var { showExpenseHistoryDialog, monthExpendituresOnDisplay, selectedYear, selectedMonthExpenditure } = this.state;
        var { availableYears } = this.props;

        var monthToMonthExpendituresMap = {};
        
        monthExpendituresOnDisplay.forEach(me => {
            var monthExpenditureMonth = (new Date(me.effectiveDate)).getMonth();

            if (!me.isActive) {
                monthToMonthExpendituresMap[monthExpenditureMonth] = me;
            }
        });

        var selectedMonthExpenditureCategoryExpenses = selectedMonthExpenditure ? selectedMonthExpenditure.categoryExpenses : null;

        return (
            <div className="expense-history-page">
                <div className="year-selector">
                    <Carousel nextIcon={<FontAwesomeIcon icon="chevron-circle-right" size="2x"></FontAwesomeIcon>} 
                            prevIcon={<FontAwesomeIcon icon="chevron-circle-left" size="2x"></FontAwesomeIcon>}
                            interval={null}
                            indicators={false}
                            onSelect={this._onSelect}
                            fade>
                        {
                            availableYears && availableYears.map((year, i) => {
                                var title = `${year} Monthly Spending`;

                                return (
                                    <Carousel.Item key={year}>
                                        <div className="selected-year">{title}</div>
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div className="period-selection-grid">
                    {
                        Object.keys(Month).map(key => {
                            var monthName = getMonthName(Month[key]);
                            var month = Month[key].getMonth();
                            var hasMonthExpenditure = (monthToMonthExpendituresMap[month]) ? true: false;

                            // Id here corresponds to the month
                            return (<BasicInfoCard key={key} id={key} text={monthName} title={selectedYear.toString()} alignTitle="center" alignText="center" clickable={hasMonthExpenditure} disabled={!hasMonthExpenditure} onClick={this._onExpenditurePeriodClick} />)
                        })
                    }
                </div>
                <ExpenseHistoryDialog data={selectedMonthExpenditureCategoryExpenses} show={showExpenseHistoryDialog} handleClose={this._onExpenseHistoryDialogClose}></ExpenseHistoryDialog>
            </div>
        )
    }
}

export default ExpenseHistoryPage;