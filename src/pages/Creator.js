import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import CreatorPreview from '../components/steps/blocks/CreatorPreview'
import PropTypes from 'prop-types'
import React from 'react'
import StepFirstOptions from '../components/steps/firstStep/StepFirstOptions'
import Stepper from '../components/steps/blocks/Stepper'
import StepperNavigation from '../components/steps/blocks/StepperNavigation'
import StepSecondOptions from '../components/steps/secondStep/StepSecondOptions'
import StepThirdOptions from '../components/steps/thirdStep/StepThirdOptions'
import styles from './Creator.module.scss'

const Creator = ({ isLoggedIn, step, window }) => {
  let currentStepOptions

  switch (step) {
    case 1:
      currentStepOptions = <StepFirstOptions window={window} />

      break
    case 2:
      currentStepOptions = <StepSecondOptions window={window} />

      break
    case 3:
      currentStepOptions = <StepThirdOptions />

      break
    default:
      return
  }

  if (!isLoggedIn) return <Redirect to="/" />

  return (
    <div className={`${styles.wrapper} mb-10 md:px-3 mx-auto z-10`}>
      <Stepper />
      <div className="flex flex-wrap md:flex-no-wrap mt-4">
        <CreatorPreview />
        <div
          className={`${styles.options__wrapper} w-full md:w-1/3 md:ml-6 relative`}
        >
          {currentStepOptions}
          <StepperNavigation />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.firebase.auth.uid,
  step: state.theme.stepper.active,
  window: state.creator.window,
})

Creator.propTypes = {
  isLoggedIn: PropTypes.string,
  window: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    doorType: PropTypes.number,
    rows: PropTypes.array,
    columns: PropTypes.array,
  }),
  step: PropTypes.number,
}

export default connect(mapStateToProps)(Creator)
