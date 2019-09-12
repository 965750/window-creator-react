import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import {
  resizeWindow,
  changeWindowType,
} from '../../../../store/actions/creatorActions'
import { setNotification } from '../../../../store/actions/themeActions'

import BaseRadio from '../../../inputs/BaseRadio'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './StepFirstOptions.module.scss'

class StepFirstOptions extends Component {
  constructor(props) {
    super(props)
    this.heightInput = React.createRef()
    this.widthInput = React.createRef()
  }

  componentDidMount() {
    this.updateInputs()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.window !== this.props.window) {
      this.updateInputs()
    }
  }

  updateInputs = () => {
    this.heightInput.current.value = this.props.window.height
    this.widthInput.current.value = this.props.window.width
  }

  handleDoorType = (value) => {
    this.props.changeWindowType(value)
  }

  handleChange = (e) => {
    let value = Number(e.target.value)
    const limits = {
      height: {
        min: 180,
        max: 260,
      },
      width: {
        min: 70,
        max: 140,
      },
    }

    if (e.target.id === 'height') {
      if (value > limits.height.max) value = limits.height.max
      if (value < limits.height.min) value = limits.height.min
    } else if (e.target.id === 'width') {
      if (value > limits.width.max) value = limits.width.max
      if (value < limits.width.min) value = limits.width.min
    }

    if (
      this[`${e.target.id}Input`].current.value > limits[e.target.id].max
      || this[`${e.target.id}Input`].current.value < limits[e.target.id].min
    ) {
      this.props.setNotification(
        `Window's height must be between ${limits.height.max}cm and ${limits.height.min}cm, also for width it's ${limits.width.max}cm and ${limits.width.min}cm`,
        'error',
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
      <div className="pt-2">
        <div className="mb-10">
          <p className="mb-4 text-osloGray border-b border-mercury">
            <FormattedMessage id="Door type" defaultMessage="Door type" />
          </p>
          <button
            className="mb-2 flex cursor-pointer"
            onClick={() => this.handleDoorType(1)}
          >
            <BaseRadio
              classes="mt-sm mr-2"
              isChecked={this.props.window.doorType === 1}
            />
            <FormattedMessage id="Single door" defaultMessage="Single door" />
          </button>
          <button
            className="flex cursor-pointer"
            onClick={() => this.handleDoorType(2)}
          >
            <BaseRadio
              classes="mt-sm mr-2"
              isChecked={this.props.window.doorType === 2}
            />
            <FormattedMessage id="Double door" defaultMessage="Double door" />
          </button>
        </div>
        <div>
          <p className="mb-4 text-osloGray border-b border-mercury">
            <FormattedMessage id="Door size" defaultMessage="Door size" />
          </p>
          <div className="flex mb-2">
            <p className={`${styles.inputBox__label} mr-5`}>
              <FormattedMessage id="Width" defaultMessage="Width" />
            </p>
            <input
              data-testid="widthInput"
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
              <FormattedMessage id="Height" defaultMessage="Height" />
            </p>
            <input
              data-testid="heightInput"
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

const mapDispatchToProps = (dispatch) => ({
  resizeWindow: (sizes) => dispatch(resizeWindow(sizes)),
  changeWindowType: (doorType) => dispatch(changeWindowType(doorType)),
  setNotification: (notification, notificationType) => dispatch(setNotification(notification, notificationType)),
})

StepFirstOptions.propTypes = {
  window: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    doorType: PropTypes.number,
    rows: PropTypes.array,
    columns: PropTypes.array,
  }),
  resizeWindow: PropTypes.func,
  changeWindowType: PropTypes.func,
  setNotification: PropTypes.func,
}

export default connect(
  null,
  mapDispatchToProps,
)(StepFirstOptions)
