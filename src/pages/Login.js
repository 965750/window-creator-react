import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link, Redirect } from 'react-router-dom'
import { login, loginRemembered } from '../store/actions/authActions'

import BaseCheckbox from '../components/inputs/BaseCheckbox'
import BaseInput from '../components/inputs/BaseInput'
import BaseSubmit from '../components/inputs/BaseSubmit'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './Login.module.scss'

class Login extends Component {
  state = {
    email: '',
    password: '',
    remember: false,
    error: null,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  validationError = (error) => {
    this.setState({
      error,
    })
  }

  toggleCheckbox = () => {
    this.setState((prevState) => ({
      remember: !prevState.remember,
    }))
  }

  onLogin = (e) => {
    e.preventDefault()

    if (this.state.remember) {
      this.props.loginRemembered(this.state)
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
          toValidate={['email', 'isRequired']}
          classes="mb-3"
          placeholder="Email address"
        />
        <BaseInput
          value={this.state.password}
          validationError={this.validationError}
          handleChange={this.handleChange}
          id="password"
          type="password"
          toValidate={['isRequired']}
          classes="mb-3"
          placeholder="Password"
        />
        <div className="flex justify-between flex-wrap mb-3">
          <div // eslint-disable-line
            id="remember"
            onClick={this.toggleCheckbox}
            className="flex cursor-pointer"
          >
            <BaseCheckbox classes="mr-2 mb-3" isChecked={this.state.remember} />
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
            !this.state.email || !this.state.password || this.state.error
          }
        />
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.firebase.auth.uid,
})

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials)),
  loginRemembered: (credentials) => dispatch(loginRemembered(credentials)),
})

Login.propTypes = {
  isLoggedIn: PropTypes.string,
  login: PropTypes.func,
  loginRemembered: PropTypes.func,
}

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
)
