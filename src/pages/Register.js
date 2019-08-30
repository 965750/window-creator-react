import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Redirect } from 'react-router-dom'
import { register } from '../store/actions/authActions'

import BaseInput from '../components/inputs/BaseInput'
import BaseSubmit from '../components/inputs/BaseSubmit'
import PasswordStrength from '../components/blocks/PasswordStrength'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './Register.module.scss'

class Register extends Component {
  state = {
    email: '',
    password: '',
    passwordRepeat: '',
    firstName: '',
    lastName: '',
    error: null,
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  onRegister = e => {
    e.preventDefault()

    this.props.register({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    })
  }

  validationError = error => {
    this.setState({
      error,
    })
  }

  render() {
    if (this.props.isLoggedIn) return <Redirect to="/creator" />

    return (
      <form
        className={`${styles.form__wrapper} mt-10 mx-auto`}
        onSubmit={this.onRegister}
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
        <PasswordStrength password={this.state.password} />
        <div className="flex flex-wrap">
          <BaseInput
            value={this.state.password}
            validationError={this.validationError}
            handleChange={this.handleChange}
            id="password"
            type="password"
            toValidate={['isRequired', 'passwordLength']}
            classes="mb-3 w-4/9"
            placeholder="Password"
          />
          <BaseInput
            value={this.state.passwordRepeat}
            validationError={this.validationError}
            handleChange={this.handleChange}
            id="passwordRepeat"
            type="password"
            toValidate={['isRequired', 'match']}
            valueToMatch={this.state.password}
            classes="mb-3 ml-auto w-4/9"
            placeholder="Repeat password"
          />
        </div>
        <BaseInput
          value={this.state.firstName}
          validationError={this.validationError}
          handleChange={this.handleChange}
          id="firstName"
          type="text"
          toValidate={['isRequired']}
          classes="mb-3"
          placeholder="First name"
        />
        <BaseInput
          value={this.state.lastName}
          validationError={this.validationError}
          handleChange={this.handleChange}
          id="lastName"
          type="text"
          toValidate={['isRequired']}
          classes="mb-3"
          placeholder="Last name"
        />
        <BaseSubmit
          value="Register"
          disabled={
            this.state.error ||
            !this.state.email ||
            !this.state.password ||
            !this.state.passwordRepeat ||
            !this.state.firstName ||
            !this.state.lastName
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
  register: credentials => dispatch(register(credentials)),
})

Register.propTypes = {
  isLoggedIn: PropTypes.string,
  register: PropTypes.func,
}

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
)
