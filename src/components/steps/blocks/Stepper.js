import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import React from 'react'
import StepBox from './StepBox'
import styles from './Stepper.module.scss'

const Stepper = ({ steps, activeStep }) => (
  <div className={`${styles.stepper} flex relative mx-auto mt-6`}>
    {steps.map(step => (
      <StepBox step={step} active={step.id === activeStep} key={step.id} />
    ))}
    <div
      className={`${styles.stepper__line} border-b border-mercury absolute z-10 left-half`}
    />
  </div>
)

const mapStateToProps = state => ({
  steps: state.theme.stepper.steps,
  activeStep: state.theme.stepper.active,
})

Stepper.propTypes = {
  steps: PropTypes.array,
  activeStep: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(Stepper)
