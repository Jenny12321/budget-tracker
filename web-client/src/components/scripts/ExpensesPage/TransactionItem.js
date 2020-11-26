import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCurrency, formatDate, formatTime } from '../../utils/Util';
import '../../styles/ExpensesPage/TransactionItem.css';

class TransactionItem extends Component {
    static propTypes = {
        id: PropTypes.any,
        title: PropTypes.string,
        date: PropTypes.any,
        cost: PropTypes.number,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func,
        canEdit: PropTypes.bool,
        canDelete: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this._onEdit = this._onEdit.bind(this);
        this._onDelete = this._onDelete.bind(this);
    }

    _onEdit() {
        var { onEdit, id } = this.props;
        onEdit(id);
    }

    _onDelete() {
        var { onDelete, id } = this.props;
        onDelete(id);
    }

    render() {
        var { title, date, cost, canEdit, canDelete } = this.props;

        var parsedDate = new Date(Date.parse(date));
        
        return (
            <div className="transaction-item">
                <div className="transaction-item-title">{title}</div>
                <div className="transaction-item-date">
                    <div className="transaction-item-day">
                        {
                            formatDate(parsedDate)
                        }
                    </div>
                    <div className="transaction-item-time">
                        {
                            formatTime(parsedDate)
                        }
                    </div>
                </div>
                <div className="transaction-item-cost">{formatCurrency(cost)}</div>
                {
                    canEdit ? ( <div className="transaction-item-icon-container divider">
                                    <FontAwesomeIcon icon="edit" size="2x" className="transaction-item-icon edit-icon" onClick={this._onEdit} />
                                </div>
                    ) : <div />
                }
                {
                    canDelete ? ( <div className="transaction-item-icon-container divider">
                                    <FontAwesomeIcon icon="trash" size="2x" className="transaction-item-icon trash-icon" onClick={this._onDelete} />
                                  </div>
                    ) : <div />
                }
            </div>
        )
    }
}

export default TransactionItem;