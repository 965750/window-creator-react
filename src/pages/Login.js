import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import { login, loginRemebered } from '../store/actions/authActions'
import styles from './Login.module.scss'
import BaseCheckbox from '../components/blocks/BaseCheckbox'
import BaseInput from '../components/blocks/BaseInput'
import BaseSubmit from '../components/blocks/BaseSubmit'

class Login extends Component {
    state = {
        email: '',
        password: '',
        remember: false,
        error: null,
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    validationError = error => {
        this.setState({
            error,
        })
    }

    toggleCheckbox = () => {
        this.setState(prevState => ({
            remember: !prevState.remember,
        }))
    }

    onLogin = e => {
        e.preventDefault()
        if (this.state.remember) {
            this.props.loginRemebered(this.state)
        } else {
            this.props.login(this.state)
        }
    }

    render() {
        if (this.props.isLoggedIn) return <Redirect to="/creator" />

        return (
            <form
                className={`${styles.form__wrapper} mt-10 mx-auto`}
                onSubmit={this.onLogin}
            >
                <BaseInput
                    value={this.state.email}
                    validationError={this.validationError}
                    handleChange={this.handleChange}
                    id="email"
                    type="text"
                    toValide={['email', 'isRequired']}
                    classes="mb-3"
                    placeholder="Email address"
                />
                <BaseInput
                    value={this.state.password}
                    validationError={this.validationError}
                    handleChange={this.handleChange}
                    id="password"
                    type="password"
                    toValide={['isRequired']}
                    classes="mb-3"
                    placeholder="Password"
                />
                <div className="flex justify-between flex-wrap mb-3">
                    <div
                        id="remember"
                        onClick={this.toggleCheckbox}
                        className="flex cursor-pointer"
                    >
                        <BaseCheckbox
                            classes="mr-2 mb-3"
                            isChecked={this.state.remember}
                        />
                        <p>
                            <FormattedMessage
                                id="Keep me logged in"
                                defaultMessage="Keep me logged in"
                            />
                        </p>
                    </div>
                    <Link
                        to="/register"
                        className="hover:text-malachite text-malachite cursor-pointer"
                    >
                        <FormattedMessage
                            id="Register new account here"
                            defaultMessage="Register new account here"
                        />
                    </Link>
                </div>
                <BaseSubmit
                    value="Login"
                    disabled={
                        !this.state.email ||
                        !this.state.password ||
                        this.state.error
                    }
                />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.firebase.auth.uid,
})

const mapDispatchToProps = dispatch => ({
    login: credentials => dispatch(login(credentials)),
    loginRemebered: credentials => dispatch(loginRemebered(credentials)),
})

Login.propTypes = {
    isLoggedIn: PropTypes.string,
    login: PropTypes.func,
}

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
)
