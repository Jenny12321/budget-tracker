import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import {app, AuthContext} from '../../../Auth';
import Button from 'react-bootstrap/Button';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import '../../styles/Authentication/AuthForm.css';

class LoginForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            showErrorAlert: false
        };

        this.userNameRef = React.createRef();
        this.passwordRef = React.createRef();

        this._onSubmit = this._onSubmit.bind(this);
        this._onUsernameChange = this._onUsernameChange.bind(this);
        this._onPasswordChange = this._onPasswordChange.bind(this);
        this._toggleClass = this._toggleClass.bind(this);
    }

    _onSubmit(e) {
        e.preventDefault();
        var { email, password } = this.state;

        if (!!!email || !!!password) {
            this.setState({
                password: ""
            });
        }
        else {
            this.setState({
                showErrorAlert: false
            });

            app.auth().signInWithEmailAndPassword(email, password).then((result) => {
                this.setState({
                    errorMessage: "",
                    showErrorAlert: false,
                    email: "",
                    password: ""
                });
                
                this._onUsernameChange();
                this._onPasswordChange();
            }).catch((error) => {
                var errorMsg = "Username or password is incorrect. Please try again.";

                this.setState({
                    errorMessage: errorMsg,
                    showErrorAlert: true,
                    password: ""
                });

                this._onPasswordChange();
            });
        }
    }

    _onUsernameChange(e) {
        var userNameRef = this.userNameRef.current;

        if (!userNameRef.value || userNameRef.value.length === 0) {
            this._toggleClass(userNameRef, false, 'focus');
        }
        else {
            this._toggleClass(userNameRef, true, 'focus');
        }

        this.setState({ email: userNameRef.value });
    }

    _onPasswordChange(e) {
        var passwordRef = this.passwordRef.current;

        if (!passwordRef.value || passwordRef.value.length === 0) {
            this._toggleClass(passwordRef, false, 'focus');
        }
        else {
            this._toggleClass(passwordRef, true, 'focus');
        }

        this.setState({ password: passwordRef.value });
    }

    _toggleClass(element, toggleOn, className) {
        if (element.classList) {
            var hasClassName = element.classList.contains(className);

            if ((toggleOn && hasClassName) || (!toggleOn && !hasClassName)) {
                return;
            }
            else if (toggleOn && !hasClassName) {
                element.classList.add(className);
            }
            else {
                element.classList.remove(className);
            }
        }
    }

    render() {
        var { email, password, showErrorAlert, errorMessage } = this.state;

        if (this.context.currentUser && this.context.isUserAuthenticated) {
            return (<Redirect to="/authenticated/home"></Redirect>);
        }
        return (
            <div>
                <form className="auth-form" onSubmit={this._onSubmit}>
                    <div className="auth-error-alert">
                        <Alert show={showErrorAlert} variant='danger'>{errorMessage}</Alert>
                    </div>
                    <div className="auth-title">Sign In</div>
                    <div className="authentication-content">
                        <input ref={this.userNameRef} className="authentication-field username-field" type="text" value={email} onChange={this._onUsernameChange} autoComplete="off" required />
                        <span data-placeholder="Username" />
                    </div>
                    <div className="authentication-content">
                        <input ref={this.passwordRef} className="authentication-field password-field" type="password" value={password} onChange={this._onPasswordChange} autoComplete="off" required />
                        <span data-placeholder="Password" />
                    </div>
                    <Button className="auth-button" size="lg" type="submit">Login</Button>
                    <div className="redirect-content">
                        <p>Don't have an account?</p><Link to='/signup'>Sign Up!</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm);