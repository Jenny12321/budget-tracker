import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/ExpensesPage/ExpensesInfoContainer.css';
import ExpensesInfoCard from './ExpensesInfoCard';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoryTypeToTitleMap } from '../../utils/Util';

class ExpensesInfoContainer extends Component {
    static propTypes = {
        categoryData: PropTypes.array,
        onCategoryChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this._onSelect = this._onSelect.bind(this);
    }

    _onSelect(eventKey) {
        var selectedCategory = this.props.categoryData[eventKey];

        var onCategoryChange = this.props.onCategoryChange;
        onCategoryChange(selectedCategory);
    }

    render() {
        var { categoryData } = this.props;

        return (
            <div className="expenses-info-container">
                <Carousel nextIcon={<FontAwesomeIcon icon="chevron-right" size="2x"></FontAwesomeIcon>} 
                            prevIcon={<FontAwesomeIcon icon="chevron-left" size="2x"></FontAwesomeIcon>}
                            interval={null}
                            onSelect={this._onSelect}>
                    {
                        categoryData && categoryData.map(function(category) {
                            var title = CategoryTypeToTitleMap[category.categoryTypeId];

                            return (
                                <Carousel.Item key={category.categoryExpenseId}>
                                    <div className="expenses-info-content">
                                        <div className="category-title">{title}</div>
                                        <div className="expenses-info-cards">
                                            <ExpensesInfoCard cardType="amount-spent" data={category} />
                                            <ExpensesInfoCard cardType="amount-left" data={category} />
                                        </div>
                                    </div>
                                </Carousel.Item>
                            )
                        }.bind(this))
                    }
                </Carousel>
            </div>
        )
    }
}

export default ExpensesInfoContainer;