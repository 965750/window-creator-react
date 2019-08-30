import { changeStep } from '../../../store/actions/themeActions'
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
        className="h-8 mr-4 uppercase border-2 border-gullGray min-w-half cursor-pointer"
        onClick={() => handleChangeStep(activeStep - 1)}
      >
        <FormattedMessage id="back" defaultMessage="back" />
      </button>
    )
  }

  if (activeStep < 3) {
    btnNext = (
      <button
        className="h-8 min-w-half uppercase border-2 bg-gullGray text-white border-gullGray cursor-pointer"
        onClick={() => handleChangeStep(activeStep + 1)}
      >
        <FormattedMessage id="next step" defaultMessage="next step" />
      </button>
    )
  }

  return (
    <div className="flex absolute w-full bottom-0">
      {btnBack}
      {btnNext}
    </div>
  )
}

const mapStateToProps = state => ({
  activeStep: state.theme.stepper.active,
})

const mapDispatchToProps = dispatch => ({
  handleChangeStep: step => dispatch(changeStep(step)),
})

StepperNavigation.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleChangeStep: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepperNavigation)
