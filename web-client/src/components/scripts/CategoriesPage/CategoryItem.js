import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/CategoriesPage/CategoryItem.css';
import { formatCurrency } from '../../utils/Util';

const CategoryType = {
    Food: 1,
    Transportation: 2,
    Grocery: 3,
    Health: 4,
    Entertainment: 5,
    Bill: 6,
    Other: 7
}

const CategoryTypeToIconMap = {
    [CategoryType.Food]: "utensils",
    [CategoryType.Transportation]: "car-side",
    [CategoryType.Grocery]: "shopping-basket",
    [CategoryType.Health]: "first-aid",
    [CategoryType.Entertainment]: "theater-masks",
    [CategoryType.Bill]: "file-invoice-dollar",
    [CategoryType.Other]: "search-dollar"
}

const CategoryTypeToTitleMap = {
    [CategoryType.Food]: "Food",
    [CategoryType.Transportation]: "Transportation",
    [CategoryType.Grocery]: "Groceries",
    [CategoryType.Health]: "Health",
    [CategoryType.Entertainment]: "Entertainment",
    [CategoryType.Bill]: "Bills",
    [CategoryType.Other]: "Others"
}

class CategoryItem extends Component {
    static propTypes = {
        category: PropTypes.object,
        categoryTypeId: PropTypes.number,
        lowerBudgetAmount: PropTypes.number,
        upperBudgetAmount: PropTypes.number,
        onEditClick: PropTypes.func,
        onDeleteClick: PropTypes.func
    }

    constructor(props) {
        super(props);

        this._onEditClick = this._onEditClick.bind(this);
        this._onDeleteClick = this._onDeleteClick.bind(this);
    }

    _onEditClick() {
        var { onEditClick, category } = this.props;

        onEditClick(category);
    }

    _onDeleteClick() {
        var { onDeleteClick, category } = this.props;

        onDeleteClick(category);
    }

    render() {
        var { categoryTypeId, lowerBudgetAmount, upperBudgetAmount } = this.props;

        var icon = categoryTypeId ? CategoryTypeToIconMap[categoryTypeId] : "";
        var title = categoryTypeId ? CategoryTypeToTitleMap[categoryTypeId] : "";

        return (
            <div className="category-item">
                <div className="category-item-icon-container">
                    <FontAwesomeIcon icon={icon} size="2x" className="category-item-icon category-icon"></FontAwesomeIcon>
                </div>
                <div className="title">{title}</div>
                <div className="budget-bound">
                    <div className="budget-bound-header">Lower Budget Bound:</div>
                    <div className="budget-bound-amount">{formatCurrency(lowerBudgetAmount)}</div>
                </div>
                <div className="budget-bound">
                    <div className="budget-bound-header">Upper Budget Bound:</div>
                    <div className="budget-bound-amount">{formatCurrency(upperBudgetAmount)}</div>
                </div>
                <div className="category-item-icon-container divider">
                    <FontAwesomeIcon icon="edit" size="2x" className="category-item-icon edit-icon" onClick={this._onEditClick}></FontAwesomeIcon>
                </div>
                <div className="category-item-icon-container">
                    <FontAwesomeIcon icon="trash" size="2x" className="category-item-icon trash-icon" onClick={this._onDeleteClick}></FontAwesomeIcon>
                </div>
            </div>
        )
    }
}

export default CategoryItem;