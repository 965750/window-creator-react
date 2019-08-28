import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import styles from './LanguageSwitcher.module.scss'
import { setLocalLang } from '../../store/actions/themeActions'

class LanguageSwitcher extends Component {
    state = {
        languages: [
            {
                value: 'pl',
                label: 'Polish',
            },
            {
                value: 'en',
                label: 'English',
            },
        ],
    }

    changeSelect = e => {
        this.props.setLocalLang(e.target.value)
    }

    render() {
        return (
            <div className="flex">
                <p className={`${styles.select__label} mr-5`}>
                    <FormattedMessage
                        id="Select language:"
                        defaultMessage="Select language:"
                    />
                </p>
                <div
                    className={`${styles.select__wrapper} relative relative mt-lg`}
                >
                    <FontAwesomeIcon
                        className={`${styles.select__arrow} absolute right-10`}
                        icon={faChevronDown}
                    />
                    <select
                        onChange={this.changeSelect}
                        value={this.props.language}
                        className={`${styles.select} h-full w-full pl-3 border border-gullGray rounded bg-white outline-none`}
                    >
                        {this.state.languages.map(option => (
                            <option value={option.value} key={option.value}>
                                {this.props.intl.formatMessage({
                                    id: option.label,
                                })}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    language: state.theme.lang,
})

const mapDispatchToProps = dispatch => ({
    setLocalLang: lang => dispatch(setLocalLang(lang)),
})

LanguageSwitcher.propTypes = {
    setLocalLang: PropTypes.func,
}

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LanguageSwitcher)
)
