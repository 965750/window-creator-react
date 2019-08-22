import React from 'react'
import styles from './BaseCheckbox.module.scss'
import PropTypes from 'prop-types'

const BaseCheckbox = ({ isChecked, classes }) => {
    return (
        <div
            className={`${styles.checkbox__wrapper} border-botticelli border-4 rounded-full relative ${classes}`}
        >
            {isChecked ? (
                <div
                    className={`${
                        styles['checkbox--checked']
                    } top-half left-half rounded-full bg-hippieBlue absolute`}
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
