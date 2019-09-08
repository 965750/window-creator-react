import { FormattedMessage, injectIntl } from 'react-intl'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './BaseInput.module.scss'

class BaseInput extends Component {
  state = {
    error: null,
  }

  componentDidMount() {
    if (this.props.value) {
      this.validate()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.validate()
    }

    if (this.props.valueToMatch && this.props.value) {
      if (
        prevProps.value !== this.props.value
        || prevProps.valueToMatch !== this.props.valueToMatch
      ) {
        this.validate()
      }
    }

    if (prevState.error !== this.state.error) {
      this.props.validationError(this.state.error)
    }
  }

  validate = () => {
    this.setState({
      error: null,
    })

    if (this.props.toValidate.indexOf('email') > -1) {
      const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (!emailCheck.test(this.props.value)) {
        this.setState({
          error: 'Invalid email address',
        })
      }
    }

    if (this.props.toValidate.indexOf('isRequired') > -1) {
      if (this.props.value.length <= 0) {
        this.setState({
          error: 'Field is required',
        })
      }
    }

    if (this.props.toValidate.indexOf('match') > -1) {
      if (this.props.value !== this.props.valueToMatch) {
        this.setState({
          error: 'Passwords are not equal',
        })
      }
    }

    if (this.props.toValidate.indexOf('passwordLength') > -1) {
      if (this.props.value.length <= 7) {
        this.setState({
          error: 'Password is too short',
        })
      }
    }

    if (this.props.toValidate.indexOf('tooLong') > -1) {
      if (this.props.value.length >= 12) {
        this.setState({
          error: 'Name must be shorter',
        })
      }
    }
  }

  render() {
    let errorMsg

    if (this.state.error) {
      errorMsg = (
        <p className={styles.field__errorMsg}>
          <FormattedMessage
            id={this.state.error}
            defaultMessage={this.state.error}
          />
        </p>
      )
    }

    return (
      <div
        data-testid="inputWrapper"
        className={`${styles.field__wrapper} ${
          this.props.classes ? this.props.classes : ''
        }`}
      >
        <input
          id={this.props.id}
          onChange={this.props.handleChange}
          value={this.props.value}
          type={this.props.type}
          placeholder={this.props.intl.formatMessage({
            id: this.props.placeholder,
          })}
          className={`${styles.field} ${
            this.state.error ? styles['field--error'] : ''
          } border border-silver rounded p-3 w-full`}
        />
        {errorMsg}
      </div>
    )
  }
}

BaseInput.propTypes = {
  handleChange: PropTypes.func,
  validationError: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  toValidate: PropTypes.arrayOf(PropTypes.string),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  valueToMatch: PropTypes.string,
  classes: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default injectIntl(BaseInput)
