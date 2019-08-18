import React from 'react'
import styles from './ColorBox.module.scss'
import { changeColorBox } from '../../../store/actions/creatorActions'
import { connect } from 'react-redux'

import BaseCheckbox from '../../blocks/BaseCheckbox'

const ColorBox = ({ data, changeColorBox, classes }) => {
    return (
        <div className={classes} onClick={() => changeColorBox(data.id)}>
            <div
                className={`${styles.colorBox} mx-auto rounded-full mb-1`}
                style={{ background: data.color }}
            />
            <div className="flex justify-center">
                <BaseCheckbox classes="mt-sm" isChecked={data.active} />
                <span className="ml-1">{data.label}</span>
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
