import PropTypes from 'prop-types'
import React from 'react'
import styles from './DivisionInput.module.scss'

const DivisionInput = ({
  changeDivision, id, inputValue, classes,
}) => (
  <div data-testid="divisionInputWrapper" className={`${classes || ''} flex`}>
    <div className={`${styles.inputBox} border border-gullGray text-center`}>
      {inputValue}
    </div>
    <button
      onClick={() => changeDivision(1, id)}
      className={`${styles.inputBox} ml-1 bg-botticelli text-center cursor-pointer`}
    >
      +
    </button>
    <button
      onClick={() => changeDivision(-1, id)}
      className={`${styles.inputBox} ml-1 bg-botticelli text-center cursor-pointer`}
    >
      -
    </button>
  </div>
)

DivisionInput.propTypes = {
  changeDivision: PropTypes.func,
  id: PropTypes.string,
  inputValue: PropTypes.number,
  classes: PropTypes.string,
}

export default DivisionInput
