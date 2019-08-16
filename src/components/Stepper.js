import React, { Component } from 'react'
import StepBox from './StepBox'
import { connect } from 'react-redux'
import styles from './Stepper.module.scss'

class Stepper extends Component {
    render() {
        return (
            <div className={`${styles.stepper} flex relative mx-auto mt-6`}>
                { this.props.steps.map(step => {
                    return (
                        <StepBox step={step} active={step.id === this.props.activeStep} key={step.id} />
                    )
                })}
                <div className={`${styles.stepper__line} border-b border-mercury absolute z-10 left-half`} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        steps: state.theme.stepper.steps,
        activeStep: state.theme.stepper.active
    }
}

export default connect(mapStateToProps)(Stepper)