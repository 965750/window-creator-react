import React from 'react'
import styles from './DivisionInput.module.scss'
import PropTypes from 'prop-types'

const DivisionInput = ({ changeDivision, id, inputValue, classes }) => {
    return (
        <div className={`${classes ? classes : ''} flex`}>
            <div
                className={`${styles.inputBox} border border-gullGray text-center`}
            >
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
}

DivisionInput.propTypes = {
    changeDivision: PropTypes.func,
    id: PropTypes.string,
    inputValue: PropTypes.number,
    classes: PropTypes.string,
}

export default DivisionInput
