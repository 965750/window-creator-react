import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import ColorBox from './ColorBox'
import PropTypes from 'prop-types'
import React from 'react'

const StepThirdOptions = ({ colorBoxes }) => {
  const allColorBoxes = colorBoxes.map((box) => (
    <ColorBox classes="w-1/4" key={box.id} data={box} />
  ))

  return (
    <div className="pt-2">
      <div className="mb-30">
        <p className="mb-4 text-osloGray border-b border-mercury">
          <FormattedMessage id="Choose color" defaultMessage="Choose color" />
        </p>
        <div className="flex">{allColorBoxes}</div>
      </div>
    </div>
  )
}

StepThirdOptions.propTypes = {
  colorBoxes: PropTypes.array,
}

const mapStateToProps = (state) => ({
  colorBoxes: state.creator.colorBoxes,
})

export default connect(mapStateToProps)(StepThirdOptions)
