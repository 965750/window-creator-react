import React, { Component } from 'react'
import styles from './BaseInput.module.scss'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

class BaseInput extends Component {
    state = {
        error: null,
    }

    validate = () => {
        this.setState({
            error: null,
        })

        if (this.props.toValide.indexOf('email') > -1) {
            const emailCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

            if (!emailCheck.test(this.props.value)) {
                this.setState({
                    error: 'Invalid email address',
                })
            }
        }

        if (this.props.toValide.indexOf('isRequired') > -1) {
            if (this.props.value.length <= 0) {
                this.setState({
                    error: 'Field is required',
                })
            }
        }

        if (this.props.toValide.indexOf('match') > -1) {
            if (this.props.value !== this.props.valueToMatch) {
                this.setState({
                    error: 'Passwords are not equal',
                })
            }
        }

        if (this.props.toValide.indexOf('passwordLength') > -1) {
            if (this.props.value.length <= 7) {
                this.setState({
                    error: 'Password is too short',
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.validate()
        }

        if (this.props.valueToMatch && this.props.value) {
            if (
                prevProps.value !== this.props.value ||
                prevProps.valueToMatch !== this.props.valueToMatch
            ) {
                this.validate()
            }
        }

        if (prevState.error !== this.state.error) {
            this.props.validationError(this.state.error)
        }
    }

    render() {
        let errorMsg

        if (this.state.error)
            errorMsg = (
                <p className={styles.field__errorMsg}>
                    <FormattedMessage
                        id={this.state.error}
                        defaultMessage={this.state.error}
                    />
                </p>
            )

        return (
            <div
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
                    } border border-light rounded p-3 w-full`}
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
    toValide: PropTypes.array,
    classes: PropTypes.string,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default injectIntl(BaseInput)
