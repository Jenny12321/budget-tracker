import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import '../../styles/MainBody/MainHeader.css';

class MainHeader extends Component {
    static propTypes = {
        headerTitle: PropTypes.string
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="mainbody-header">
                <div className="header-title">
                    <Switch>
                        <Route path="/authenticated/home">
                            Home
                        </Route>
                        <Route path="/authenticated/categories">
                            Categories
                        </Route>
                        <Route path="/authenticated/expenses">
                            Expenses
                        </Route>
                        <Route path="/authenticated/expense-history">
                            Expense History
                        </Route>
                        <Route path="/authenticated/myProfile">
                            My Profile
                        </Route>
                        <Route path="/authenticated/settings">
                            Settings
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default MainHeader;