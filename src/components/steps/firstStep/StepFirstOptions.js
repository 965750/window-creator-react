import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    resizeWindow,
    changeWindowType,
} from '../../../store/actions/creatorActions'
import { setNotification } from '../../../store/actions/themeActions'
import styles from './StepFirstOptions.module.scss'

class StepFirstOptions extends Component {
    constructor(props) {
        super(props)
        this.heightInput = React.createRef()
        this.widthInput = React.createRef()
    }

    state = {
        doorType: 1,
    }

    componentDidMount() {
        this.heightInput.current.value = this.props.window.height
        this.widthInput.current.value = this.props.window.width
    }

    handleDoorType = value => {
        this.props.changeWindowType(value)
    }

    handleChange = e => {
        let value = Number(e.target.value)

        const limits = {
            height: {
                min: 160,
                max: 300,
            },
            width: {
                min: 60,
                max: 170,
            },
        }

        if (e.target.id === 'height') {
            value > limits.height.max
                ? (value = limits.height.max)
                : (value = value)
            value < limits.height.min
                ? (value = limits.height.min)
                : (value = value)
        } else if (e.target.id === 'width') {
            value > limits.width.max
                ? (value = limits.width.max)
                : (value = value)
            value < limits.width.min
                ? (value = limits.width.min)
                : (value = value)
        }

        if (
            this[`${e.target.id}Input`].current.value >
                limits[e.target.id].max ||
            this[`${e.target.id}Input`].current.value < limits[e.target.id].min
        ) {
            this.props.setNotification(
                `Window's height must be between ${limits.height.max}cm and ${limits.height.min}cm, also for width it's ${limits.width.max}cm and ${limits.width.min}cm`
            )

            this[`${e.target.id}Input`].current.value = value
        }

        this.props.resizeWindow({
            [e.target.id]: value,
            id: e.target.id,
        })
    }

    render() {
        return (
            <div className={`pt-2`}>
                <div className={`mb-10`}>
                    <p className="mb-4 text-darkText border-b border-mercury">
                        Door type
                    </p>
                    <label className="block mb-0">
                        <input
                            onChange={() => this.handleDoorType(1)}
                            checked={this.props.window.doorType === 1}
                            type="radio"
                        />{' '}
                        Single door
                    </label>
                    <label className="block">
                        <input
                            onChange={() => this.handleDoorType(2)}
                            checked={this.props.window.doorType === 2}
                            type="radio"
                        />{' '}
                        Double door
                    </label>
                </div>
                <div>
                    <p className="mb-4 text-darkText border-b border-mercury">
                        Door size
                    </p>
                    <div className="flex mb-2">
                        <p className={`${styles.inputBox__label} mr-5`}>
                            Width
                        </p>
                        <input
                            id="width"
                            className={`${styles.inputBox} border mr-1 text-center`}
                            onBlur={this.handleChange}
                            ref={this.widthInput}
                            type="number"
                        />
                        <span>cm</span>
                    </div>
                    <div className="flex">
                        <p className={`${styles.inputBox__label} mr-5`}>
                            Height
                        </p>
                        <input
                            id="height"
                            className={`${styles.inputBox} border mr-1 text-center`}
                            onBlur={this.handleChange}
                            ref={this.heightInput}
                            type="number"
                        />
                        <span>cm</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        window: state.creator.window,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resizeWindow: sizes => dispatch(resizeWindow(sizes)),
        changeWindowType: doorType => dispatch(changeWindowType(doorType)),
        setNotification: notification =>
            dispatch(setNotification(notification)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepFirstOptions)
