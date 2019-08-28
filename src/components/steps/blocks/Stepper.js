import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import StepBox from './StepBox'
import styles from './Stepper.module.scss'

class Stepper extends Component {
    render() {
        return (
            <div className={`${styles.stepper} flex relative mx-auto mt-6`}>
                {this.props.steps.map(step => (
                    <StepBox
                        step={step}
                        active={step.id === this.props.activeStep}
                        key={step.id}
                    />
                ))}
                <div
                    className={`${styles.stepper__line} border-b border-mercury absolute z-10 left-half`}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    steps: state.theme.stepper.steps,
    activeStep: state.theme.stepper.active,
})

Stepper.propTypes = {
    steps: PropTypes.array.isRequired,
    activeStep: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(Stepper)
