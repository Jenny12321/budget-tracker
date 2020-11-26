import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {app, AuthContext} from '../../../Auth';
import Button from 'react-bootstrap/Button';
import { Link, Redirect, withRouter } from 'react-router-dom';
import '../../styles/Authentication/AuthForm.css';

class RegistrationForm extends Component {

    static contextType = AuthContext;

    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordReEnter: ""
        };

        this.authFormRef = React.createRef();
        this.userNameRef = React.createRef();
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordReEnterRef = React.createRef();

        this._onSubmit = this._onSubmit.bind(this);
        this._onUsernameChange = this._onUsernameChange.bind(this);
        this._onFirstNameChange = this._onFirstNameChange.bind(this);
        this._onLastNameChange = this._onLastNameChange.bind(this);
        this._onPasswordChange = this._onPasswordChange.bind(this);
        this._onPasswordReEnterChange = this._onPasswordReEnterChange.bind(this);
        this._toggleClass = this._toggleClass.bind(this);
    }

    _fieldValidationPassed() {
        var { password, passwordReEnter } = this.state;

        var hasNoInvalidations = true;

        var usernameElement = this.userNameRef.current;
        var passwordElement = this.passwordRef.current;
        var passwordReEnterElement = this.passwordReEnterRef.current;

        if (usernameElement && !usernameElement.checkValidity()) {
            this._toggleClass(usernameElement, true, 'invalid');
            hasNoInvalidations = false;
        }

        if (passwordElement) {
            // Check for default validity first - If invalid, mark with invalid class and skip rest of password validation
            if (!passwordElement.checkValidity()) {
                this._toggleClass(passwordElement, true, 'invalid');
                hasNoInvalidations = false;
            }
            // Check if password is all lowercase
            else if (password.toLowerCase() == password) {
                this._toggleClass(passwordElement, true, 'invalid');
                hasNoInvalidations = false;
                passwordElement.setCustomValidity("Password does not contain an Uppercase letter.");
            }
        }  

        if (passwordReEnterElement && password.localeCompare(passwordReEnter) !== 0) {
            this._toggleClass(passwordReEnterElement, true, 'invalid');
            hasNoInvalidations = false;
            passwordReEnterElement.setCustomValidity("Password does not match. Please re-enter password.");
        }

        var authFormElement = this.authFormRef.current;
        if (authFormElement) {
            authFormElement.reportValidity();
        }

        return hasNoInvalidations;
    }

    _onSubmit(e) {
        e.preventDefault();
        var { email, password, passwordReEnter } = this.state;

        if (!!!email || !!!password || !!!passwordReEnter) {
            this.setState({
                password: "",
                passwordReEnter: ""
            });
        }

        var hasNoInvalidations = this._fieldValidationPassed();

        if (hasNoInvalidations) {
            this.setState({
                email: "",
                password: "",
                passwordReEnter: ""
            });

            app.auth().createUserWithEmailAndPassword(email, password).then((result) => {
                var newUserInfo = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName
                };
                
                this.context.isNewUser.current = result.additionalUserInfo.isNewUser;
                this.context.currentUserInfo.current = newUserInfo;

                this.setState({
                    firstName: "",
                    lastName: ""
                });
            });
        }
    }

    _onUsernameChange(e) {
        var userNameRef = this.userNameRef.current;

        this._toggleClass(userNameRef, false, 'invalid');

        if (!userNameRef.value || userNameRef.value.length === 0) {
            this._toggleClass(userNameRef, false, 'focus');
        }
        else {
            this._toggleClass(userNameRef, true, 'focus');
        }

        this.setState({ email: userNameRef.value });
    }

    _onFirstNameChange(e) {
        var firsNameRef = this.firstNameRef.current;

        this._toggleClass(firsNameRef, false, 'invalid');

        if (!firsNameRef.value || firsNameRef.value.length === 0) {
            this._toggleClass(firsNameRef, false, 'focus');
        }
        else {
            this._toggleClass(firsNameRef, true, 'focus');
        }

        this.setState({ firstName: firsNameRef.value });
    }

    _onLastNameChange(e) {
        var lastNameRef = this.lastNameRef.current;

        this._toggleClass(lastNameRef, false, 'invalid');

        if (!lastNameRef.value || lastNameRef.value.length === 0) {
            this._toggleClass(lastNameRef, false, 'focus');
        }
        else {
            this._toggleClass(lastNameRef, true, 'focus');
        }

        this.setState({ lastName: lastNameRef.value });
    }

    _onPasswordChange(e) {
        var passwordRef = this.passwordRef.current;

        this._toggleClass(passwordRef, false, 'invalid');

        if (!passwordRef.value || passwordRef.value.length === 0) {
            this._toggleClass(passwordRef, false, 'focus');
        }
        else {
            this._toggleClass(passwordRef, true, 'focus');
        }

        if (passwordRef.validity && passwordRef.validity.customError) {
            passwordRef.setCustomValidity('');
        }

        this.setState({ password: passwordRef.value });
    }

    _onPasswordReEnterChange(e) {
        var passwordReEnterRef = this.passwordReEnterRef.current;
        
        this._toggleClass(passwordReEnterRef, false, 'invalid');

        if (!passwordReEnterRef.value || passwordReEnterRef.value.length === 0) {
            this._toggleClass(passwordReEnterRef, false, 'focus');
        }
        else {
            this._toggleClass(passwordReEnterRef, true, 'focus');
        }

        if (passwordReEnterRef.validity && passwordReEnterRef.validity.customError) {
            passwordReEnterRef.setCustomValidity('');
        }
        this.setState({ passwordReEnter: passwordReEnterRef.value });
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
        var { email, firstName, lastName, password, passwordReEnter } = this.state;

        if (this.context.currentUser && this.context.isUserAuthenticated) {
            return (<Redirect to="/authenticated/home"></Redirect>);
        }

        return (
            <div>
                <form ref={this.authFormRef} id="auth-form" className="auth-form" onSubmit={this._onSubmit}>
                    <div className="auth-title">Sign Up</div>
                    <div className="authentication-content">
                        <input ref={this.userNameRef} id="username" className="authentication-field username-field" type="email" value={email} onChange={this._onUsernameChange} autoComplete="off" required />
                        <span data-placeholder="Username" />
                    </div>
                    <div className="authentication-content">
                        <input ref={this.firstNameRef} id="firstname" className="authentication-field firstname-field" type="text" value={firstName} onChange={this._onFirstNameChange} autoComplete="off" required />
                        <span data-placeholder="First Name" />
                    </div>
                    <div className="authentication-content">
                        <input ref={this.lastNameRef} id="lastname" className="authentication-field lastname-field" type="text" value={lastName} onChange={this._onLastNameChange} autoComplete="off" required />
                        <span data-placeholder="Last Name" />
                    </div>
                    <div className="authentication-content">
                        <input ref={this.passwordRef} id="password" className="authentication-field password-field" type="password" value={password} onChange={this._onPasswordChange} autoComplete="off" minLength={8} required />
                        <span data-placeholder="Password" />
                    </div>
                    <div className="authentication-content">
                        <input ref={this.passwordReEnterRef} id="password-reenter" className="authentication-field password-reenter-field" type="password" value={passwordReEnter} onChange={this._onPasswordReEnterChange} autoComplete="off" required />
                        <span data-placeholder="Re-enter Password" />
                    </div>
                    <Button className="auth-button" size="lg" type="submit">Register</Button>
                    <div className="redirect-content">
                        <p>Already have an account?</p><Link to='/login'>Sign In!</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(RegistrationForm);