import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import ToolBar from '../Common/ToolBar';
import AddCategoryDialog from './AddCategoryDialog';
import '../../styles/CategoriesPage/CategoriesPage.css';
import EditCategoryDialog from './EditCategoryDialog';
import ConfirmationDialog from '../Common/ConfirmationDialog';
import { CategoryStatus } from '../../utils/Util';

class CategoriesPage extends Component {
    static propTypes = {
        categoryStatuses: PropTypes.array,
        categoryExpenses: PropTypes.array,
        updateCategoryStatuses: PropTypes.func,
        updateCategoryExpense: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            categoryStatuses: [],
            categoryExpenses: [],
            selectedCategory: null,
            showAddCategoryDialog: false,
            showEditCategoryDialog: false,
            showDeleteCategoryDialog: false
        }

        this._addCategory = this._addCategory.bind(this);
        this._editCategory = this._editCategory.bind(this);
        this._deleteCategory = this._deleteCategory.bind(this);
        this._onAddCategoryDialogClose = this._onAddCategoryDialogClose.bind(this);
        this._onEditCategoryDialogClose = this._onEditCategoryDialogClose.bind(this);
        this._onDeleteCategoryDialogClose = this._onDeleteCategoryDialogClose.bind(this);
        this._onAddCategoryDialogSubmit = this._onAddCategoryDialogSubmit.bind(this);
        this._onEditCategoryDialogSubmit = this._onEditCategoryDialogSubmit.bind(this);
        this._onDeleteCategoryDialogSubmit = this._onDeleteCategoryDialogSubmit.bind(this);
    }

    componentDidMount() {
        var { categoryStatuses, categoryExpenses } = this.props;

        if (this.state.categoryStatuses !== categoryStatuses) {
            this.setState({ categoryStatuses: categoryStatuses });
        }

        if (this.state.categoryExpenses !== categoryExpenses) {
            this.setState({ categoryExpenses: categoryExpenses });
        }
    }

    componentDidUpdate(prevProps) {
        var { categoryStatuses, categoryExpenses } = this.props;

        if (prevProps.categoryStatuses !== categoryStatuses) {
            this.setState({ categoryStatuses: categoryStatuses });
        }

        if (prevProps.categoryExpenses !== categoryExpenses) {
            this.setState({ categoryExpenses: categoryExpenses });
        }
    }

    _addCategory() {
        this.setState({ showAddCategoryDialog: true });
    }

    _editCategory(category) {
        this.setState({ 
            showEditCategoryDialog: true,
            selectedCategory: category
        });
    }

    _deleteCategory(category) {
        this.setState({ 
            showDeleteCategoryDialog: true,
            selectedCategory: category
        });
    }

    _onAddCategoryDialogClose() {
        this.setState({ showAddCategoryDialog: false });
    }

    _onEditCategoryDialogClose() {
        this.setState({ 
            showEditCategoryDialog: false,
            selectedCategory: null
        });
    }

    _onDeleteCategoryDialogClose() {
        this.setState({ 
            showDeleteCategoryDialog: false,
            selectedCategory: null
        });
    }

    _onAddCategoryDialogSubmit(categoryStatuses) {
        var { updateCategoryStatuses } = this.props;

        updateCategoryStatuses(categoryStatuses);
    }

    _onEditCategoryDialogSubmit(updatedCategoryExpense) {
        var { updateCategoryExpense } = this.props;

        updateCategoryExpense(updatedCategoryExpense);
    }

    _onDeleteCategoryDialogSubmit(deletedCategoryExpense) {
        var { updateCategoryStatuses } = this.props;

        var categoryStatuses = this.state.categoryStatuses.map(cs => {
            if (cs.categoryTypeId === deletedCategoryExpense.categoryTypeId) {
                cs.isActive = false;
                cs.state = CategoryStatus.Deleted;
            }

            return cs;
        });

        updateCategoryStatuses(categoryStatuses);
    }

    render() {
        var { categoryStatuses, categoryExpenses, showAddCategoryDialog, showEditCategoryDialog, showDeleteCategoryDialog, selectedCategory } = this.state;

        return (
            <React.Fragment>
                <ToolBar buttonText="Add Category" buttonOnClick={this._addCategory} enableButton/>
                <div className="categories-page">
                    {
                        categoryExpenses && categoryExpenses.map(function(category) {
                            return (<CategoryItem key={category.categoryExpenseId} category={category} categoryTypeId={category.categoryTypeId} lowerBudgetAmount={category.lowerBudgetAmount} upperBudgetAmount={category.upperBudgetAmount} onEditClick={this._editCategory} onDeleteClick={this._deleteCategory} />);
                        }.bind(this))
                    }
                </div>
                <AddCategoryDialog show={showAddCategoryDialog} handleClose={this._onAddCategoryDialogClose} data={categoryStatuses} onSubmit={this._onAddCategoryDialogSubmit} />
                <EditCategoryDialog show={showEditCategoryDialog} handleClose={this._onEditCategoryDialogClose} data={selectedCategory} onSubmit={this._onEditCategoryDialogSubmit} />
                <ConfirmationDialog show={showDeleteCategoryDialog} handleClose={this._onDeleteCategoryDialogClose} action='delete' data={selectedCategory} onSubmit={this._onDeleteCategoryDialogSubmit} />
            </React.Fragment>
        )
    }
}

export default CategoriesPage;