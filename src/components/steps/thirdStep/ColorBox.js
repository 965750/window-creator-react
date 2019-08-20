import React from 'react'
import styles from './ColorBox.module.scss'
import { changeColorBox } from '../../../store/actions/creatorActions'
import { connect } from 'react-redux'

import BaseCheckbox from '../../blocks/BaseCheckbox'
import { FormattedMessage } from 'react-intl'

const ColorBox = ({ data, changeColorBox, classes }) => {
    return (
        <div
            className={`${classes} cursor-pointer`}
            onClick={() => changeColorBox(data.id)}
        >
            <div
                className={`${styles.colorBox} mx-auto rounded-full mb-1`}
                style={{ background: data.color }}
            />
            <div className="flex justify-center">
                <BaseCheckbox classes="mt-sm" isChecked={data.active} />
                <span className="ml-1">
                    <FormattedMessage
                        id={data.label}
                        defaultMessage={data.label}
                    />
                </span>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeColorBox: id => dispatch(changeColorBox(id)),
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ColorBox)
