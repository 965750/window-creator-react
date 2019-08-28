import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import styles from './PasswordStrength.module.scss'

class PasswordStrength extends Component {
    state = {
        strength: 0,
        label: null,
    }

    checkStrength = () => {
        let localStrength = 0

        const passwordCheck = {
            lowerAlph: /(?=.*[a-z])/,
            upperAlph: /(?=.*[A-Z])/,
            numericChar: /(?=.*[0-9])/,
            specialChar: /(?=.[!@#%&])/,
            long: /(?=.{12,})/,
        }

        if (passwordCheck.lowerAlph.test(this.props.password)) {
            localStrength += 10
        }
        if (passwordCheck.upperAlph.test(this.props.password)) {
            localStrength += 10
        }
        if (passwordCheck.numericChar.test(this.props.password)) {
            localStrength += 25
        }
        if (passwordCheck.specialChar.test(this.props.password)) {
            localStrength += 30
        }
        if (passwordCheck.long.test(this.props.password)) localStrength += 25

        switch (true) {
            case localStrength < 30:
                this.setState({
                    label: 'Low',
                })

                break
            case localStrength >= 30 && localStrength <= 70:
                this.setState({
                    label: 'Medium',
                })

                break
            case localStrength > 70:
                this.setState({
                    label: 'Good',
                })

                break
            default:
                return
        }

        this.setState({
            strength: localStrength,
        })
    }

    checkedColor = () => {
        switch (this.state.label) {
            case 'Low':
                return 'error'
            case 'Medium':
                return 'warning'
            case 'Good':
                return 'malachite'
            default:
                return 'darkText'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.password !== this.props.password) {
            this.checkStrength()
        }
    }

    render() {
        let label

        if (this.state.label) {
            label = (
                <FormattedMessage
                    id={this.state.label}
                    defaultMessage={this.state.label}
                />
            )
        }

        return (
            <div className={`${styles.bar} relative w-4/9 mb-1`}>
                <p
                    className={`${
                        styles.bar__label
                    } top-10- text-${this.checkedColor()}`}
                >
                    {label}
                </p>
                <div className={`${styles.bar__back} rounded`} />
                <div
                    style={{ width: `${100 - this.state.strength}%` }}
                    className={`${styles.bar__cover} rounded-r absolute bg-white opacity-75 h-full bottom-0 right-0 w-50`}
                />
            </div>
        )
    }
}

PasswordStrength.propTypes = {
    password: PropTypes.string,
}

export default PasswordStrength
