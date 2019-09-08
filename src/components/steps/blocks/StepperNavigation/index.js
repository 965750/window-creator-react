import { changeStep } from '../../../../store/actions/themeActions'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import PropTypes from 'prop-types'
import React from 'react'

const StepperNavigation = ({ activeStep, handleChangeStep }) => {
  let btnBack
  let btnNext

  if (activeStep !== 1) {
    btnBack = (
      <button
        data-testid="prevStepBtn"
        className="h-8 mr-1 uppercase border-2 border-gullGray w-1/2 cursor-pointer"
        onClick={() => handleChangeStep(activeStep - 1)}
      >
        <FormattedMessage id="back" defaultMessage="back" />
      </button>
    )
  }

  if (activeStep < 3) {
    btnNext = (
      <button
        data-testid="nextStepBtn"
        className="h-8 w-1/2 uppercase border-2 bg-gullGray text-white border-gullGray cursor-pointer"
        onClick={() => handleChangeStep(activeStep + 1)}
      >
        <FormattedMessage id="next step" defaultMessage="next step" />
      </button>
    )
  }

  return (
    <div className="flex w-full">
      {btnBack}
      {btnNext}
    </div>
  )
}

const mapStateToProps = (state) => ({
  activeStep: state.theme.stepper.active,
})

const mapDispatchToProps = (dispatch) => ({
  handleChangeStep: (step) => dispatch(changeStep(step)),
})

StepperNavigation.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleChangeStep: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepperNavigation)
