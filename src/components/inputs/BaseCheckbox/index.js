import PropTypes from 'prop-types'
import React from 'react'
import styles from './BaseCheckbox.module.scss'

const BaseCheckbox = ({ isChecked, classes }) => (
  <div
    data-testid="checkboxWrapper"
    className={`${styles.checkbox__wrapper} border-gullGray border relative ${classes}`}
  >
    {isChecked ? (
      <div
        data-testid="checkboxIcon"
        className={`${
          styles['checkbox--checked']
        } border-b-4 border-r-4 border-hippieBlue top-half left-half absolute`}
      />
    ) : null}
  </div>
)

BaseCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  classes: PropTypes.string,
}

export default BaseCheckbox
