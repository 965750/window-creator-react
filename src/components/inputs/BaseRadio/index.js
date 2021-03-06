import PropTypes from 'prop-types'
import React from 'react'
import styles from './BaseRadio.module.scss'

const BaseRadio = ({ isChecked, classes }) => (
  <div
    data-testid="radioWrapper"
    className={`${styles.radio__wrapper} border-botticelli border-4 rounded-full relative ${classes}`}
  >
    {isChecked ? (
      <div
        className={`${
          styles['radio--checked']
        } top-half left-half rounded-full bg-hippieBlue absolute`}
      />
    ) : null}
  </div>
)

BaseRadio.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  classes: PropTypes.string,
}

export default BaseRadio
