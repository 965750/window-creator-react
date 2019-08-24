import React from 'react'
import styles from './BaseCheckbox.module.scss'
import PropTypes from 'prop-types'

const BaseCheckbox = ({ isChecked, classes }) => {
    return (
        <div
            className={`${styles.checkbox__wrapper} border-gullGray border relative ${classes}`}
        >
            {isChecked ? (
                <div
                    className={`${
                        styles['checkbox--checked']
                    } border-b-4 border-r-4 border-hippieBlue top-half left-half absolute`}
                />
            ) : null}
        </div>
    )
}

BaseCheckbox.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    classes: PropTypes.string,
}

export default BaseCheckbox
