import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatCurrency} from '../../utils/Util.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../../styles/ExpensesPage/ExpensesInfoCard.css';

class ExpensesInfoCard extends Component {
    static propTypes = {
        cardType: PropTypes.string.isRequired,
        data: PropTypes.any
    }

    constructor(props) {
        super(props);

    }

    render() {
        var { cardType, data } = this.props;
        var cardTypeContainer;

        var { lowerBudgetAmount, upperBudgetAmount, amountSpent, transactions } = data;

        var totalProgress = amountSpent / upperBudgetAmount;
        var successProgress, warningProgress, dangerProgress, progressMessage;

        var mostExpensivePurchase = 0;
        var leastExpensivePurchase = Number.MAX_VALUE;

        transactions.forEach(function(transaction) {
            var cost = parseInt(transaction.cost);
            if (cost > mostExpensivePurchase) {
                mostExpensivePurchase = transaction.cost;
            }
            if (cost < leastExpensivePurchase) {
                leastExpensivePurchase = transaction.cost;
            }
        }.bind(this));

        mostExpensivePurchase = (mostExpensivePurchase === 0) ? 0 : mostExpensivePurchase;
        leastExpensivePurchase = (leastExpensivePurchase === Number.MAX_VALUE) ? 0 : leastExpensivePurchase;

        if (lowerBudgetAmount >= amountSpent) {
            successProgress = 60 * totalProgress;
            warningProgress = 0;
            dangerProgress = 0;
            progressMessage = "Expenditure is below budget lower bound";
        }
        else if ((upperBudgetAmount * 0.75) > amountSpent) {
            successProgress = 60;
            warningProgress = 25 * totalProgress;
            dangerProgress = 0;
            progressMessage = "Expenditure is above budget lower bound";
        }
        else if (upperBudgetAmount > amountSpent) {
            successProgress = 60;
            warningProgress = 25;
            dangerProgress = 15 * totalProgress;
            progressMessage = "Expenditure is approaching budget upper bound";
        }
        else {
            successProgress = 60;
            warningProgress = 25;
            dangerProgress = 15;
            progressMessage = "Current expenditure has exceeded budget upper bound";
        }

        switch(cardType) {
            case "amount-spent":
                cardTypeContainer = (
                    <div className="amount-spent-card">
                        <div className="info-card">
                            <div className="info"><div className="info-title">Total Transactions:</div>{transactions.length}</div>
                            <div className="info"><div className="info-title">Most Expensive Purchase:</div>
                                {
                                    formatCurrency(mostExpensivePurchase)
                                }
                            </div>
                            <div className="info"><div className="info-title">Least Expensive Purchase:</div>
                                {
                                    formatCurrency(leastExpensivePurchase)
                                }
                            </div>
                            <div className="amount-progress-bar">
                                <ProgressBar>
                                    <ProgressBar striped animated variant="success" now={successProgress} key={1} />
                                    <ProgressBar striped animated variant="warning" now={warningProgress} key={2} />
                                    <ProgressBar striped animated variant="danger"  now={dangerProgress} key={3} />
                                </ProgressBar>
                            </div>
                            <div className="amount-progress">{progressMessage}</div>
                        </div>
                        <div className="amount-card divider">
                            <div className="amount-text">
                                {
                                    formatCurrency(data.amountSpent)
                                }
                            </div>
                            <div className="amount-title">Amount Spent</div>
                        </div>
                    
                    </div>
                )

                break;

            case "amount-left":
                cardTypeContainer = (
                    <div className="amount-card">
                        <div className="amount-text">
                            {
                                formatCurrency(data.amountLeft)
                            }
                        </div>
                        <div className="amount-title">Amount Left</div>
                    </div>
                )
                break;
        }

        return (
            <div className="expenses-info-card">
                {cardTypeContainer}
            </div>
        )
    }
}

export default ExpensesInfoCard;