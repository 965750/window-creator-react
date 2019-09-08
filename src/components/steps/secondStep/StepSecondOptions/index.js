import { changeWindowDivision } from '../../../../store/actions/creatorActions'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import DivisionInput from '../DivisionInput/'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class StepSecondOptions extends Component {
  changeDivision = (value, id) => {
    this.props.changeWindowDivision(value, id)
  }

  render() {
    return (
      <div className="pt-2">
        <div className="mb-10">
          <p className="mb-4 text-osloGray border-b border-mercury">
            <FormattedMessage
              id="Door division"
              defaultMessage="Door division"
            />
          </p>
          <div className="flex justify-between">
            <p>
              <FormattedMessage
                id="Number of beams"
                defaultMessage="Number of beams"
              />
            </p>
            <DivisionInput
              id="rows"
              classes="mb-5"
              inputValue={this.props.window.rows.length - 1}
              changeDivision={this.changeDivision}
            />
          </div>
          <div className="flex justify-between">
            <p>
              <FormattedMessage
                id="Number of posts"
                defaultMessage="Number of posts"
              />
            </p>
            <DivisionInput
              id="columns"
              inputValue={this.props.window.columns.length - 1}
              changeDivision={this.changeDivision}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeWindowDivision: (value, id) => dispatch(changeWindowDivision(value, id)),
})

StepSecondOptions.propTypes = {
  window: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    doorType: PropTypes.number,
    rows: PropTypes.array,
    columns: PropTypes.array,
  }),
  changeWindowDivision: PropTypes.func,
}

export default connect(
  null,
  mapDispatchToProps,
)(StepSecondOptions)
