import { changeStep } from '../../../../store/actions/themeActions'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import PropTypes from 'prop-types'
import React from 'react'
import styles from './StepBox.module.scss'

function StepBox({ step, active, handleChangeStep }) {
  return (
    <div className="w-1/3 text-center z-20">
      <div
        data-testid="stepBoxCircle"
        onClick={() => handleChangeStep(step.id)}
        className={`${styles.circle} ${
          active ? 'bg-gullGray' : 'bg-botticelli'
        } cursor-pointer rounded-full bg-botticelli relative mx-auto`}
      >
        <div
          data-testid="stepBoxDot"
          className={`${styles.circle__inside} ${
            active ? 'bg-white' : 'bg-hippieBlue'
          } top-half left-half absolute rounded-full`}
        />
      </div>
      <div onClick={() => handleChangeStep(step.id)}>
        <p className={`${styles.circle__text} uppercase font-bold mt-3`}>
          <FormattedMessage id={step.label} defaultMessage={step.label} />
        </p>
        <p className={`${styles.circle__text} uppercase font-bold`}>
          <FormattedMessage id={step.title} defaultMessage={step.title} />
        </p>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  handleChangeStep: (step) => dispatch(changeStep(step)),
})

StepBox.propTypes = {
  step: PropTypes.shape({
    title: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.number,
  }),
  active: PropTypes.bool,
  handleChangeStep: PropTypes.func,
}

export default connect(
  null,
  mapDispatchToProps,
)(StepBox)
