import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resizeWindow, changeDoorType } from '../../../store/actions/creatorActions'
import styles from './StepSecondOptions.module.scss'

class StepSecondOptions extends Component {
    state = {
        doorType: 1
    }

    handleDoorType = (value) => {
        this.props.changeDoorType(value)
    }

    handleChange = (e) => {
        let value = Number(e.target.value)

        if (e.target.id === 'height') {
            value > 300 ? value = 300 : value = value
            value < 160 ? value = 160 : value = value
        } else if (e.target.id === 'width') {
            value > 170 ? value = 170 : value = value
            value < 60 ? value = 60 : value = value
        }

        this.props.resizeWindow({
            [e.target.id]: value,
            id: e.target.id
        })
    }

    render() {
        return (
            <div className={`pt-2`}>
                <div className={`${styles.options} mb-10`}>
                    <p className='mb-4 text-darkText border-b border-mercury'>Door type</p>
                    <label className='block mb-0'>
                        <input onChange={() => this.handleDoorType(1)} checked={this.props.window.doorType === 1} type="radio" /> Single door
                    </label>
                    <label className='block'>
                        <input onChange={() => this.handleDoorType(2)} checked={this.props.window.doorType === 2} type="radio" /> Double door
                    </label>
                </div>
                {this.state.doorType}
                <div>
                    <p className='mb-4 text-darkText border-b border-mercury'>Door size</p>
                    <div className='flex mb-2'>
                        <p className={`${styles.inputBox__label} mr-5`}>Width</p><input id="width" className={`${styles.inputBox} border mr-1 text-center`} onChange={this.handleChange} value={this.props.window.width} type="number" /><span>cm</span>
                    </div>
                    <div className='flex'>
                        <p className={`${styles.inputBox__label} mr-5`}>Height</p><input id="height" className={`${styles.inputBox} border mr-1 text-center`} onChange={this.handleChange} value={this.props.window.height} type="number" /><span>cm</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        window: state.creator.window
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resizeWindow: (sizes) => dispatch(resizeWindow(sizes)),
        changeDoorType: (doorType) => dispatch(changeDoorType(doorType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepSecondOptions)
