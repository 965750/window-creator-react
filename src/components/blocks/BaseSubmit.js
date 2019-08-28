import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import styles from './BaseSubmit.module.scss'

const BaseSubmit = ({ disabled, value, intl }) => (
    <input
        disabled={disabled}
        type="submit"
        className={`${styles.submit} cursor-pointer block bg-first rounded text-white mx-auto`}
        value={intl.formatMessage({
            id: value,
        })}
    />
)

BaseSubmit.propTypes = {
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    value: PropTypes.string,
}

export default injectIntl(BaseSubmit)
