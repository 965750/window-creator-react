import React, { Component } from 'react'
import styles from './Login.module.scss'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { login } from '../store/actions/authActions'
import BaseCheckbox from '../components/blocks/BaseCheckbox'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        email: '',
        password: '',
        remember: false,
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    toggleCheckbox = () => {
        this.setState(prevState => ({
            remember: !prevState.remember,
        }))
    }

    onLogin = e => {
        e.preventDefault()
        this.props.login(this.state)
    }

    render() {
        if (this.props.isLoggedIn) return <Redirect to="/creator" />

        return (
            <form className={`mt-5`} onSubmit={this.onLogin}>
                <input
                    id="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    type="text"
                    placeholder="Email address"
                    className={`${styles.field} border border-light rounded p-3 mx-auto block`}
                />
                <input
                    id="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    placeholder="Password"
                    className={`${styles.field} border border-light rounded p-3 mx-auto block mt-10`}
                />
                <div
                    id="remember"
                    onClick={this.toggleCheckbox}
                    className={`${styles.checkbox} mx-auto flex`}
                >
                    <BaseCheckbox
                        classes="mt-sm mr-2"
                        isChecked={this.state.remember}
                    />
                    <p>
                        <FormattedMessage
                            id="Keep me logged in"
                            defaultMessage="Keep me logged in"
                        />
                    </p>
                </div>
                <input
                    type="submit"
                    className={`${styles.submit} block bg-first rounded text-white mx-auto`}
                    value="Login"
                />
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: credentials => dispatch(login(credentials)),
    }
}

Login.propTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
